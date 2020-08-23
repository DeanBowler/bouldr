import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Occupancy, DepotLocation } from '../../lib/fetchOccupancies';
import Donut from '../../components/Donut';
import useMatch, { Default } from '../../hooks/useMatch';

import HistoryChart from './components/HistoryChart';

const LocationHeading = styled.h1`
  margin: 1rem;
`;

const CapacityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CapacityHeading = styled.h2`
  margin: 0;
`;

const CapacityCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
  margin: 1rem auto;
  min-width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 5px 10px -1px rgba(0, 0, 0, 0.1);
`;

const getOccupancy = async (location: DepotLocation): Promise<Occupancy> => {
  const response = await fetch(`/api/occupancy/${location}`);

  if (!response.ok) throw Error(await response.text());

  return await response.json();
};

export default function OccupancyLocationPage() {
  const { query } = useRouter();

  const location = query.id as DepotLocation;

  const { data, status, error } = useQuery(
    ['occupancy', location],
    async () => {
      if (typeof location !== 'string') return;
      const result = await getOccupancy(location);
      return result;
    },
    {
      retry: false,
      refetchInterval: 120000,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    }
  );

  const locationName = useMatch(location?.toLocaleUpperCase(), {
    NOT: 'Nottingham',
    SHF: 'Sheffield',
    [Default]: 'Unknown',
  });

  const percentFull = data ? (data.count / data.capacity) * 100 : 0;

  const donutText = useMatch(status, {
    loading: 'loading',
    error: error?.message,
    success: `${data?.count} / ${data?.capacity}`,
    [Default]: 'lel',
  });

  return (
    <CapacityContainer>
      <LocationHeading>{locationName}</LocationHeading>
      <CapacityCard>
        <CapacityHeading>Current</CapacityHeading>
        <Donut
          progress={percentFull}
          roundedCorners={true}
          radius={100}
          stroke={10}
          text={donutText}
        />
      </CapacityCard>
      <HistoryChart location={query.id as string} />
    </CapacityContainer>
  );
}
