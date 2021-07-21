import React from 'react';

import { IconType } from 'react-icons';

import { Button, ButtonProps } from '@/components/Button';
import { useFontSize } from '@xstyled/styled-components';
import { ThemeFontSize } from '@xstyled/system';

export interface IconButtonProps extends ButtonProps {
  icon: IconType;
  iconSize?: ThemeFontSize;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, iconSize, ...rest }, ref) => {
    const fontSize = useFontSize(iconSize ?? 'base');

    return (
      <Button {...rest} ref={ref} p={1}>
        <Icon size={fontSize} />
      </Button>
    );
  }
);
