import dynamic from 'next/dynamic'
import { Pie } from 'recharts'

import {
  Box,
  Inline,
  ResponsiveSpace,
  SkeletonLoader,
  Stack,
  Table as T,
  Text,
} from '@island.is/island-ui/core'
import { theme } from '@island.is/island-ui/theme'

export type PieChartItem = {
  color: keyof typeof theme.color
  title: string
  count?: number
  percentage?: number
}

export type PieChartProps = {
  items: PieChartItem[]
  dimension?: number
  intro?: string
}

const DEFAULT_PIE_DIMENSION = 240

const RechartsPieChart = dynamic(
  () => import('recharts').then((recharts) => recharts.PieChart),
  {
    loading: () => (
      <Box display="flex" justifyContent="center">
        <SkeletonLoader
          borderRadius="full"
          height={DEFAULT_PIE_DIMENSION}
          width={DEFAULT_PIE_DIMENSION}
        />
      </Box>
    ),
    ssr: false,
  },
)

const TABLE_CELL_STYLE: Record<string, ResponsiveSpace> = {
  paddingTop: 1,
  paddingBottom: 1,
  paddingRight: 1,
  paddingLeft: 1,
}

export const PieChart = ({
  items,
  intro,
  dimension = DEFAULT_PIE_DIMENSION,
}: PieChartProps) => {
  return (
    <Stack space={0}>
      {intro && <Text>{intro}</Text>}
      <Inline align="center">
        <RechartsPieChart width={dimension} height={dimension}>
          <Pie
            innerRadius={50}
            activeShape={{}}
            data={items.map((item) => ({
              name: item.title,
              count: item.count ?? 0,
              fill: theme.color[item.color],
              value: item.percentage,
            }))}
            dataKey="count"
          />
        </RechartsPieChart>
      </Inline>
      <T.Table>
        <T.Body>
          {items.map((item, index) => (
            <T.Row key={index}>
              <T.Data align="left" box={TABLE_CELL_STYLE}>
                <Inline space={1} alignY="center">
                  <Box
                    background={item.color}
                    borderRadius="full"
                    style={{ width: 12, height: 12 }}
                  />
                  <Text variant="small" fontWeight="medium">
                    {item.title}
                  </Text>
                </Inline>
              </T.Data>
              <T.Data
                align="right"
                style={{
                  paddingBlock: theme.spacing[1],
                  paddingInlineEnd: theme.spacing[1],
                }}
              >
                {item.count}
              </T.Data>
              <T.Data
                align="right"
                style={{
                  paddingBlock: theme.spacing[1],
                  paddingInlineEnd: theme.spacing[1],
                }}
              >
                {item.percentage}%
              </T.Data>
            </T.Row>
          ))}
          <T.Row>
            <T.Data align="left" box={TABLE_CELL_STYLE}>
              <Inline space={1} alignY="center">
                <Box
                  background="roseTinted400"
                  borderRadius="full"
                  style={{ width: 12, height: 12 }}
                />
                <Text variant="small" fontWeight="medium">
                  Alls
                </Text>
              </Inline>
            </T.Data>
            <T.Data align="right" box={TABLE_CELL_STYLE}>
              <Text variant="small" fontWeight="medium">
                {items.reduce((acc, item) => acc + (item.count ?? 0), 0)}
              </Text>
            </T.Data>
            <T.Data align="right" box={TABLE_CELL_STYLE}>
              <Text variant="small" fontWeight="medium">
                100%
              </Text>
            </T.Data>
          </T.Row>
        </T.Body>
      </T.Table>
    </Stack>
  )
}
