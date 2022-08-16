import Lottie from "react-lottie";

interface Props {
  animation: any;
  width: string | number;
  height: string | number;
}

export default function LottieComponent({ animation, width, height }: Props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie width={width} options={defaultOptions} height={height} />;
}
