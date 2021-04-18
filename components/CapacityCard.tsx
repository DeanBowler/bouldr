import React from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';
import { x } from '@xstyled/styled-components';

import { DepotLocation, Occupancy } from '@/lib/fetchOccupancies';
import useMatch, { Default } from '@/hooks/useMatch';
import { Card } from '@/styled/Card';
import Donut from '@/components/Donut';

const getOccupancy = async (location: DepotLocation): Promise<Occupancy> => {
  const response = await axios.get<Occupancy>(`/api/occupancy/${location}`);
  return response.data;
};

export interface CapacityCardProps {
  location: DepotLocation;
  className?: string;
}

export function CapacityCard({ location, className }: CapacityCardProps) {
  const { data, status } = useQuery(
    ['occupancy', location],
    async () => {
      if (typeof location !== 'string') return;
      const result = await getOccupancy(location);
      return result;
    },
    {
      retry: false,
      refetchInterval: 120000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
      enabled: location?.length,
    }
  );

  const percentFull = data ? (data.count / data.capacity) * 100 : 0;

  const donutText = useMatch(
    status,
    {
      loading: 'loading',
      error: 'error',
      success: `${data?.count} / ${data?.capacity}`,
      [Default]: '',
    },
    [status, data?.count, data?.capacity]
  );

  return (
    <Card className={className}>
      <x.h2 m={0}>Current</x.h2>
      <Donut
        data-testid="capacity-donut"
        progress={percentFull}
        roundedCorners={true}
        radius={100}
        stroke={10}
        text={donutText}
      />
    </Card>
  );
}
