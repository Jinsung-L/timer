import {
  FC,
  Fragment,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import ms from '../lib/pretty-ms'
import parseMs from 'parse-ms'

interface DurationPickerProps {
  value: number
  onChange: (duration: number) => void
}

const DurationPicker: FC<DurationPickerProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (input) {
      const newValue: number =
        String(input)
          .padStart(6, '0')
          .match(/.{2}/g)
          ?.map((seg, i) => Number(seg) * [60 * 60, 60, 1][i])
          .reduce((sum, value) => sum + value, 0) ?? 0
      onChange(Math.min(newValue, 360000 - 1))
    }
  }, [input, onChange])

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.key === 'Backspace') {
        if (input.length <= 1) {
          onChange(0)
        }
        setInput(input.slice(0, -1))
        return
      }

      if (!'0123456789'.includes(event.key)) return

      setInput((input + event.key).slice(-6))
    },
    [input, onChange]
  )

  const handleBlur = useCallback(() => {
    setInput('')
    setIsFocused(false)
  }, [])

  const parsed = parseMs(value * 1000)
  const placeholder = [
    String(parsed.days * 24 + parsed.hours).padStart(2, '0') + 'h',
    String(parsed.minutes).padStart(2, '0') + 'm',
    String(parsed.seconds).padStart(2, '0') + 's',
  ].join(' ')

  const inputDisplay = (
    <>
      {String(input)
        .padStart(6, '-')
        .match(/.{2}/g)
        ?.map((seg, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            {seg.split('').map((digit, j) =>
              digit === '-' ? (
                <span key={j} className="text-gray-400">
                  0
                </span>
              ) : (
                <span key={j}>{digit}</span>
              )
            )}
            <span className={seg === '--' ? 'text-gray-400' : ''}>
              {'hms'[i]}
            </span>
          </Fragment>
        ))}
    </>
  )

  return (
    <div
      className="text-6xl font-thin outline-none select-none lining-nums tabular-nums"
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {isFocused ? (
        input.length > 0 ? (
          <span>{inputDisplay}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )
      ) : (
        <span>{value === 0 ? '0s' : ms(value * 1000)}</span>
      )}
    </div>
  )
}

export default DurationPicker
