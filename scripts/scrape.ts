import { getOccupancies } from '../lib/fetchOccupancies';

require('dotenv').config();

import cron from 'node-cron';

import { OccupancyCheck } from '../lib/database/occupancyCheck';
import sequelizeConnection from '../lib/database/sequelizeConnection';

const scrapable = ['NOT', 'SHF', 'BIR'];

async function scrape() {
  const results = await getOccupancies();

  if (!results) return;

  const records = results
    .filter((r) => scrapable.includes(r.location))
    .map((r) => ({
      location: r.location,
      capacity: r.capacity,
      count: r.count,
      fetched: r.lastUpdate,
    }));

  records.forEach((r) => console.info('captured', r));

  OccupancyCheck.bulkCreate(records);
}

async function start() {
  await sequelizeConnection.sync();

  cron.schedule('*/5 09-23 * * *', async () => await scrape(), { timezone: 'Europe/London' });
}

start();
