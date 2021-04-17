import React from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle, th } from '@xstyled/styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

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
    font-family: ${th.font('normal')}, 'Helvetica Neue', sans-serif;
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

  h1 {
    font-size: 4xl;
  }

  h2 {
    font-size: 2xl;
  }

  h3 {
    font-size: xl;
  }

  h4 {
    font-size: lg;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  font-family: ${th.font('normal')}, 'Helvetica Neue', sans-serif;
  color: text;
  background-color: background;

  z-index: 0;

  ::before {
    content: '';
    z-index: -1;
    background-image: url('/images/curtain.svg');
    background-attachment: fixed;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    pointer-events: none;
    opacity: 0.1;
  }
`;

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Container>
        <Head>
          <title>Bouldr</title>
        </Head>
        {children}
      </Container>
      <GlobalStyle />
    </>
  );
}
