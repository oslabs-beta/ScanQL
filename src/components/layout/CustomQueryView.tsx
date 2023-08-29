import React, { useState } from 'react';

import { Line } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

import FormField from '../ui/QueryForm';
import { LineChart } from '../charts/LineGraph';

const CustomQueryView: React.FC = () => {
  return (
    <>
      <FormField />
      <div className='custom-query-charts'>
      <LineChart/>
      </div>
    </>
  );
};

export default CustomQueryView;
