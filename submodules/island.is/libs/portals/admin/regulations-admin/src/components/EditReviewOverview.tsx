import { ReactNode, useState } from 'react'
import {
  Box,
  Button,
  Inline,
  Text,
  Divider,
  AlertMessage,
} from '@island.is/island-ui/core'
import { editorMsgs, impactMsgs, reviewMessages } from '../lib/messages'
import { useDraftingState } from '../state/useDraftingState'
import { useLocale } from '@island.is/localization'
import { downloadUrl } from '../utils/files'
import { RegulationDraftTypes, Step } from '../types'
import { JumpToStep } from './EditReviewWarnings'
import {
  combineTextAppendixesComments,
  toISODate,
} from '@island.is/regulations'
import copyToClipboard from 'copy-to-clipboard'
import { DownloadDraftButton } from './DownloadDraftButton'
import { getDateOverviewWarning } from '../utils'

// ---------------------------------------------------------------------------

const prettyJoin = <T,>(arr: Array<T>): Array<string | T> =>
  arr.flatMap((item, i) => {
    const separator = i === 0 ? '' : i === arr.length - 1 ? ' og ' : ', '
    return separator ? [separator, item] : item
  })

// ---------------------------------------------------------------------------

type MicroActionProps = {
  text: string
  onClick: () => void
  clicked: boolean
  icon?: 'download' | 'copy'
}

const MicroAction = (props: MicroActionProps) => {
  const buttonProps = props.clicked
    ? ({
        variant: 'text',
        preTextIconType: 'outline',
        preTextIcon: 'checkmark',
      } as const)
    : ({
        variant: 'ghost',
        size: 'small',
        iconType: 'outline',
        icon: props.icon || 'copy',
      } as const)

  return (
    <Button as="button" onClick={props.onClick} {...buttonProps}>
      {props.text}
    </Button>
  )
}

// ---------------------------------------------------------------------------

type OverviewItemProps = {
  label: string
  children: ReactNode
  step?: Step
}
const OverviewItem = (props: OverviewItemProps) => {
  const { label, step, children } = props
  return (
    <Box marginBottom={4} paddingRight={6}>
      <Box display="flex" alignItems="flexEnd" justifyContent="spaceBetween">
        <Text fontWeight="semiBold">{label}:</Text>
        {step && <JumpToStep step={step} label={label} />}
      </Box>

      {children}
    </Box>
  )
}

// ---------------------------------------------------------------------------

export type EditReviewOverviewProps = {
  hasWarnings: boolean
}

export const EditReviewOverview = (props: EditReviewOverviewProps) => {
  const { draft, lawChapters, isEditor } = useDraftingState()
  const { formatMessage, formatDateFns } = useLocale()
  const t = formatMessage
  const { hasWarnings } = props

  const [clicked, setClicked] = useState({
    title: false,
    html: false,
    filesZip: false,
    idealPublishDate: false,
    signatureDate: false,
    signedDocument: false,
    PDF: false,
  })
  const flagAsClick = (key: keyof typeof clicked) => {
    setClicked({ ...clicked, [key]: true })

    setTimeout(() => {
      setClicked({ ...clicked, [key]: false })
    }, 1500)
  }

  const formatDate = (date?: Date, format?: string) =>
    date ? formatDateFns(date, format || 'd. MMMM yyyy') : ''

  if (hasWarnings) {
    return null
  }

  const typeName = t(
    draft.type.value === RegulationDraftTypes.amending
      ? editorMsgs.type_amending
      : editorMsgs.type_base,
  )

  return (
    <Box marginBottom={4}>
      <OverviewItem label={t(editorMsgs.title)} step="basics">
        <Text>
          {draft.title.value}({typeName})
        </Text>
      </OverviewItem>

      {draft.appendixes.length > 0 && (
        <OverviewItem label={t(editorMsgs.appendixes)} step="basics">
          <Text>
            {prettyJoin(draft.appendixes.map((a) => '„' + a.title.value + '“'))}
          </Text>
        </OverviewItem>
      )}

      <OverviewItem label={t(editorMsgs.effectiveDate)} step="meta">
        <Text>
          {formatDate(draft.effectiveDate.value) ||
            t(editorMsgs.effectiveDate_default)}
        </Text>
      </OverviewItem>

      <OverviewItem label={t(editorMsgs.lawChapters)} step="meta">
        <Text>
          {prettyJoin(
            draft.lawChapters.value.map(
              (slug) => '„' + lawChapters.bySlug[slug] + '“',
            ),
          )}
        </Text>
      </OverviewItem>

      <OverviewItem label={t(editorMsgs.signatureDate)} step="signature">
        <Text>
          {draft.ministry.value}nu, {formatDate(draft.signatureDate.value)}
        </Text>
      </OverviewItem>

      <OverviewItem label={t(editorMsgs.idealPublishDate)} step="meta">
        <Text>
          {formatDate(draft.idealPublishDate.value) ||
            t(editorMsgs.idealPublishDate_default)}
          {draft.fastTrack.value ? ` (${t(editorMsgs.applyForFastTrack)})` : ''}
        </Text>
      </OverviewItem>
      {getDateOverviewWarning(
        draft.effectiveDate.value,
        draft.idealPublishDate.value,
        draft.fastTrack.value,
      ).map((item) => (
        <Box marginBottom={3} width="half">
          <AlertMessage
            message={t(item)}
            type="default"
            action={
              <JumpToStep step="meta" label={t(editorMsgs.stepMetaHeadline)} />
            }
          />
        </Box>
      ))}

      {Object.keys(draft.impacts).length > 0 && (
        <Box marginTop={4} marginBottom={4}>
          <Text variant="h4" as="h4" marginBottom={2}>
            {t(reviewMessages.impactsTitle)}
          </Text>

          {Object.keys(draft.impacts).map((key) => {
            const impactsList = draft.impacts[key]
            const label =
              key === 'self' ? t(impactMsgs.selfAffecting) : `${key}`

            return (
              <OverviewItem key={key} label={label} step="impacts">
                {impactsList.map((impact) => (
                  <div key={impact.id}>
                    {formatDate(impact.date.value)}
                    {' - '}
                    {t(
                      impact.type === 'amend'
                        ? 'Textabreyting'
                        : 'Fellur úr gildi',
                    )}
                  </div>
                ))}
              </OverviewItem>
            )
          })}
        </Box>
      )}

      {isEditor && (
        <Box marginTop={4}>
          <Box marginBottom={[0, 0, 2]}>
            <Divider />
            {' '}
          </Box>

          <Inline space={[3, 3, 4, 5]} align="left" alignY="center">
            <MicroAction
              text={t(reviewMessages.copyTitle)}
              clicked={clicked.title}
              icon="copy"
              onClick={() => {
                copyToClipboard(draft.title.value, {
                  format: 'text/plain',
                  onCopy: () => flagAsClick('title'),
                })
              }}
            />
            <MicroAction
              text={t(reviewMessages.copyHtml)}
              clicked={clicked.html}
              icon="copy"
              onClick={() => {
                copyToClipboard(
                  // NÓTE: This HTML has not been run through
                  // `cleanupAndCombineEditorOutputs()` on the server side.
                  //...and also may need to be "dummified" for saving
                  // in Stjórnartíðindi's db
                  // See: https://app.asana.com/0/1200403571249062/1201743082260316
                  combineTextAppendixesComments(
                    draft.text.value,
                    draft.appendixes.map((a) => ({
                      title: a.title.value,
                      text: a.text.value,
                    })),
                    '',
                  ),
                  {
                    // NOTE: text/html format (the deafault mode) only copies
                    // rich-text content to the clipboard, which prevents pasting
                    // into plain-text editing contexts (like <textarea>s, plain-text
                    // editors, etc.)
                    // This is a known issue: https://github.com/sudodoki/copy-to-clipboard/issues/112
                    format: 'text/html',
                    onCopy: () => flagAsClick('html'),
                  },
                )
              }}
            />

            <MicroAction
              text={t(reviewMessages.copySignatureDate)}
              clicked={clicked.signatureDate}
              icon="copy"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                copyToClipboard(toISODate(draft.signatureDate.value!), {
                  format: 'text/plain',
                  onCopy: () => flagAsClick('signatureDate'),
                })
              }}
            />

            {draft.idealPublishDate.value && (
              <MicroAction
                text={t(reviewMessages.copyIdealPublishDate)}
                clicked={clicked.idealPublishDate}
                icon="copy"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  copyToClipboard(toISODate(draft.idealPublishDate.value!), {
                    format: 'text/plain',
                    onCopy: () => flagAsClick('idealPublishDate'),
                  })
                }}
              />
            )}

            <MicroAction
              text={t(reviewMessages.downloadSignedDocument)}
              clicked={clicked.signedDocument}
              icon="download"
              onClick={() => {
                flagAsClick('signedDocument')
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                downloadUrl(draft.signedDocumentUrl.value!)
              }}
            />

            <DownloadDraftButton draftId={draft.id} reviewButton={true} />
          </Inline>
        </Box>
      )}
    </Box>
  )
}
