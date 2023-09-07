import React from 'react';
import FormField from '../ui/QueryForm';
import { PlanningExecutionTimes } from '../customQueryCharts/PlanningExecutionTimes';

import { CustomQueryGeneralMetrics } from '../customQueryCharts/CustomQueryGeneralMetrics';

import { MeanPlanningExecutionTimes } from '../customQueryCharts/MeanPlanningExecutionTimes';
import useAppStore from '../../store/appStore';



const CustomQueryView: React.FC = () => {
  const { customQueryData, view } = useAppStore();

  // need to find data to check for conditional rendering
  return (
    <>
      <FormField />
      <div className='custom-query-container custom-query-charts h-full'>
        {!customQueryData.labelsArr.length && view !== 'loading' &&
          <div className="invalid-uri">
            <div
              className="enter-query-box text-indigo-900 text-opacity-80 text-dark-mode"
            >
              Enter a query to see results
            </div>
          </div>
        }
        {customQueryData.labelsArr.length > 0 &&
          <>
            <div className='custom-query-card-box h-32 span-all'>
              <CustomQueryGeneralMetrics />
            </div>
            <div className='query-card span-all'>
              <PlanningExecutionTimes />
            </div>
            <div className='query-card span-all'>
              <MeanPlanningExecutionTimes />
            </div>
          </>
        }
      </div>
    </>
  );
};

export default CustomQueryView;
