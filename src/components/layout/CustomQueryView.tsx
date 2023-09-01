import React, { useState } from 'react';
import FormField from '../ui/QueryForm';
import { PlanningExecutionTimes } from '../customQueryCharts/PlanningExecutionTimes';

import { CustomQueryGeneralMetrics } from '../customQueryCharts/CustomQueryGeneralMetrics';

import { MeanPlanningExecutionTimes } from '../customQueryCharts/MeanPlanningExecutionTimes';

const CustomQueryView: React.FC = () => {
  return (
    <>
      <FormField />
      <div className='dashboard-container custom-query-charts h-full'>
      <div className='custom-query-cards h-72 span-all'>
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
