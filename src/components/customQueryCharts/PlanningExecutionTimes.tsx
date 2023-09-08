import React from 'react';
import useAppStore from '../../store/appStore';
// import { TableInfo } from '../../store/appStore';
import { Line } from 'react-chartjs-2';


export const PlanningExecutionTimes: React.FC = () => {
  const { customQueryData, theme } = useAppStore();
  const labelsArr: number[] = customQueryData.labelsArr;
  const executionTimesArr: number[] = customQueryData.executionTimesArr.map((time) => time * 1000);
  const planningTimesArr: number[] = customQueryData.planningTimesArr.map((time)=> time *1000);
  const totalTimesArr: number[] = customQueryData.totalTimesArr.map((time) => time * 1000);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This will allow the chart to stretch to fill its container
    plugins: {
      title: {
        // position: 'top' as const, // Position title at the top
        display: true,
        text: `Planning vs. Execution Time for ${customQueryData.queryCount} runs and a ${customQueryData.queryDelay} sec. delay`,
        color: theme === "light" ? '#17012866' : '#ffffffac',
      },
    },
    scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: theme === "light" ? '#17012813' : '#ffffff1a'
          }
        },
        x: {
          grid: {
            color: theme === "light" ? '#17012813' : '#ffffff1a'
          }
        }
     
      }
  };

  const data = {
    labels: labelsArr,

    datasets: [
      {
        label: 'Execution Time (ms)',
        data: executionTimesArr,
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: '#FFFFFF',
        borderColor: theme === "light" ? 'rgba(107, 99, 255, 0.713)' : 'rgba(107, 99, 255, 0.713)',
      },
      {
        label: 'Planning Time (ms)',
        data: planningTimesArr,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        scaleFontColor: '#FFFFFF',
        borderColor: theme === "light" ? 'rgba(54, 163, 235, 0.635)' : 'rgba(54, 163, 235, 0.635)'
      },
      {
        label: 'Total Time (ms)',
        data: totalTimesArr,
        backgroundColor: 'rgba(235, 86, 255, 0.2)',
        borderColor: theme === "light" ? 'rgba(218, 86, 255, 0.476)' : 'rgba(235, 86, 255, 0.506)'
      }
    ]
  };

  return (
    <>
      <Line data={data} options={options} />
    </>

  );
};