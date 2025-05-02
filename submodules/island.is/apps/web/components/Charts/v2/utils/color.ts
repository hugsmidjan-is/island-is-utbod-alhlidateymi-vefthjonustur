import { Chart } from '@island.is/web/graphql/schema'

import {
  COMPONENT_TYPES_WITH_FILL,
  PREDEFINED_LINE_DASH_PATTERNS,
  PRIMARY_COLORS,
  PRIMARY_FILL_PATTERNS,
  SECONDARY_COLORS,
  SECONDARY_FILL_PATTERNS,
} from '../constants'
import { ChartComponentType, ChartType, ComponentStyle } from '../types'
import { decideChartBase } from './chart'

interface ComponentStyleConfig {
  id: string
  indexWithinType: number
  isFilled: boolean
  isLine: boolean
  hasBorderRadius: boolean
  renderIndex: number
}

export const generateComponentStyleConfigs = (
  components: Chart['components'],
): ComponentStyleConfig[] => {
  let currentIndexOfComponentWithFill = 0
  let currentIndexOfComponentWithLine = 0

  const stackLookup = components.reduce((lookup, component, i) => {
    if (component.type === 'bar' && component.stackId) {
      if (!lookup[component.stackId]) {
        lookup[component.stackId] = []
      }
      lookup[component.stackId].push(i)
    }

    return lookup
  }, {} as Record<string, number[]>)

  return components.map((component, i) => {
    const isFilled = COMPONENT_TYPES_WITH_FILL.includes(
      component.type as ChartComponentType,
    )
    const isLine = component.type === ChartComponentType.line

    let hasBorderRadius = false
    let lineIndex = -1
    let fillIndex = -1

    if (isLine) {
      lineIndex = currentIndexOfComponentWithLine
      currentIndexOfComponentWithLine += 1
    } else if (isFilled) {
      fillIndex = currentIndexOfComponentWithFill
      currentIndexOfComponentWithFill += 1
    }

    if (component.type === 'bar') {
      const indicesForStack = component.stackId
        ? stackLookup[component.stackId]
        : []
      const isLastInStack = i === indicesForStack[indicesForStack.length - 1]
      if (!component.stackId || isLastInStack) {
        hasBorderRadius = true
      }
    }

    return {
      id: component.id,
      renderIndex: i,
      indexWithinType:
        lineIndex !== -1 ? lineIndex : fillIndex !== -1 ? fillIndex : -1,
      isFilled,
      isLine,
      hasBorderRadius,
    }
  })
}

const getValueFromList = (colors: string[], index: number) =>
  // In theory nobody should ever have enough components to overflow,
  // the data should always be split into multiple charts at that point,
  // but in case they do, start from the beginning again
  colors[index % colors.length]

export const decideComponentStyles = (
  components: Chart['components'],
): ComponentStyle[] => {
  const styleConfigs = generateComponentStyleConfigs(components)
  const chartBase = decideChartBase(components)

  return styleConfigs.map((config) => {
    const { type } = components[config.renderIndex]

    let color = getValueFromList(PRIMARY_COLORS, config.indexWithinType)
    let pattern: string | undefined = undefined
    let patternId: string | undefined = undefined

    const canHaveFillPattern =
      config.isFilled && type !== ChartComponentType.pie

    if (chartBase === ChartType.mixed && config.isLine) {
      color = getValueFromList(SECONDARY_COLORS, config.indexWithinType)
    }

    if (canHaveFillPattern) {
      color = getValueFromList(
        PRIMARY_COLORS,
        Math.floor(config.indexWithinType / 2),
      )

      const shouldFillAreaPattern =
        type === ChartComponentType.area && config.indexWithinType % 2 === 0
      const shouldFillOtherPattern =
        type !== ChartComponentType.area && config.indexWithinType % 2 === 1

      if (shouldFillAreaPattern || shouldFillOtherPattern) {
        patternId = `url(#pattern-${chartBase}_${
          components[config.renderIndex].id
        }-${config.indexWithinType})`

        const patternIndex = Math.floor(config.indexWithinType / 2)
        pattern = getValueFromList(
          type === ChartComponentType.area
            ? SECONDARY_FILL_PATTERNS
            : PRIMARY_FILL_PATTERNS,
          patternIndex,
        )
      }
    } else if (config.isLine && config.indexWithinType > 0) {
      pattern = getValueFromList(
        PREDEFINED_LINE_DASH_PATTERNS,
        config.indexWithinType - 1,
      )
    }

    return {
      color,
      hasFill: config.isFilled,
      pattern,
      patternId,
      shouldRenderBorderRadius: config.hasBorderRadius,
      renderIndex: config.renderIndex,
      renderIndexForType: config.indexWithinType,
    }
  })
}
