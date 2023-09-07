import React from 'react';
import logo from '../../assets/logo-horizontal-v2.png';

const Loading: React.FC = () => {
  const [progress, setProgress] = React.useState(13);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 600);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className='flex justify-center .items-center loading-center' >

        <img className='logo-nav-loader' src={logo}></img>
    </div>
  );
};

export default Loading;
