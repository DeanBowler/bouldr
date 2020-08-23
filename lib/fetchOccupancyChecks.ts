import queryString from 'query-string';

import { OccupancyChecksQueryParams } from '../pages/api/occupancyChecks';

export interface OccupancyCheckResponse {
  id: number;
  location: string;
  capacity: number;
  count: number;
  fetched: string;
}

export const getOccupancyChecks = async (
  query: Partial<OccupancyChecksQueryParams>
): Promise<OccupancyCheckResponse[]> => {
  const fetchUrl = queryString.stringifyUrl({
    url: '/api/occupancyChecks',
    query: {
      from: query.from?.toISOString(),
      to: query.to?.toISOString(),
      location: query.location,
    },
  });

  const pageResponse = await fetch(fetchUrl);

  return await pageResponse.json();
};
