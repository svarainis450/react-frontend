import Lottie from 'lottie-react';
import animationData from 'src/Assets/lotties/Lottie_loader.json';
import styled from 'styled-components';

import './Loader.scss';

interface LoaderProps {
  width?: number;
  height?: number;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <AnimationWrapper {...props}>
      <Lottie {...defaultOptions} />
    </AnimationWrapper>
  );
};

const AnimationWrapper = styled.div<LoaderProps>`
  height: ${({ height }) => height && `${height}px`};
  width: ${({ width }) => width && `${width}px`};
  margin: auto;
`;
