// borrowed from here https://github.com/HermannBjorgvin/Kennitala/blob/1.2.6/kennitala.js#L150
function isPerson(kt: string) {
  const d = Number.parseInt(kt.substring(0, 2), 10)
  const m = Number.parseInt(kt.substring(2, 4), 10)

  return d > 0 && d <= 31 && m > 0 && m <= 12
}
const nationalIdRegexp = /\b\d{6}-?\d{4}\b/g
const isProd = process.env['NODE_ENV'] === 'production'
const replaceString = isProd ? '--MASKED--' : '**REMOVE_PII: $&**'

export const maskNationalId = (text: string) => {
  const matches = text.match(nationalIdRegexp) || []
  matches.forEach((match) => {
    if (isPerson(match)) {
      text = text.replace(match, replaceString)
    }
  })
  return text
}
