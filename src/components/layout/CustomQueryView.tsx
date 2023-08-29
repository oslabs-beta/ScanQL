import React, { useState } from 'react';

import { Line } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

import FormField from '../ui/Form';
import { LineChart } from '../charts/LineGraph';

const CustomQueryView: React.FC = () => {

  return (
    <>
      <FormField />
      <LineChart/>
    </>
  );
};

export default CustomQueryView;
