import React from 'react';
import * as Separator from '@radix-ui/react-separator';
import useAppStore from '../../store/appStore';

interface MetricsSeparatorProps {
  title: string;
}

export const MetricsSeparator: React.FC<MetricsSeparatorProps> = ({title}) => {
  return (
    <div className="w-full max-w-[300px] mx-[15px] span-all mt-6 first:mt-0">
      <div className="text-white text-[22px] leading-5 font-medium font-montserrat">{title}</div>
      <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
    </div>
  )
}