import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import startOfDay from 'date-fns/startOfDay';

import { OccupancyCheck } from '../../../lib/database/occupancyCheck';

export interface OccupancyChecksQueryParams {
  location: string;
  from: Date;
  to: Date;
}

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const from = query.from ? new Date(query.from as string) : undefined;
  const to = query.to ? new Date(query.to as string) : undefined;

  const queryParams = {
    ...getDateRange(from, to),
    ...query,
  } as OccupancyChecksQueryParams;

  try {
    const checks = await OccupancyCheck.findAll({
      where: {
        location: {
          [Op.iLike]: queryParams.location,
        },
        fetched: {
          [Op.between]: [queryParams.from, queryParams.to],
        },
      },
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(checks));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
  }
};

function getDateRange(from: Date | undefined, to: Date | undefined) {
  const now = new Date();

  if (!from && to) {
    return {
      from: startOfDay(to),
      to: now,
    };
  }

  if (from && !to) {
    return {
      from: from,
      to: now,
    };
  }

  return {
    from: startOfDay(now),
    to: now,
  };
}
