import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { DepotLocation } from '../../lib/fetchOccupancies';
import useMatch, { Default } from '../../hooks/useMatch';
import { CapacityCard } from '../../components/CapacityCard';

const HistoryChart = dynamic(() => import('../../components/HistoryChart'));

const LocationHeading = styled.h1`
  margin: 1rem;
`;

const CapacityContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    <CapacityContainer>
      <LocationHeading>{locationName}</LocationHeading>
      <CapacityCard location={location} />
      <HistoryChart location={query.id as string} />
    </CapacityContainer>
  );
}
