import fetch from 'cross-fetch';

const OCCUPANCY_SITE_URL =
  'https://portal.rockgympro.com/portal/public/4f7e4c65977f6cd9be6d61308c7d7cc2/occupancy';

export type DepotLocation = 'NOT' | 'SHF' | 'BIR';

export interface Occupancy {
  location: string;
  capacity: number;
  count: number;
  lastUpdate: Date;
}

export interface OccupancySiteResult {
  capacity: number;
  count: number;
  subLabel: string;
  lastUpdate: string;
}

export type OccupancyMap = Record<DepotLocation, Occupancy>;

const getRawOccupancy = async (id: string): Promise<OccupancySiteResult | null> => {
  const pageResponse = await fetch(OCCUPANCY_SITE_URL, {
    mode: 'no-cors',
    referrer: 'https://www.theclimbingdepot.co.uk/nottingham/news/capacity-counter',
  });

  const pageText = await pageResponse.text();

  const regex = new RegExp(/var data = (?<json>[\s|\S]+?});/gim);

  const values = regex.exec(pageText);

  const jsData = values?.groups?.json;

  if (!jsData) return null;

  const jsonFriendly = jsData.replace(/'/g, '"').replace(/,\s*}/g, '}');

  const data = JSON.parse(jsonFriendly);

  return data[id];
};

export const getOccupancy = async (id: string): Promise<Occupancy | null> => {
  const raw = await getRawOccupancy(id);
  if (!raw) return null;

  return {
    location: id,
    capacity: raw.capacity,
    count: raw.count,
    lastUpdate: new Date(),
  };
};

export const getOccupancies = async (): Promise<readonly Occupancy[] | null> => {
  const pageResponse = await fetch(OCCUPANCY_SITE_URL, {
    mode: 'no-cors',
    referrer: 'https://www.theclimbingdepot.co.uk/nottingham/news/capacity-counter',
  });

  const pageText = await pageResponse.text();

  const regex = new RegExp(/var data = (?<json>[\s|\S]+?});/gim);

  const values = regex.exec(pageText);

  const jsData = values?.groups?.json;

  if (!jsData) return null;

  const jsonFriendly = jsData.replace(/'/g, '"').replace(/,\s*}/g, '}');

  const data: OccupancyMap = JSON.parse(jsonFriendly);

  return Object.entries(data).map(([location, result]) => ({
    location: location,
    capacity: result.capacity,
    count: result.count,
    lastUpdate: new Date(),
  }));
};
