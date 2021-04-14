import React from 'react';

import styled from 'styled-components';
import { useQuery } from 'react-query';
import { range, apply } from 'ramda';
import { setLightness } from 'polished';

import { DepotLocation } from '../lib/fetchOccupancies';

import { getOccupancyHeat } from '../lib/fetchOccupancyHeat';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
  min-width: 360px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 5px 10px -1px rgba(0, 0, 0, 0.1);
`;

export interface CapacityCardProps {
  location: DepotLocation;
}

const CapacityHeading = styled.h2`
  margin: 0;
`;

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DayText = styled.text`
  font-size: 8px;
`;

const HourText = styled.text`
  font-size: 8px;
  text-anchor: middle;
`;

const Cell = styled.rect`
  transition: fill 600ms ease-in-out;
`;

const maxInList = apply(Math.max);

const cellWidth = 15;
const cellHeight = 15;

const topGutter = 15;
const leftGutter = 20;

const cellPadding = 1;

const [from, to] = [9, 22];

export function CapacityHeat({ location }: CapacityCardProps) {
  const { data, status } = useQuery(
    ['capacity-heat', location],
    async () => {
      if (typeof location !== 'string') return;
      const result = await getOccupancyHeat({ location });
      return result;
    },
    {
      retry: false,
      refetchInterval: 120000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    }
  );

  const counts = data?.map((d) => d.average_count) ?? [];

  const maxCount = maxInList(counts);

  const fuckingSundays = (day: number) => (day === 0 ? 6 : day - 1);

  const getCount = (day: number, hour: number) =>
    data?.find((d) => fuckingSundays(d.day_of_week) === day && d.hour === hour)?.average_count ??
    null;

  const getColor = (day: number, hour: number) => {
    if (status === 'loading') return '#ccc';
    const count = getCount(day, hour);
    if (!count) return 'transparent';
    return setLightness(1 - (count / maxCount) * 0.7, '#44a340');
  };

  return (
    <Card>
      <CapacityHeading>Heatmap</CapacityHeading>
      <svg viewBox={`0 0 ${(to - from) * cellWidth + leftGutter} ${7 * cellHeight + topGutter}`}>
        <g transform={`translate(0, ${topGutter + cellHeight / 2})`}>
          {range(0, 7).map((day) => (
            <DayText key={day} transform={`translate(0, ${day * cellHeight})`}>
              {dayLabels[day]}
            </DayText>
          ))}
        </g>
        <g transform={`translate(${leftGutter + cellWidth / 2}, ${topGutter / 1.5})`}>
          {range(from, to).map((hour) => (
            <HourText key={hour} transform={`translate(${(hour - from) * cellWidth}, 0)`}>
              {hour}
            </HourText>
          ))}
        </g>
        <g transform={`translate(${leftGutter}, ${topGutter})`}>
          {range(0, 7).map((day) => (
            <g key={day} transform={`translate(0, ${day * cellHeight})`}>
              {range(from, to).map((hour) => (
                <Cell
                  width={cellWidth - cellPadding}
                  height={cellHeight - cellPadding}
                  key={hour}
                  transform={`translate(${(hour - from) * cellHeight + cellPadding / 2}, ${
                    cellPadding / 2
                  })`}
                  fill={getColor(day, hour)}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
    </Card>
  );
}