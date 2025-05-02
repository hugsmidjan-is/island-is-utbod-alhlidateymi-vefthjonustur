import { Envs } from '../environments'
import { Charts } from '../uber-charts/all-charts'
import { renderHelmServiceFile } from '../dsl/exports/helm'

export const EXCLUDED_ENVIRONMENT_NAMES = [
  'DB_PASSWORD',
  'DB_HOST',
  'DB_USER',
  'NOVA_USERNAME',
  'NOVA_PASSWORD',
  'DB_REPLICAS_HOST',
  'NODE_OPTIONS',
  'REDIS_NODES',
  'REDIS_URL_NODE_01',
  'XROAD_NATIONAL_REGISTRY_REDIS_NODES',
  'COMPANY_REGISTRY_REDIS_NODES',
]

export const EXCLUDED_ENVIRONMENT_PATTERNS = [/.*_NODES?$/, /REDIS/]

/**
 * Returns true if the environment variable should be included
 * based on the name
 */
export function shouldIncludeEnv(name: string | string[]): boolean {
  if (Array.isArray(name)) {
    return name.every(shouldIncludeEnv)
  }
  return (
    EXCLUDED_ENVIRONMENT_PATTERNS.every((pattern) => !pattern.test(name)) &&
    !EXCLUDED_ENVIRONMENT_NAMES.includes(name)
  )
}

const OVERRIDE_ENVIRONMENT_NAMES: Record<string, string> = {
  XROAD_BASE_PATH: 'http://localhost:8081',
  XROAD_BASE_PATH_WITH_ENV: 'http://localhost:8081/r1/IS-DEV',
  XROAD_TLS_BASE_PATH: 'https://localhost:8081',
  XROAD_TLS_BASE_PATH_WITH_ENV: 'https://localhost:8081/r1/IS-DEV',
}

export const renderServiceEnvVars = async (service: string) => {
  const services = await Promise.all(
    Object.values(Charts).map(
      async (chart) =>
        (
          await renderHelmServiceFile(
            Envs.dev01,
            chart.dev,
            chart.dev,
            'no-mocks',
          )
        ).services,
    ),
  )

  const secretRequests: [string, string][] = services
    .map((svc) => {
      return Object.entries(svc)
        .map(([serviceName, config]) => {
          if (serviceName == service) {
            return Object.entries(config.env)
          }
          return []
        })
        .flat()
    })
    .flat()
    // .reduce((p, c) => p.concat(c), [])
    .filter(shouldIncludeEnv)
    .map((request) => {
      const envName = request[0]
      const ssmName = OVERRIDE_ENVIRONMENT_NAMES[envName]
      if (ssmName) {
        return [envName, ssmName]
      }
      return request
    })

  secretRequests.forEach(([envName, ssmName]) => {
    console.log(`export ${envName}=${ssmName}`)
  })
}
