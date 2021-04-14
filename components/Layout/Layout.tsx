import React from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
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
