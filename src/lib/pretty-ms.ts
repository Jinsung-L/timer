import parseMs from 'parse-ms'

export default function prettyMs(milliseconds: number): string {
  const parsed = parseMs(milliseconds)
  const parts = [parsed.days, parsed.hours, parsed.minutes, parsed.seconds]
  const startIndex = parts.findIndex((part) => part !== 0)

  if (startIndex === -1) return '0s'

  return parts
    .map((part, index) => {
      const unit = 'dhms'[index]
      if (index < startIndex) return null
      if (index === startIndex) return String(part) + unit
      return String(part).padStart(2, '0') + unit
    })
    .filter(Boolean)
    .join(' ')
}
