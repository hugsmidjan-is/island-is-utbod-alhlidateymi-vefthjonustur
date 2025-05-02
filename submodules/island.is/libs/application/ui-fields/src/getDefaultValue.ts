import {
  Application,
  BaseField,
  FieldTypes,
} from '@island.is/application/types'

export const getDefaultValue = (field: BaseField, application: Application) => {
  const { defaultValue, type } = field

  if (type === FieldTypes.TEXT && !defaultValue) {
    return ''
  }

  if (defaultValue === undefined) {
    return undefined
  }

  if (typeof defaultValue === 'function') {
    return defaultValue(application, field)
  }

  return defaultValue
}
