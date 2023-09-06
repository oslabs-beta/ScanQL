import React, { useState } from 'react';
import FormField from '../ui/QueryForm';
import { PlanningExecutionTimes } from '../customQueryCharts/PlanningExecutionTimes';

import { CustomQueryGeneralMetrics } from '../customQueryCharts/CustomQueryGeneralMetrics';

import { MeanPlanningExecutionTimes } from '../customQueryCharts/MeanPlanningExecutionTimes';

const CustomQueryView: React.FC = () => {
  return (
    <>
      <FormField />
      <div className='custom-query-container custom-query-charts h-full'>
      <div className='custom-query-card-box h-32 span-all'>
        <CustomQueryGeneralMetrics />
      </div>
      <div className='query-card span-all'>
        <PlanningExecutionTimes />
      </div>
      <div className='query-card span-all'>
        <MeanPlanningExecutionTimes />
      </div>
      </div>
    </>
  );
};

export default CustomQueryView;
