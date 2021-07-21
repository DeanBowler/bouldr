import { DefaultTheme } from 'styled-components';

import { hslToColorString, parseToHsl } from 'polished';

import { Theme, defaultTheme, generateHexAlphaVariants } from '@xstyled/system';
import { pipe } from 'ramda';

const hslToRgb = pipe(parseToHsl, hslToColorString);

interface Colors {
  primary: string;
  secondary: string;
  white: string;
  black: string;
  text: string;
  background: string;
}

export interface AppTheme extends Theme {
  colors: Colors;
  fonts: {
    normal: string;
    cursive: string;
    monospace: string;
  };
  fontWeights: {
    lighter: number;
    light: number;
    normal: number;
    heavy: number;
  };
}

const theme: Partial<AppTheme> = {
  ...defaultTheme,
  colors: {
    ...generateHexAlphaVariants({ primary: hslToRgb('hsl(140, 50%, 50%)') }),
    ...generateHexAlphaVariants({ secondary: hslToRgb('hsl(290, 65%, 55%)') }),
    ...generateHexAlphaVariants({ text: hslToRgb('hsl(180, 8%, 92%)') }),
    background: 'hsl(235deg 10% 20%)',
    white: 'hsl(180deg 10% 99%)',
    black: '#333333',
  },
  fonts: {
    normal: 'Raleway',
    cursive: 'Permanent Marker',
    monospace: 'monospace',
  },
  fontWeights: {
    lighter: 100,
    light: 200,
    normal: 400,
    heavy: 700,
  },
  lineHeights: {
    normal: 'normal',
    solid: '1',
    title: '1.25',
    copy: '1.7',
  },
  sizes: [
    0,
    '1rem',
    '1.618rem',
    '2.618rem',
    '4.24rem',
    '6.85rem',
    '12rem',
    '18rem',
    '32rem',
    '52rem',
    '64rem',
  ],
  space: [0, 4, 8, 16, 24, 48, 96, 144, 192, 240],
  screens: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 },
};

export default theme as DefaultTheme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}
