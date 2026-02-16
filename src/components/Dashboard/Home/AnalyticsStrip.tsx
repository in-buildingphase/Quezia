import React from 'react'
import MiniLineGraph from '../../common/MiniLineGraph'
import SectionStrip from '../../common/SectionStrip'
import { ArrowUpRight } from '@phosphor-icons/react'

const AnalyticsStrip: React.FC = () => {
  const actions = (
    <>
      <button className="h-7 w-7 rounded-md border border-white/10 hover:bg-white/5 transition" />
      <button
        onClick={() => window.location.href = '/tests'}
        className="h-7 w-7 rounded-md border border-white/10 hover:bg-white/5 transition flex items-center justify-center"
      >
        <ArrowUpRight size={14} className="text-white" />
      </button>
    </>
  )

  return (
    <SectionStrip title="Performance overview" actions={actions}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Rank */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
              {/* Text block */}
              <div className="px-6 pt-5 pb-4">
                <p className="text-sm text-neutral-400">
                  Rank trajectory
                </p>

                <div className="mt-3">
                  <h3 className="text-3xl font-semibold text-white">
                    ↑ Improving
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Average rank across recent tests
                  </p>
                </div>
              </div>

              {/* Graph block (edge-to-edge) */}
              <div className="pb-4">
                <MiniLineGraph
                  data={[12, 1, 20, 3, 4, 2]}
                  color="#8B5CF6"
                />
              </div>
            </div>

            {/* Time */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
              <div className="px-6 pt-5 pb-4">
                <p className="text-sm text-neutral-400">
                  Time efficiency
                </p>

                <div className="mt-3">
                  <h3 className="text-3xl font-semibold text-white">
                    1.42×
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Faster than exam benchmark
                  </p>
                </div>
              </div>

              <div className="pb-4">
                <MiniLineGraph
                  data={[1.0, 1.1, 2.2, 1.3, 1.4, 1.42]}
                  color="#8B5CF6"
                />
              </div>
            </div>

            {/* Stability */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
              <div className="px-6 pt-5 pb-4">
                <p className="text-sm text-neutral-400">
                  Topic stability
                </p>

                <div className="mt-3">
                  <h3 className="text-3xl font-semibold text-white">
                    78%
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Topics in stable mastery zone
                  </p>
                </div>
              </div>

              <div className="pb-4">
                <MiniLineGraph
                  data={[65, 68, 72, 75, 77, 78]}
                  color="#EF4444"
                />
              </div>
            </div>
          </div>
    </SectionStrip>
  )
}

export default AnalyticsStrip
