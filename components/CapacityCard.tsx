import React from 'react';

import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from 'react-query';

import { DepotLocation, Occupancy } from '../lib/fetchOccupancies';
import useMatch, { Default } from '../hooks/useMatch';
import Donut from './Donut';
import { Card } from '@/styled/Card';

const CapacityHeading = styled.h2`
  margin: 0;
`;

const getOccupancy = async (location: DepotLocation): Promise<Occupancy> => {
  const response = await axios.get<Occupancy>(`/api/occupancy/${location}`);
  return response.data;
};

export interface CapacityCardProps {
  location: DepotLocation;
}

export function CapacityCard({ location }: CapacityCardProps) {
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
    }
  );

  const percentFull = data ? (data.count / data.capacity) * 100 : 0;

  const donutText = useMatch(
    status,
    {
      loading: 'loading',
      error: 'error',
      success: `${data?.count} / ${data?.capacity}`,
      [Default]: 'unknown',
    },
    [status, data?.count, data?.capacity]
  );

  return (
    <Card>
      <CapacityHeading>Current</CapacityHeading>
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
