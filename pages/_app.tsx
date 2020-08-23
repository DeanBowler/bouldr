import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100%;
    height: 100%;
    position:relative;
  }

  body {  
    position: relative;
    min-height: 100%;
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: 'Raleway', 'Helvetica Neue', sans-serif;
    font-size: 16px;
  }

  #__next {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  ul {
    padding-inline-start: 1rem;
  }

  li {
    margin: 1rem 0;
  }
`;

export default function App({
  Component,
  pageProps,
}: AppInitialProps & { Component: NextComponentType<NextPageContext, unknown, unknown> }) {
  const router = useRouter();

  return (
    <>
      <Component {...pageProps} key={router.route} />
      <GlobalStyle />
    </>
  );
}
