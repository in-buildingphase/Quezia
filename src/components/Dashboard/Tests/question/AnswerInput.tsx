import React from 'react'
import AnswerOption from './AnswerOption'

export type QuestionType = 'mcq' | 'numeric'

export type AnswerValue = number | string | null

type MCQProps = {
  type: 'mcq'
  options: string[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}

type NumericProps = {
  type: 'numeric'
  value: string
  onChange: (value: string) => void
  hint?: string
}

type Props = MCQProps | NumericProps

const AnswerInput: React.FC<Props> = (props) => {
  if (props.type === 'mcq') {
    return (
      <div className="space-y-3">
        {props.options.map((option, index) => (
          <AnswerOption
            key={index}
            label={String.fromCharCode(65 + index)}
            text={option}
            isSelected={props.selectedIndex === index}
            onSelect={() => props.onSelect(index)}
          />
        ))}
      </div>
    )
  }

  // Numeric type
  return (
    <div className="space-y-2">
      <input
        type="text"
        inputMode="numeric"
        value={props.value}
        onChange={(e) => {
          // Allow only numbers, minus sign, and decimal point
          const val = e.target.value
          if (val === '' || /^-?\d*\.?\d*$/.test(val)) {
            props.onChange(val)
          }
        }}
        placeholder="Enter your answer"
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:border-white/20 focus:bg-white/[0.05] focus:outline-none transition"
      />
      {props.hint && (
        <p className="text-xs text-neutral-500 px-1">{props.hint}</p>
      )}
    </div>
  )
}

export default AnswerInput
