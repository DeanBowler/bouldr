import { x } from '@xstyled/styled-components';
import * as React from 'react';

export function BouldrIcon(props: React.ComponentPropsWithRef<typeof x.svg>) {
  return (
    <x.svg
      width="1em"
      height="1em"
      viewBox="0 0 136 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M37 0v55l50 19 24-35-24-25L37 0z" fill="#fff" />
      <path
        d="M136 76.835l-20.319 50.043L80 132l11.894-50.616L115.68 46 136 76.835z"
        fill="#EBEBEB"
      />
      <path d="M33.375 63L3 89.583 71.85 131 84 81.707 33.375 63z" fill="#BBB" />
      <path d="M0 84L30 1v55.67L0 84z" fill="#969696" />
    </x.svg>
  );
}
