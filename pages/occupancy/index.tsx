import { useQuery } from 'react-query';

import { Occupancy, DepotLocation } from '../../lib/fetchOccupancies';

const getOccupancy = async (location: DepotLocation): Promise<Occupancy> => {
  const response = await fetch(`/api/occupancy/${location}`);

  const json = await response.json();

  return json;
};

export default function OccupancyPage() {
  const { data, status } = useQuery(
    'occupancy',
    async () => {
      const result = await getOccupancy('NOT');
      return result;
    },
    {
      refetchInterval: 120000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    }
  );

  switch (status) {
    case 'loading':
      return <div>loading</div>;
    case 'success':
      return (
        <div>
          {data?.count}/{data?.capacity}
        </div>
      );
    default:
      return null;
  }
}
