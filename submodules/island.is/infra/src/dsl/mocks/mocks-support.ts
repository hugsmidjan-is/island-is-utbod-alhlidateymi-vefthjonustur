import { createHash } from 'crypto'
import { URL } from 'url'

const portsIndex = 9000

export function hostPortNumber(name: string) {
  return (
    portsIndex +
    (Number.parseInt(
      createHash('sha1').update(name, 'utf-8').digest('hex').slice(-3),
      16,
    ) %
      1000)
  )
}

export function getMockName(to: string) {
  // URL constructer requires a protocol
  if (!to.match(/\w+:\/\//)) to = `proto://${to}`
  const parsed = new URL(to)
  parsed.pathname = ''
  return {
    name: `mock-${parsed.host.replace(/\./g, '-')}`,
    host: parsed.toString().slice(0, -1),
  }
}
