import React, { useState } from 'react';
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
