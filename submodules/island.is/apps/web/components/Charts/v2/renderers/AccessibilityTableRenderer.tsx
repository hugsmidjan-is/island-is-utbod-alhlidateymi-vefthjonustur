import type { Locale } from '@island.is/shared/types'
import { Chart } from '@island.is/web/graphql/schema'

import { DEFAULT_XAXIS_KEY } from '../constants'
import { useGetChartData, useGetChartTableSettings } from '../hooks'
import { ChartComponentWithRenderProps } from '../types'
import { formatDate } from '../utils'

interface AccessibilityTableRendererProps {
  id: string
  activeLocale: Locale
  chart: Chart
  componentsWithAddedProps: ChartComponentWithRenderProps[]
  data: ReturnType<typeof useGetChartData>['data']
}

export const AccessibilityTableRenderer = ({
  id,
  activeLocale,
  chart,
  componentsWithAddedProps,
  data,
}: AccessibilityTableRendererProps) => {
  const tableSettings = useGetChartTableSettings(chart)

  const xAxisKey = chart.xAxisKey ?? DEFAULT_XAXIS_KEY
  const xAxisValueType = chart.xAxisValueType ?? DEFAULT_XAXIS_KEY

  return (
    // Apply this class on a div rather than the table to avoid layout issues
    <div className="visually-hidden">
      <table id={id}>
        <caption>
          {chart.title}
          <br />
          {chart.alternativeDescription}
        </caption>
        {tableSettings !== null && (
          <>
            <thead>
              <tr>
                {tableSettings.tableHeadWithAxis.map((th) => (
                  <th scope="col" key={th}>
                    {componentsWithAddedProps.find(
                      (c) => c.sourceDataKey === th,
                    )?.label ?? th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                const xAxisValue = row[xAxisKey]

                return (
                  <tr key={xAxisValue}>
                    <th scope="row">
                      {xAxisValueType === 'date' && xAxisValue !== null
                        ? formatDate(activeLocale, xAxisValue)
                        : xAxisValue}
                    </th>
                    {tableSettings.tableHead.map((key) => {
                      const rowValue = row[key]

                      return <td>{rowValue}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </>
        )}
      </table>
    </div>
  )
}
