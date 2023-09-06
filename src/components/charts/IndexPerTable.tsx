import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import React from 'react';
import useAppStore from '../../store/appStore';
import { TableInfo } from '../../store/appStore';

ChartJS.register(ArcElement, Tooltip, Legend);



export const IndexPerTable: React.FC = () => {
  const { metricsData, theme } = useAppStore();
  const tablesArray: TableInfo[] = Object.values(metricsData.databaseInfo);
  const indexData = tablesArray.map(table => {
    return {
      tableName: table.tableName,
      numberOfIndexes: table.numberOfIndexes,
    };
  });
  // Sort the indexData array based on the numberOfIndexes in descending order
  indexData.sort((a, b) => b.numberOfIndexes - a.numberOfIndexes);
  
  const options: ChartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0
    },
    plugins: {
      title: {
        display: true,
        text: 'Indexes Per Table',
        color: theme === "light" ? '#17012866' : '#ffffffac',
        font: {
          size: 14
        }
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels:{
          font: {
<<<<<<< HEAD
            size: 5, // Adjust the percentage value as needed
=======
            size: 12
>>>>>>> dev
          },
        },
      },
      
    },
  };
  const data = {
    labels: indexData.map(table => table.tableName),
    datasets: [
      {
        label: 'Number of Indexes',
        data: indexData.map(table => table.numberOfIndexes),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        scaleFontColor: '#FFFFFF',
        // backgroundColor: [
        //   'rgba(190, 99, 255, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(235, 86, 255, 0.2)',
        //   'rgba(16, 39, 215, 0.2)',
        //   'rgba(129, 75, 236, 0.2)',
        //   'rgba(64, 118, 255, 0.2)',
        // ],
        borderColor: [
          '#dbdbdbdf',
          //     "rgba(54, 162, 235, 1)",
          //     "rgba(255, 206, 86, 1)",
          //     "rgba(75, 192, 192, 1)",
          //     "rgba(153, 102, 255, 1)",
          //     "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      }
    ]
  };
  return (
    <div className="dashboard-card md-card">
      <Bar data={data} options={options} />
    </div>
  );
};