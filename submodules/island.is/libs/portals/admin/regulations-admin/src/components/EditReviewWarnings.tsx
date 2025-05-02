import { Box, Text, Button, AlertMessage } from '@island.is/island-ui/core'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { editorMsgs, reviewMessages } from '../lib/messages'
import { DraftingState } from '../state/types'
import { isDraftErrorFree } from '../state/validations'
import { Step, StepNames } from '../types'
import { useLocale } from '@island.is/localization'
import { getEditUrl } from '../utils/routing'
import { MessageDescriptor } from '@formatjs/intl'

type ReviewMessage = {
  label: string
  error: string
  step: Step
}

export const useCollectMessages = (
  state: DraftingState,
  t: /* FormatMessage */ (
    descriptor: MessageDescriptor | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values?: Record<string, any>,
  ) => string,
): Array<ReviewMessage> | undefined =>
  useMemo(() => {
    if (isDraftErrorFree(state)) {
      return
    }
    const {
      title,
      type,
      text,
      appendixes,
      effectiveDate,
      idealPublishDate,
      signedDocumentUrl,
      signatureDate,
      signatureText,
      ministry,
      lawChapters,
      impacts,
      authors,
      draftingNotes,
      draftingStatus,
      fastTrack,
      id,
      mentioned,
      name,
    } = state.draft
    const messages: Array<ReviewMessage> = []

    const titleError = title.error || type.error // …because "type" field errors are caused by weirdly shaped titles

    let step: Step = StepNames.basics

    if (titleError) {
      messages.push({
        label: t(editorMsgs.title),
        error: t(titleError),
        step,
      })
    }
    if (text.error) {
      messages.push({
        label: t(editorMsgs.text),
        error: t(text.error),
        step,
      })
    }
    appendixes.forEach(({ title, text }, idx) => {
      const idxSuffix = ' ' + (idx + 1)
      if (title.error) {
        messages.push({
          label: t(editorMsgs.appendix_title) + idxSuffix,
          error: t(title.error),
          step,
        })
      }
      if (text.error) {
        messages.push({
          label: t(editorMsgs.appendix_text) + idxSuffix,
          error: t(text.error),
          step,
        })
      }
    })

    step = StepNames.meta

    if (effectiveDate.error) {
      messages.push({
        label: t(editorMsgs.effectiveDate),
        error: t(effectiveDate.error),
        step,
      })
    }
    if (lawChapters.error) {
      messages.push({
        label: t(editorMsgs.lawChapters),
        error: t(lawChapters.error),
        step,
      })
    }

    step = StepNames.signature

    if (signedDocumentUrl.error) {
      messages.push({
        label: t(editorMsgs.signedDocumentUpload),
        error: t(signedDocumentUrl.error),
        step,
      })
    }
    if (signatureText.error) {
      messages.push({
        label: t(editorMsgs.signatureText),
        error: t(signatureText.error),
        step,
      })
    } else {
      // Wrapping these fields in an else block is just to reduce noise.
      // We hide these if signedDocumentUrl has error because
      // when signedDocumentUrl is missing, then these fields are
      // almost always in error too

      if (signatureDate.error) {
        messages.push({
          label: t(editorMsgs.signatureDate),
          error: t(signatureDate.error),
          step,
        })
      }
      if (ministry.error) {
        messages.push({
          label: t(editorMsgs.ministry),
          error: t(ministry.error),
          step,
        })
      }
    }
    if (idealPublishDate.error) {
      messages.push({
        label: t(editorMsgs.idealPublishDate),
        error: t(idealPublishDate.error),
        step,
      })
    }

    if (Array.isArray(impacts)) {
      impacts.forEach((impact) => {
        if (impact.error) {
          messages.push({
            label: t(editorMsgs.stepImpactHeadline),
            error: t(impact.error),
            step,
          })
        }
      })
    }

    if (name.error) {
      messages.push({
        label: t(editorMsgs.name),
        error: t(name.error),
        step,
      })
    }

    return messages
  }, [state, t])

// ---------------------------------------------------------------------------

export const JumpToStep = (props: { step: Step; label: string }) => {
  const t = useLocale().formatMessage
  const navigate = useNavigate()
  const jumpLabel = t(reviewMessages.jumpToStepButton)

  return (
    <Button
      variant="text"
      size="small"
      onClick={() => navigate(`./../${getEditUrl(props.step)}`)}
      aria-label={jumpLabel + ': ' + props.label}
    >
      {jumpLabel}
    </Button>
  )
}

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

export type EditReviewWarningsProps = {
  messages?: Array<ReviewMessage>
}

export const EditReviewWarnings = (props: EditReviewWarningsProps) => {
  const t = useLocale().formatMessage

  if (!props.messages?.length) {
    return null
  }

  return (
    <Box marginBottom={4}>
      <Text variant="h2" as="h2" marginBottom={3}>
        {t(reviewMessages.warningsTitle)}
      </Text>
      {props.messages.map((m, i) => (
        <Box marginBottom={2} key={i}>
          <AlertMessage
            key={i}
            type="error"
            title={m.label}
            message={
              <div>
                {m.error}. <JumpToStep step={m.step} label={m.label} />
              </div>
            }
          />
        </Box>
      ))}
    </Box>
  )
}
