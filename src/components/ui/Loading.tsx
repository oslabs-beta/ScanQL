import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import logo from '../../assets/logo-horizontal-v2.png';

const Loading: React.FC = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex justify-center .items-center loading-center' >
        {/* <Progress.Root
        className="relative overflow-hidden bg-blackA9 rounded-full w-[300px] h-[25px]"
        style={{
            transform: 'translateZ(0)',
            }}
            value={progress}
            >
        <Progress.Indicator
            className=" bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(-${100 - progress}%)` }}
            />
        </Progress.Root> */}
        <img className='logo-nav-loader' src={logo}></img>
    </div>
  );
};

export default Loading;
