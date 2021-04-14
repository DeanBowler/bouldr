import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';

export default function App({
  Component,
  pageProps,
}: AppInitialProps & { Component: NextComponentType<NextPageContext, unknown, unknown> }) {
  const router = useRouter();

  return (
    <Layout>
      <Component {...pageProps} key={router.route} />
    </Layout>
  );
}
