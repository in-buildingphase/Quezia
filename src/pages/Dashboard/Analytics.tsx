import { useState, useEffect } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { analyticsService } from '../../services/analytics'
import AnalyticsHeader from '../../components/Dashboard/Analytics/AnalyticsHeader'
import MetricsRow from '../../components/Dashboard/Analytics/MetricsRow'
import AnalyticsGrid from '../../components/Dashboard/Analytics/AnalyticsGrid'
import SearchResultsGrid from '../../components/Dashboard/Analytics/SearchResultsGrid' // Import new component
import CompareModeToggle, { type CompareMode } from '../../components/Dashboard/Analytics/CompareModeToggle'
import type { AnalyticsFilter, MetricCardData, PerformanceTrendPoint, RankComparisonPoint, SubjectMastery, TopicHealth, TimeEfficiencyPoint } from '../../components/Dashboard/Analytics/types'
import type { TestAttempt } from '../../services/mockDatabase' // Import TestAttempt type

const Analytics = () => {
  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------
  const [filters, setFilters] = useState<AnalyticsFilter>({
    subject: [],
    dateRange: 'month',
    testType: 'all',
    difficulty: 'all',
    searchQuery: '',
    isSearchActive: false
  })

  const [compareMode, setCompareMode] = useState<CompareMode>('personal')
  const [loading, setLoading] = useState(true)

  // Data State
  const [data, setData] = useState<{
    metrics: MetricCardData[]
    performanceData: PerformanceTrendPoint[]
    rankData: RankComparisonPoint[]
    subjectData: SubjectMastery[]
    timeData: TimeEfficiencyPoint[]
    topicData: TopicHealth[]
    insights: string[]
    filteredAttempts: TestAttempt[] // Add filteredAttempts to state
  }>({
    metrics: [],
    performanceData: [],
    rankData: [],
    subjectData: [],
    timeData: [],
    topicData: [],
    insights: [],
    filteredAttempts: []
  })

  // -------------------------------------------------------------------------
  // Data Fetching
  // -------------------------------------------------------------------------

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const dashboardData = await analyticsService.fetchAnalyticsDashboardData(filters)
        setData(dashboardData)
      } catch (error) {
        // Failed to load analytics data - handle silently
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [filters]) // Re-fetch when filters change


  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] px-6 py-8 md:px-10 md:py-12 font-sans text-[var(--color-text-secondary)]">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header & Filters */}
        <AnalyticsHeader filters={filters} onFilterChange={setFilters} />

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner message="Updating analytics..." />
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Conditional Rendering: Search Mode vs Dashboard Mode */}
            {filters.isSearchActive ? (
              <SearchResultsGrid
                attempts={data.filteredAttempts}
                searchQuery={filters.searchQuery}
                onExit={() => setFilters(prev => ({ ...prev, isSearchActive: false, searchQuery: '' }))}
              />
            ) : (
              <>
                {/* UNDER CONSTRUCTION MESSAGE - Remove this block when analytics are ready */}
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-[var(--color-border)] rounded-xl bg-[var(--color-bg-sub)]/20 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-3xl">🚧</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Performance Analytics Dashboard</h3>
                  <p className="text-[var(--color-text-tertiary)] max-w-md mx-auto mb-6">
                    This comprehensive analytics dashboard is currently under construction. 
                    We're building powerful tools to help you visualize your progress.
                  </p>
                  <div className="px-4 py-2 bg-[var(--color-bg-sub)] rounded-lg text-sm text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                    Coming Soon
                  </div>
                </div>

                {/* HIDDEN CONTENTS - Remove className="hidden" to restore */}
                <div className="hidden">
                  {/* Top Row: Metrics & Compare Toggle */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h2 className="text-lg font-medium text-white">Overview</h2>
                      <CompareModeToggle mode={compareMode} onChange={setCompareMode} />
                    </div>
                    <MetricsRow metrics={data.metrics} />
                  </div>

                  {/* Charts Grid */}
                  <AnalyticsGrid
                    performanceData={data.performanceData}
                    rankData={data.rankData}
                    subjectData={data.subjectData}
                    timeData={data.timeData}
                    topicData={data.topicData}
                    insights={data.insights}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics