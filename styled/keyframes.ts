import { keyframes } from '@xstyled/styled-components';

export const hueCycleAnimation = keyframes`
from {
  filter: hue-rotate(0deg);
}
to {
  filter: hue-rotate(360deg);
}
`;

export const fadeIn = keyframes`
from: {
  opacity: 0;
}
to {
  opacity: 1;
}`;

export const gradientShift = keyframes`	
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
