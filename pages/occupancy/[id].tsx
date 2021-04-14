import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { DepotLocation } from '../../lib/fetchOccupancies';
import useMatch, { Default } from '../../hooks/useMatch';
import { CapacityCard } from '../../components/CapacityCard';
import { CapacityHeat } from '../../components/CapacityHeat';

const HistoryChart = dynamic(() => import('../../components/HistoryChart'));

const LocationHeading = styled.h1`
  margin: 1rem;
`;

const CapacityContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`;

const ThingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

export default function OccupancyLocationPage() {
  const { query } = useRouter();

  const location = query.id as DepotLocation;

  const locationName = useMatch(location?.toLocaleUpperCase(), {
    NOT: 'Nottingham',
    SHF: 'Sheffield',
    BIR: 'Birmingham',
    [Default]: 'Unknown',
  });

  return (
    <>
      <Head>
        <title>Depot {locationName} Occupancy | Bouldr</title>
      </Head>
      <CapacityContainer>
        <LocationHeading>{locationName}</LocationHeading>
        <ThingsContainer>
          <CapacityCard location={location} />
          <CapacityHeat location={location} />
        </ThingsContainer>
        <HistoryChart location={query.id as string} />
      </CapacityContainer>
    </>
  );
}
