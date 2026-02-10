import React from 'react'

type Props = {
  threadId: string
}

const ThreadHeader: React.FC<Props> = ({ threadId }) => {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-wide text-neutral-500">
        Test thread
      </p>
      <h1 className="mt-1 text-lg font-medium text-neutral-200">
        Thread #{threadId}
      </h1>
    </div>
  )
}

export default ThreadHeader
