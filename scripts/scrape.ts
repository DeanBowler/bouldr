import { getOccupancies } from '../lib/fetchOccupancies';

import cron from 'node-cron';

import { OccupancyCheck } from '../lib/database/occupancyCheck';
import sequelizeConnection from '../lib/database/sequelizeConnection';

const scrapable = ['NOT', 'SHF'];

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

  //await scrape();
  cron.schedule('*/5 08-23 * * *', async () => await scrape());
}

start();
