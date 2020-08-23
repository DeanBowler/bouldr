import { NextApiRequest, NextApiResponse } from 'next';
import { getOccupancies } from '../../lib/fetchOccupancies';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const occupancies = await getOccupancies();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(occupancies));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
  }
};
