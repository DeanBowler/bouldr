import React from 'react';

import { IconType } from 'react-icons';

import { Button, ButtonProps } from '@/components/Button';
import { FontSizeGetter, useFontSize } from '@xstyled/styled-components';

export interface IconButtonProps extends ButtonProps {
  icon: IconType;
  iconSize?: FontSizeGetter;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, iconSize, ...rest }, ref) => {
    const fontSize = useFontSize(iconSize);

    return (
      <Button {...rest} ref={ref} p={1}>
        <Icon size={fontSize} />
      </Button>
    );
  }
);
