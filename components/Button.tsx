import { SpaceProps, x } from '@xstyled/styled-components';
import React from 'react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    SpaceProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <x.button
        color="text"
        backgroundColor="transparent"
        hoverBackgroundColor="text-a10"
        border="none"
        borderRadius={10}
        focusRing={3}
        m={0}
        focusRingColor="primary-a40"
        focusOutline="none"
        disabledOpacity={0.5}
        disabledBackgroundColor="transparent"
        {...rest}
        ref={ref}
      >
        {children}
      </x.button>
    );
  }
);
