import React from 'react'
import { scaleLinear } from '@visx/scale'
import { LinePath, AreaClosed, Circle } from '@visx/shape'
import { Group } from '@visx/group'
import { curveMonotoneX } from '@visx/curve'

interface MiniLineGraphProps {
  data: number[]
  color: string
  height?: number
}

const MiniLineGraph: React.FC<MiniLineGraphProps> = ({
  data,
  color,
  height = 88,
}) => {
  const width = 320
  const paddingX = 14
  const paddingY = 10

  const xScale = scaleLinear({
    domain: [0, data.length - 1],
    range: [paddingX, width - paddingX],
  })

  const yScale = scaleLinear({
    domain: [
      Math.min(...data) - 2,
      Math.max(...data) + 2,
    ],
    range: [height - paddingY, paddingY],
  })

  const lastIndex = data.length - 1
  const midY =
    (yScale.range()[0] + yScale.range()[1]) / 2

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <Group>
        {/* Baseline */}
        <line
          x1={paddingX}
          x2={width - paddingX}
          y1={midY}
          y2={midY}
          stroke="rgba(255,255,255,0.12)"
          strokeDasharray="4 4"
        />

        {/* Area */}
        <AreaClosed
          data={data}
          x={(_, i) => xScale(i) ?? 0}
          y={(d) => yScale(d) ?? 0}
          yScale={yScale}
          curve={curveMonotoneX}
          fill={color}
          opacity={0.12}
        />

        {/* Glow */}
        <LinePath
          data={data}
          x={(_, i) => xScale(i) ?? 0}
          y={(d) => yScale(d) ?? 0}
          curve={curveMonotoneX}
          stroke={color}
          strokeWidth={6}
          strokeOpacity={0.15}
        />

        {/* Main line */}
        <LinePath
          data={data}
          x={(_, i) => xScale(i) ?? 0}
          y={(d) => yScale(d) ?? 0}
          curve={curveMonotoneX}
          stroke={color}
          strokeWidth={2}
        />

        {/* Last point */}
        <Circle
          cx={xScale(lastIndex)}
          cy={yScale(data[lastIndex])}
          r={6}
          fill="rgba(0,0,0,0.6)"
          stroke={color}
          strokeWidth={2}
        />

        <Circle
          cx={xScale(lastIndex)}
          cy={yScale(data[lastIndex])}
          r={2.5}
          fill={color}
        />
      </Group>
    </svg>
  )
}

export default MiniLineGraph
