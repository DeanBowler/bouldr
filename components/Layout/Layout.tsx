import React from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from '@xstyled/styled-components';
import { th } from '@xstyled/styled-components';

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
    background-attachment: fixed;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    pointer-events: none;
    opacity: 0.75;
  }

  ul {
    padding: 0px;
    margin: 0px;
    list-style: none;
  }

  ul li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
  }

  ul li::before {
    content: '▹';
    position: absolute;
    left: 0px;
    font-size: 3xl;
    color: primary;
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
