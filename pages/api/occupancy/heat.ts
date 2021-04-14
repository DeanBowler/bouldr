import { NextApiRequest, NextApiResponse } from 'next';
import sequelize, { Op } from 'sequelize';
import { OccupancyCheck } from '../../../lib/database/occupancyCheck';

export interface OccupancyHeatQueryParams {
  location: string;
}

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  try {
    const checks = await OccupancyCheck.findAll({
      attributes: [
        [sequelize.fn('date_part', 'dow', sequelize.col('fetched')), 'day_of_week'],
        [sequelize.fn('date_part', 'hour', sequelize.col('fetched')), 'hour'],
        [sequelize.cast(sequelize.fn('avg', sequelize.col('count')), 'int'), 'average_count'],
      ],
      where: {
        location: {
          [Op.iLike]: query.location,
        },
      },
      group: ['hour', 'day_of_week'],
      order: [sequelize.literal('day_of_week'), sequelize.literal('hour')],
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(checks));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
  }
};
