import React from 'react';
import useAppStore from '../../store/appStore';
import { TableInfo } from '../../store/appStore';
import { Line } from 'react-chartjs-2';


export const LineChart: React.FC = () => {
  const { customQueryData } = useAppStore();
  const labelsArr: number[] = customQueryData.labelsArr;
  const executionTimesArr: number[] = customQueryData.executionTimesArr;
  const planningTimesArr: number[] = customQueryData.planningTimesArr;
  const totalTimesArr: number[] = customQueryData.totalTimesArr;

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This will allow the chart to stretch to fill its container
    plugins: {
      title: {
        // position: 'top' as const, // Position title at the top
        display: true,
        text: 'Planning v. Execution Time for All 10 Query runs',
        color: '#17012866',
      },
      
      
    }
  };

  const data = {
    labels: labelsArr,

    datasets: [
      {
        label: 'Executiion Time',
        data: executionTimesArr,
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: '#FFFFFF',
      },        
      {
        label: 'Planning Time',
        data: planningTimesArr,
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: '#FFFFFF',
      },
      {
        label: 'Total Time',
        data: totalTimesArr,
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: '#FFFFFF',
      }
    ]
  };

  return (
    <>
      <Line data ={data} options = {options}/>
    </>
  
  );
};