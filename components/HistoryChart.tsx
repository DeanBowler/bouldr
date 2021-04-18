import React, { useState, useMemo } from 'react';

import styled, { x, useTheme } from '@xstyled/styled-components';
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  Area,
  AreaChart,
} from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';

import { usePaginatedQuery } from 'react-query';

import { transparentize } from 'polished';
import setHours from 'date-fns/setHours';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import parseJSON from 'date-fns/parseJSON';
import startOfHour from 'date-fns/startOfHour';
import differenceInDays from 'date-fns/differenceInDays';
import isToday from 'date-fns/isToday';
import { useHotkeys } from 'react-hotkeys-hook';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { getOccupancyChecks } from '@/lib/fetchOccupancyChecks';
import useMatch, { Default } from '@/hooks/useMatch';
import { Card } from '@/styled/Card';
import { IconButton } from '@/components/IconButton';

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

interface HistoryChartProps {
  location: string | undefined;
  className?: string;
}

const formatLabel = (date: string | number) => format(parseJSON(date), 'dd/MM/yy HH:mm:ss');

const formatScale = (date: number) => format(new Date(date), 'HH:mm');

export default function HistoryChart({ location, className }: HistoryChartProps) {
  const [fromDate, setFromDate] = useState(setHours(startOfHour(new Date()), 8));

  const { resolvedData, status } = usePaginatedQuery(
    ['occupancyChecks', location, fromDate],
    async () => {
      if (typeof location !== 'string' || !location.length) return;
      const result = await getOccupancyChecks({
        location,
        from: fromDate,
        to: setHours(fromDate, 22),
      });

      return result.map((d) => ({ ...d, ...{ timestamp: parseJSON(d.fetched).getTime() } }));
    },
    {
      retry: false,
      refetchInterval: 120000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
      enabled: location?.length,
    }
  );

  const theme = useTheme();

  const onDateChange = (days: number) => {
    setFromDate((fd) => addDays(fd, days));
  };

  useHotkeys('left', (event) => {
    onDateChange(-1);
    event.preventDefault();
  });
  useHotkeys(
    'right',
    (event) => {
      if (isToday(fromDate)) return;
      onDateChange(1);
      event.preventDefault();
    },
    [fromDate]
  );

  const title = useMatch(differenceInDays(new Date(), fromDate), {
    0: 'Today',
    1: 'Yesterday',
    [Default]: () => format(fromDate, 'iiii	do MMMM'),
  });

  const hasRecords = Boolean(resolvedData?.length);

  const domainY = useMemo(() => {
    if (!resolvedData?.length) return undefined;
    const firstDataPoint = startOfHour(resolvedData[0].timestamp);
    return [
      setHours(firstDataPoint, 9).getTime(),
      setHours(firstDataPoint, 22).getTime(),
    ] as AxisDomain;
  }, [resolvedData]);

  const domainX = useMemo(
    () => (resolvedData?.length ? ([0, resolvedData[0].capacity] as AxisDomain) : undefined),
    [resolvedData]
  );

  return (
    <Card alignItems="stretch" className={className}>
      <HistoryHeader>
        <IconButton icon={FiChevronLeft} iconSize="3xl" onClick={() => onDateChange(-1)} />
        <x.h2 userSelect="none">{title}</x.h2>
        <IconButton
          icon={FiChevronRight}
          iconSize="3xl"
          onClick={() => onDateChange(+1)}
          disabled={isToday(fromDate)}
        />
      </HistoryHeader>

      {status === 'error' && (
        <x.div textAlign="center" mt={4} mb={5}>
          Failed to fetch history
        </x.div>
      )}
      {status === 'success' && hasRecords && (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={resolvedData}>
            <XAxis
              type="number"
              dataKey="timestamp"
              tickFormatter={formatScale}
              domain={domainY}
              tick={{ fill: theme.colors.text }}
            />
            <YAxis type="number" width={30} domain={domainX} tick={{ fill: theme.colors.text }} />
            <Tooltip
              labelFormatter={formatLabel}
              contentStyle={{
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 10,
              }}
            />
            <CartesianGrid stroke={transparentize(0.75, theme.colors.text)} />
            <Area
              type="monotone"
              dataKey="count"
              stroke={theme.colors.secondary}
              fill={transparentize(0.75, theme.colors.secondary)}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {status === 'success' && !hasRecords && (
        <x.div textAlign="center" mt={4} mb={5} userSelect="none">
          No data recorded for this center/time period
        </x.div>
      )}
    </Card>
  );
}
