import { ConfigModule, registerAs } from '@nestjs/config'

import { ConfigurationLoader } from './ConfigurationLoader'
import { ConfigDefinition, ConfigFactory } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defineConfig = <T extends Record<string, any>>(
  definition: ConfigDefinition<T>,
): ConfigFactory<T> => {
  const loader = new ConfigurationLoader<T>(definition)
  const factory = registerAs(definition.name, () => {
    return loader.load()
  }) as ConfigFactory<T>

  factory.optional = () => {
    const cloneDefinition = Object.assign(
      {},
      {
        ...definition,
        optional: true,
      },
    )

    const cloneLoader = new ConfigurationLoader<T>(cloneDefinition)
    return registerAs(cloneDefinition.name, () =>
      cloneLoader.load(),
    ) as ConfigFactory<T>
  }

  factory.registerOptional = () => ConfigModule.forFeature(factory.optional())

  return factory
}
