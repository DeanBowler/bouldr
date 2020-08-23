import { useState, useMemo } from 'react';

import styled from 'styled-components';
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelFormatter,
  YAxis,
  Area,
  AreaChart,
  AxisDomain,
} from 'recharts';
import { usePaginatedQuery } from 'react-query';

import setHours from 'date-fns/setHours';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import parseJSON from 'date-fns/parseJSON';
import startOfHour from 'date-fns/startOfHour';
import differenceInDays from 'date-fns/differenceInDays';
import { useHotkeys } from 'react-hotkeys-hook';

import { getOccupancyChecks } from '../../../lib/fetchOccupancyChecks';
import useMatch, { Default } from '../../../hooks/useMatch';

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const HistoryTitle = styled.h2`
  margin: 0;
`;

const HistoryContainer = styled.div`
  margin: 1rem;
`;

interface HistoryChartProps {
  location: string | undefined;
}

type AxisDomains = [AxisDomain, AxisDomain];

const formatLabel: LabelFormatter = (date: string | number) =>
  format(parseJSON(date), 'dd/MM/yy HH:mm:ss');

const formatScale = (date: number) => format(new Date(date), 'HH:mm');

export default function HistoryChart({ location }: HistoryChartProps) {
  const [fromDate, setFromDate] = useState(setHours(startOfHour(new Date()), 8));

  const { resolvedData, status } = usePaginatedQuery(
    ['occupancyChecks', location, fromDate],
    async () => {
      if (typeof location !== 'string') return;
      const result = await getOccupancyChecks({
        location,
        from: fromDate,
        to: setHours(fromDate, 23),
      });

      return result.map((d) => ({ ...d, ...{ timestamp: parseJSON(d.fetched).getTime() } }));
    },
    {
      retry: false,
      refetchInterval: 120000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    }
  );

  const onDateChange = (days: number) => {
    setFromDate((fd) => addDays(fd, days));
  };

  useHotkeys('left', () => onDateChange(-1));
  useHotkeys('right', () => onDateChange(1));

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
      setHours(firstDataPoint, 8).getTime(),
      setHours(firstDataPoint, 23).getTime(),
    ] as AxisDomains;
  }, [resolvedData]);

  const domainX = useMemo(
    () => (resolvedData?.length ? ([0, resolvedData[0].capacity] as AxisDomains) : undefined),
    [resolvedData]
  );

  return (
    <HistoryContainer>
      <HistoryHeader>
        <button onClick={() => onDateChange(-1)}>&lt;</button>
        <HistoryTitle>{title}</HistoryTitle>
        <button onClick={() => onDateChange(+1)}>&gt;</button>
      </HistoryHeader>

      {status === 'error' && <div>Failed to fetch history</div>}
      {status === 'success' && hasRecords && (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={resolvedData}>
            <XAxis type="number" dataKey="timestamp" tickFormatter={formatScale} domain={domainY} />
            <YAxis type="number" width={30} domain={domainX} />
            <Tooltip labelFormatter={formatLabel} />
            <CartesianGrid stroke="#f0f0f0" />
            <Area type="monotone" dataKey="count" stroke="#ff7300" fill="#ff730066" />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {status === 'success' && !hasRecords && (
        <div>No data recorded for this center/time period</div>
      )}
    </HistoryContainer>
  );
}
