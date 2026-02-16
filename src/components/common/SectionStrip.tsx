import React from 'react'

type Props = {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

const SectionStrip: React.FC<Props> = ({ title, actions, children, className = '' }) => {
  return (
    <div className={`mt-12 ${className}`}>
      <div className="rounded-2xl border-t border-white/20 px-4 pt-3 pb-4">
        {/* TOP STRIP */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            {title}
          </p>

          {actions && (
            <div className="flex gap-2">
              {actions}
            </div>
          )}
        </div>

        {/* INNER CONTAINER */}
        <div className="rounded-xl border border-white/10 bg-white/[0.045] backdrop-blur px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SectionStrip
