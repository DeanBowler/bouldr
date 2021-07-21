import { x } from '@xstyled/styled-components';
import { SpaceProps } from '@xstyled/system';
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
        backgroundColor={{ _: 'transparent', hover: 'text-a10', disabled: 'transparent' }}
        border="none"
        borderRadius={10}
        ring={{ focus: 3 }}
        ringColor={{ focus: 'primary-a40' }}
        m={0}
        outline={{ focus: 'none' }}
        opacity={{ disabled: 0.5 }}
        {...rest}
        ref={ref}
      >
        {children}
      </x.button>
    );
  }
);
