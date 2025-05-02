import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  GridContainer,
  GridColumn,
  GridRow,
  Divider,
} from '@island.is/island-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import { DraftCancelForm, RegDraftForm } from '../../state/types'
import { toISODate } from '@island.is/regulations'
import {
  useGetRegulationFromApiQuery,
  useGetRegulationImpactsQuery,
} from '../../utils/dataHooks'
import { ImpactHistory } from './ImpactHistory'
import { LayoverModal } from './LayoverModal'
import { ImpactModalTitle } from './ImpactModalTitle'
import {
  CREATE_DRAFT_REGULATION_CANCEL,
  UPDATE_DRAFT_REGULATION_CANCEL,
} from './impactQueries'
import { useGetRegulationHistory } from '../../utils/hooks'
import { fDate } from '../../state/makeFields'
import { RegulationDraftTypes } from '../../types'

type EditCancellationProp = {
  draft: RegDraftForm
  cancellation: DraftCancelForm
  closeModal: (reload?: boolean) => void
}

export const EditCancellation = (props: EditCancellationProp) => {
  const { draft, cancellation, closeModal } = props
  const [activeCancellation, setActiveCancellation] = useState(cancellation)
  const today = useMemo(() => new Date(), [])
  const [minDate, setMinDate] = useState(today)

  const { data: regulation } = useGetRegulationFromApiQuery(
    cancellation.name,
    toISODate(minDate),
  )

  const [createDraftRegulationCancel] = useMutation(
    CREATE_DRAFT_REGULATION_CANCEL,
  )
  const [updateDraftRegulationCancel] = useMutation(
    UPDATE_DRAFT_REGULATION_CANCEL,
  )

  const { data: draftImpacts } = useGetRegulationImpactsQuery(
    activeCancellation.name,
  )

  const { allFutureEffects, hasImpactMismatch } = useGetRegulationHistory(
    regulation,
    activeCancellation,
    draftImpacts,
    draft.id,
  )

  useEffect(() => {
    const lastDay = allFutureEffects
      .filter((eff) => eff.origin !== 'self')
      .slice(-1)?.[0]?.date
    const minDateDate = lastDay ? new Date(lastDay) : today
    if (toISODate(minDateDate) !== toISODate(minDate)) {
      setMinDate(minDateDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFutureEffects])

  const changeCancelDate = (newDate: Date | undefined) => {
    setActiveCancellation({
      ...activeCancellation,
      date: fDate(newDate, true, { min: minDate }),
    })
  }

  useEffect(() => {
    if (activeCancellation && !activeCancellation.id) {
      changeCancelDate(minDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDate])

  const saveCancellation = async () => {
    if (!cancellation.id) {
      await createDraftRegulationCancel({
        variables: {
          input: {
            date: toISODate(activeCancellation.date.value || today),
            changingId: draft.id,
            regulation: activeCancellation.name,
          },
        },
      })
        .then((res) => {
          if (res.errors && res.errors.length > 1) {
            throw res.errors[0]
          }
          return { success: true, error: undefined }
        })
        .catch((error) => {
          return { success: false, error: error as Error }
        })
    } else {
      await updateDraftRegulationCancel({
        variables: {
          input: {
            id: activeCancellation.id,
            date: toISODate(activeCancellation.date.value || today),
          },
        },
      })
        .then((res) => {
          if (res.errors && res.errors.length > 1) {
            throw res.errors[0]
          }
          return { success: true, error: undefined }
        })
        .catch((error) => {
          return { success: false, error: error as Error }
        })
    }
    closeModal(true)
  }

  const isValidImpact = () => {
    return activeCancellation.date?.value
  }

  return (
    <LayoverModal closeModal={closeModal} id="EditCancelationModal">
      <GridContainer>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '6/12']}
            offset={['0', '0', '0', '2/12']}
          >
            <ImpactModalTitle
              impact={activeCancellation}
              name={activeCancellation.name}
              title={
                activeCancellation.name === 'self'
                  ? 'stofnreglugerð'
                  : activeCancellation.regTitle
              }
              type={'cancel'}
              minDate={minDate}
              tag={
                regulation?.type && {
                  first: 'Brottfelling reglugerðar',
                  second:
                    regulation?.type === RegulationDraftTypes.base
                      ? 'Stofnreglugerð'
                      : 'Breytingareglugerð',
                }
              }
              onChangeDate={changeCancelDate}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '10/12', '8/12']}
            offset={['0', '0', '0', '1/12', '2/12']}
          >
            <ImpactHistory
              impactDate={activeCancellation.date.value}
              allFutureEffects={allFutureEffects}
              targetName={activeCancellation.name}
              draftId={draft.id}
              impactId={activeCancellation.id}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '10/12', '8/12']}
            offset={['0', '0', '0', '1/12', '2/12']}
          >
            <Box paddingY={5}>
              <Divider />
            </Box>
            <Box
              display="flex"
              justifyContent="spaceBetween"
              alignItems="center"
            >
              <Button
                onClick={() => closeModal()}
                variant="text"
                size="small"
                preTextIcon="arrowBack"
              >
                Til baka
              </Button>
              <Button
                onClick={saveCancellation}
                size="small"
                icon="arrowForward"
                disabled={hasImpactMismatch || !isValidImpact()}
              >
                Vista brottfellingu
              </Button>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </LayoverModal>
  )
}
