import Lottie from 'react-lottie';
import animationData from 'src/Assets/lotties/Lottie_loader.json';

import './Loader.scss';

interface LoaderProps {
  width?: number;
  height?: number;
}

export const Loader: React.FC<LoaderProps> = ({ width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={defaultOptions} height={height} width={width} />;
};
