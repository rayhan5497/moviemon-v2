import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottiePlayer = ({ lottie, className, width, height }) => {
  return (
    <DotLottieReact
      src={lottie}
      autoplay
      loop
      width="100%"
      height="100%"
      className={className}
    />
  );
};

export default LottiePlayer;
