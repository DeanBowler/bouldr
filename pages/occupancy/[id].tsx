import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled, { x } from '@xstyled/styled-components';

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

// const ThingsContainer = styled.box`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-around;
//   flex-wrap: wrap;
//   margin: 2rem 0;
// `;

export default function OccupancyLocationPage() {
  const { query } = useRouter();

  const location = query.id as DepotLocation;

  const locationName = useMatch(location?.toLocaleUpperCase(), {
    NOT: 'Nottingham',
    SHF: 'Sheffield',
    BIR: 'Birmingham',
    [Default]: 'Unknown',
  });

  if (!query.id) return null;

  return (
    <>
      <Head>
        <title>Depot {locationName} Occupancy | Bouldr</title>
      </Head>
      <CapacityContainer>
        <LocationHeading>Depot {locationName}</LocationHeading>
        <x.div
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          spaceX={2}
          m={3}
        >
          <CapacityCard location={location} />
          <CapacityHeat location={location} />
        </x.div>
        <HistoryChart location={query.id as string} />
      </CapacityContainer>
    </>
  );
}
