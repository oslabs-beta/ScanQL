import React, { useState } from 'react';
import FormField from '../ui/QueryForm';
import { PlanningExecutionTimes } from '../customQueryCharts/PlanningExecutionTimes';

import { CustomQueryGeneralMetrics } from '../customQueryCharts/CustomQueryGeneralMetrics';

import { MeanPlanningExecutionTimes } from '../customQueryCharts/MeanPlanningExecutionTimes';

const CustomQueryView: React.FC = () => {
  return (
    <>
      <FormField />
      <div className='custom-query-charts'>
        <PlanningExecutionTimes />
      </div>
      <div className='custom-query-charts'>
        <MeanPlanningExecutionTimes />
      </div>
      <div className='custom-query-cards'>
        <CustomQueryGeneralMetrics />
      </div>
    </>
  );
};

export default CustomQueryView;
