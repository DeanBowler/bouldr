import React, { useCallback, useMemo, useRef, useState } from 'react';

import styled, { x, th } from '@xstyled/styled-components';
import { useQuery } from 'react-query';
import { apply } from 'ramda';

import { DepotLocation } from '../lib/fetchOccupancies';

import { getOccupancyHeat } from '../lib/fetchOccupancyHeat';
import { Card } from '@/styled/Card';
import { usePopper } from 'react-popper';
import { Heatmap } from './Heatmap';

export interface CapacityCardProps {
  location: DepotLocation;
  className?: string;
}

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TooltipContainer = styled.div`
  pointer-events: none;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${th.color('text')};
  border-radius: 10;
  padding: 1rem;
`;

const maxInList = apply(Math.max);

const xDomain = [9, 22] as [number, number];
const yDomain = [0, 7] as [number, number];

const yAxisLabelFormatter = (v: number) => dayLabels[v];

interface SelectedCell {
  day: number;
  hour: number;
  count: number | null;
}

export function CapacityHeat({ location, className }: CapacityCardProps) {
  const { data, isLoading } = useQuery(
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

  const [hovered, setHovered] = useState<[SVGRectElement, SelectedCell] | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  const [hoveredEl, hoveredCell] = hovered ?? [null, null];

  const { styles, attributes } = usePopper(hoveredEl, popper, {
    placement: 'right-start',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [-10, 10] },
      },
    ],
  });

  const counts = useMemo(() => data?.map((d) => d.average_count) ?? [], [data]);
  const maxCount = useMemo(() => maxInList(counts), [counts]);

  const fuckingSundays = (day: number) => (day === 0 ? 6 : day - 1);

  const getCount = useCallback(
    (day: number, hour: number) =>
      data?.find((d) => fuckingSundays(d.day_of_week) === day && d.hour === hour)?.average_count ??
      null,
    [data]
  );

  const hoverTimeout = useRef<number>();
  const handleCellMouseOver = useCallback(
    (e: React.MouseEvent<SVGRectElement>, day: number, hour: number) => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      setHovered([e.currentTarget, { day, hour, count: getCount(day, hour) }]);
    },
    [setHovered, getCount]
  );

  const handleCellMouseLeave = useCallback(
    () => (hoverTimeout.current = setTimeout(() => setHovered(null), 500)),
    [setHovered]
  );

  return (
    <Card minWidth={{ xs: 340, sm: 365 }} h="100%" className={className}>
      <x.h2 mb={3}>Heatmap</x.h2>
      <Heatmap
        data={data}
        xAxisDomain={xDomain}
        yAxisDomain={yDomain}
        getValue={getCount}
        onMouseOver={handleCellMouseOver}
        onMouseLeave={handleCellMouseLeave}
        yAxisLabelFormatter={yAxisLabelFormatter}
        maxValue={maxCount}
        isLoading={isLoading}
      />
      {Boolean(hoveredCell?.count) && (
        <TooltipContainer
          ref={(ref) => setPopper(ref)}
          style={styles.popper}
          {...attributes.popper}
        >
          {dayLabels[hoveredCell?.day ?? 0]} {hoveredCell?.hour}:00
          <x.div mt={2} fontSize="xl">
            {hoveredCell?.count}
          </x.div>
        </TooltipContainer>
      )}
    </Card>
  );
}
