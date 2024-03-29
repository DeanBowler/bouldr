import React from 'react';

import { render, screen, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';

import { CapacityCard } from './CapacityCard';
import { server } from '../mocks/server';

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => undefined));

const queryClient = new QueryClient();

beforeEach(async () => {
  queryClient.clear();
  await waitFor(() => undefined);
});

test('loads and displays current capacity', async () => {
  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CapacityCard location="NOT" />
      </QueryClientProvider>
    );
  });

  await waitFor(() => expect(screen.getByTestId('donut-text')).toHaveTextContent('50 / 100'));
});

test('displays loading state whilst fetching', async () => {
  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CapacityCard location="NOT" />
      </QueryClientProvider>
    );
  });

  await waitFor(() => expect(screen.getByTestId('donut-text')).toHaveTextContent('loading'));
});

test('displays error when server floops', async () => {
  server.use(
    rest.get('/api/occupancy/:location', (_, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CapacityCard location="NOT" />
      </QueryClientProvider>
    );
  });

  await waitFor(() => expect(screen.getByTestId('donut-text')).toHaveTextContent('error'));
});
