import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Preflight, ThemeProvider } from '@xstyled/styled-components';
import theme from '@/styled/theme';
import { Layout } from '@/components/Layout';

export default function App({
  Component,
  pageProps,
}: AppInitialProps & {
  Component: NextComponentType<NextPageContext, unknown, Record<string, unknown>>;
}) {
  const router = useRouter();

  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=East+Sea+Dokdo" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Preflight />
      <ThemeProvider theme={theme}>
        <Layout>
          <QueryClientProvider client={queryClientRef.current}>
            <Component {...pageProps} key={router.route} />
          </QueryClientProvider>
          <ReactQueryDevtools />
        </Layout>
      </ThemeProvider>
    </>
  );
}
