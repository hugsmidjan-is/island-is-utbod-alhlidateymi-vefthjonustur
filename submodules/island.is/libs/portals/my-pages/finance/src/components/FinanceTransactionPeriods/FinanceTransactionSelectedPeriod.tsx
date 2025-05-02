import {
  Box,
  Text,
  Table as T,
  AlertBanner,
  SkeletonLoader,
} from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import {
  ExpandHeader,
  ExpandRow,
  amountFormat,
  formatDate,
  m,
  periodFormat,
  NestedTable,
} from '@island.is/portals/my-pages/core'
import { useGetChargeTypePeriodSubjectQuery } from '../../screens/FinanceTransactionPeriods/FinanceTransactionPeriods.generated'
import { SelectedPeriod } from './FinanceTransactionPeriodsTypes'
import { m as messages } from '../../lib/messages'
import { useFinanceTransactionPeriodsState } from './FinanceTransactionPeriodsContext'

export default function FinanceTransactionSelectedPeriod({
  period,
  index,
}: {
  period: SelectedPeriod
  index: number
}) {
  const { formatMessage } = useLocale()

  const { financeTransactionPeriodsState, setFinanceTransactionPeriodsState } =
    useFinanceTransactionPeriodsState()

  const { data, loading, error, called } = useGetChargeTypePeriodSubjectQuery({
    variables: {
      input: {
        year: period.year,
        period: period.period,
        subject: period.subject,
        typeId: period.typeId,
      },
    },
    onCompleted: (data) => {
      if (data.getChargeTypePeriodSubject.records) {
        const sel = financeTransactionPeriodsState.selectedPeriods ?? []
        const currentState = [...sel]
        currentState[index].details = data.getChargeTypePeriodSubject.records
        setFinanceTransactionPeriodsState({ selectedPeriods: currentState })
      }
    },
  })

  return (
    <Box paddingBottom={4}>
      <Box paddingBottom={1}>
        <Text fontWeight="semiBold" variant="medium" as="span">
          {formatMessage(messages.chargeType)}:{' '}
        </Text>
        <Text variant="small" as="span">
          {period.chargeType} -{' '}
        </Text>
        <Text fontWeight="semiBold" variant="medium" as="span">
          {formatMessage(messages.feeBase)}:{' '}
        </Text>
        <Text variant="small" as="span">
          {period.subject} -{' '}
        </Text>
        <Text variant="small" as="span">
          {formatMessage(m.period)}:{' '}
        </Text>
        <Text fontWeight="semiBold" variant="small" as="span">
          {periodFormat(period.period)}
        </Text>
      </Box>

      {error && (
        <AlertBanner
          description={formatMessage(m.errorFetch)}
          variant="error"
        />
      )}
      {(loading || !called) &&
        !data?.getChargeTypePeriodSubject.records?.length &&
        !error && (
          <Box padding={3}>
            <SkeletonLoader space={1} height={40} repeat={4} />
          </Box>
        )}
      {!data?.getChargeTypePeriodSubject.records?.length &&
        called &&
        !loading &&
        !error && (
          <AlertBanner
            description={formatMessage(m.noResultsTryAgain)}
            variant="warning"
          />
        )}
      {data?.getChargeTypePeriodSubject.records?.length ? (
        <T.Table>
          <ExpandHeader
            data={[
              { value: '', printHidden: true, width: '56' },
              { value: formatMessage(m.dateShort), width: '15%' },
              { value: formatMessage(m.feeItem), width: '25%' },
              { value: formatMessage(m.recordCategory), width: '25%' },
              { value: formatMessage(m.amount), align: 'right', width: '15%' },
              {
                value: formatMessage(messages.combinedStatus),
                align: 'right',
                width: '15%',
              },
            ]}
          />
          <T.Body>
            {data.getChargeTypePeriodSubject.records.map((record) => (
              <ExpandRow
                key={`${record.category}-${record.chargeItemSubject}-${record.createTime}-${record.amount}`}
                data={[
                  {
                    value: formatDate(record.createDate),
                  },
                  { value: record.itemCode },
                  { value: record.category },
                  { value: amountFormat(record.amount), align: 'right' },
                  { value: '', align: 'right' },
                ]}
              >
                <NestedTable
                  data={[
                    {
                      title: formatMessage(m.effectiveDate),
                      value: formatDate(record.valueDate),
                    },
                    {
                      title: formatMessage(m.performingOrganization),
                      value: record.performingOrganization,
                    },
                    {
                      title: formatMessage(m.guardian),
                      value: record.collectingOrganization,
                    },
                    {
                      title: formatMessage(m.recordAction),
                      value: record.subCategory,
                    },
                    ...(record.actionCategory
                      ? [
                          {
                            title: formatMessage(m.actionCategory),
                            value: record.actionCategory,
                          },
                        ]
                      : []),
                    {
                      title: formatMessage(m.reference),
                      value: record.reference,
                    },
                  ]}
                />
              </ExpandRow>
            ))}
          </T.Body>
        </T.Table>
      ) : null}
    </Box>
  )
}
