import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { RowsInfoArray } from '../../Types';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PolarChartProps {
  rowsInfoData: RowsInfoArray;
}


// Rows per Table Polar Chart

export const PolarChart: React.FC<PolarChartProps> = ({ rowsInfoData }) => {
  const options = { //moved options into functions
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Rows Per Table',
        color: '#ffffffc8',
        font: {
          size: 10
        }
      },
    },
  };
  
  const data = {
    labels: rowsInfoData.map(table => table.tableName),
    datasets: [
      {
        label: 'Rows Per Table',
        data: rowsInfoData.map(table => table.numberOfRows),
        backgroundColor: [
          'rgba(190, 99, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(235, 86, 255, 0.2)',
          'rgba(16, 39, 215, 0.2)',
          'rgba(129, 75, 236, 0.2)',
          'rgba(64, 118, 255, 0.2)',
        ],
      }
    ]
  };
  return (
    <div className="dashboard-card">
      <PolarArea data={data} options={options} />
    </div>
  );
};
