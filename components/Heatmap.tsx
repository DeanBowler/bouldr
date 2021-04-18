import styled, { useTheme } from '@xstyled/styled-components';
import { setLightness } from 'polished';
import { range } from 'ramda';
import React, { useCallback } from 'react';

const YAxisText = styled.text`
  font-size: 8px;
  fill: text;
`;

const XAxisText = styled.text`
  font-size: 8px;
  text-anchor: middle;
  fill: text;
`;

const Cell = styled.rect`
  transition: fill 600ms ease-in-out;
`;

const cellWidth = 15;
const cellHeight = 15;

const topGutter = 15;
const leftGutter = 20;

const cellRadius = 0;
const cellPadding = 1;

export interface HeatmapProps<TData> {
  data: TData;
  xAxisDomain: [number, number];
  yAxisDomain: [number, number];
  xAxisLabelFormatter?(x: number): string;
  yAxisLabelFormatter?(x: number): string;
  getValue(x: number, y: number): number | null;
  onMouseOver?(e: React.MouseEvent<SVGRectElement>, y: number, x: number): void;
  onMouseLeave?(): void;
  isLoading?: boolean;
  maxValue: number;
}

export const Heatmap = React.memo(function Heatmap<TData>({
  yAxisDomain,
  xAxisDomain,
  getValue,
  yAxisLabelFormatter,
  onMouseOver,
  onMouseLeave,
  isLoading,
  maxValue,
}: HeatmapProps<TData>) {
  const theme = useTheme();

  const getColor = useCallback(
    (yAxisValue: number, xAxisValue: number) => {
      if (isLoading) return 'rgba(255,255,255,0.25)';
      const count = getValue(yAxisValue, xAxisValue);
      if (!count) return 'transparent';
      return setLightness((count / maxValue) * 0.65, theme.colors.primary);
    },
    [getValue]
  );

  return (
    <svg
      viewBox={`0 0 ${(xAxisDomain[1] - xAxisDomain[0]) * cellWidth + leftGutter} ${
        (yAxisDomain[1] - yAxisDomain[0]) * cellHeight + topGutter
      }`}
    >
      <g transform={`translate(${leftGutter + cellWidth / 2}, ${topGutter / 2})`}>
        {range(xAxisDomain[0], xAxisDomain[1]).map((xAxisValue) => (
          <XAxisText
            key={xAxisValue}
            transform={`translate(${(xAxisValue - xAxisDomain[0]) * cellWidth}, 0)`}
          >
            {xAxisValue}
          </XAxisText>
        ))}
      </g>
      <g transform={`translate(0, ${topGutter + cellHeight / 1.5})`}>
        {range(yAxisDomain[0], yAxisDomain[1]).map((yAxisValue) => (
          <YAxisText key={yAxisValue} transform={`translate(0, ${yAxisValue * cellHeight})`}>
            {yAxisLabelFormatter ? yAxisLabelFormatter(yAxisValue) : yAxisValue}
          </YAxisText>
        ))}
      </g>
      <g transform={`translate(${leftGutter}, ${topGutter})`}>
        {range(yAxisDomain[0], yAxisDomain[1]).map((yAxisValue) => (
          <g key={yAxisValue} transform={`translate(0, ${yAxisValue * cellHeight})`}>
            {range(xAxisDomain[0], xAxisDomain[1]).map((xAxisValue) => (
              <Cell
                width={cellWidth - cellPadding}
                height={cellHeight - cellPadding}
                rx={cellRadius}
                key={xAxisValue}
                transform={`translate(${
                  (xAxisValue - xAxisDomain[0]) * cellHeight + cellPadding / 2
                }, ${cellPadding / 2})`}
                fill={getColor(yAxisValue, xAxisValue)}
                onMouseOver={(e) => onMouseOver && onMouseOver(e, yAxisValue, xAxisValue)}
                onMouseLeave={onMouseLeave}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
});
