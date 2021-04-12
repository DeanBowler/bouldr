import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Occupancy } from '../lib/fetchOccupancies';

export const server = setupServer(
  rest.get('/api/occupancy/:id', (_, res, ctx) =>
    res(
      ctx.json<Occupancy>({ capacity: 100, count: 50, lastUpdate: new Date(), location: 'NOT' })
    )
  )
);
