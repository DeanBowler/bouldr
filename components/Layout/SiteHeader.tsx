import { gradientShift } from '@/styled/keyframes';
import styled, { th, x } from '@xstyled/styled-components';
import { BouldrIcon } from '../icons/BouldrIcon';

const BACKGROUND_GRADIENT_ONE = '#3a405e';
const BACKGROUND_GRADIENT_TWO = '#664364';

const StyledHeader = styled.header`
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 3;
  height: ${th.size(4)};

  font-family: ${th.font('cursive')};
  font-display: block;

  ::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    opacity: 0.5;

    background: linear-gradient(
      -25deg,
      ${BACKGROUND_GRADIENT_ONE},
      ${BACKGROUND_GRADIENT_TWO},
      ${BACKGROUND_GRADIENT_ONE}
    );
    background-size: 500% 500%;
    animation: ${gradientShift} 30s ease infinite forwards;
  }

  :after {
    content: '';
    background-attachment: fixed;
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    pointer-events: none;
    background-image: url('/images/curtain.svg');
    opacity: 0.1;
  }
`;

export const SiteHeader = () => {
  return (
    <StyledHeader>
      <x.div display="flex" alignItems="center" ml={2}>
        <BouldrIcon fontSize="4xl" />
        <x.div fontSize={{ xs: '3xl', md: '4xl' }} ml={4}>
          Bouldr
        </x.div>
      </x.div>
    </StyledHeader>
  );
};
