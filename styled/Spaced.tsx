import { space, SpaceProps } from '@xstyled/system';
import React from 'react';
import styled from '@xstyled/styled-components';

const classnames = (...args: Array<string | undefined>) => args.join(' ');
const getClassName = (el: React.ReactElement) => el.props?.className ?? '';

export interface StyledChildrenProps {
  children: React.ReactNode;
  className?: string;
  includeLast?: boolean;
}

export const StyledChildren = ({
  className,
  children,
  includeLast = true,
}: StyledChildrenProps) => {
  const childrenArray = React.Children.toArray(children);
  const shouldApply = (index: number) => includeLast || index < childrenArray.length - 1;

  const styledChildren = childrenArray.map((child: any, i) =>
    React.cloneElement(child, {
      className: classnames(getClassName(child), shouldApply(i) ? className : ''),
    })
  );
  return <>{styledChildren}</>;
};

const Spaced = styled(StyledChildren)(space) as React.FunctionComponent<
  StyledChildrenProps & SpaceProps
>;

export default Spaced;
