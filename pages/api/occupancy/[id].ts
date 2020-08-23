import { NextApiRequest, NextApiResponse } from 'next';
import { getOccupancy } from '../../../lib/fetchOccupancies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (typeof id !== 'string') throw new Error('');

  const location = id.toLocaleUpperCase();

  try {
    const occupancy = await getOccupancy(location);

    if (occupancy) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(occupancy));
    } else {
      res.statusCode = 404;
      res.end(`Bouldering Gym "${location}" not found`);
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end();
  }
};
