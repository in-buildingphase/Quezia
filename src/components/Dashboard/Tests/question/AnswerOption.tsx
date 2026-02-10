import React from 'react'

type Props = {
  label: string
  text: string
  isSelected: boolean
  onSelect: () => void
}

const AnswerOption: React.FC<Props> = ({ label, text, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-lg border px-4 py-3 transition ${
        isSelected
          ? 'border-white/30 bg-white/10 text-neutral-100'
          : 'border-white/5 bg-white/[0.02] text-neutral-300 hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      <span className="mr-3 text-neutral-400">{label})</span>
      {text}
    </button>
  )
}

export default AnswerOption
