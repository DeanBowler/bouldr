import queryString from 'query-string';
import { OccupancyHeatQueryParams } from '../pages/api/occupancy/heat';

export interface OccupancyCheckResponse {
  hour: number;
  day_of_week: number;
  average_count: number;
}

export const getOccupancyHeat = async (
  query: Partial<OccupancyHeatQueryParams>
): Promise<OccupancyCheckResponse[]> => {
  const fetchUrl = queryString.stringifyUrl({
    url: '/api/occupancy/heat',
    query: {
      location: query.location,
    },
  });

  const pageResponse = await fetch(fetchUrl);

  return await pageResponse.json();
};
