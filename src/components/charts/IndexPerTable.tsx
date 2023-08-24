import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";
import useAppStore from "../../store/appStore";
import { TableInfo } from '../../store/appStore'




ChartJS.register(ArcElement, Tooltip, Legend);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Indexes Per Table',
      color: '#ffffffc8'
    },
  },
};

export const IndexPerTable: React.FC = () => {
  const { metricsData } = useAppStore();
  const tablesArray: TableInfo[] = Object.values(metricsData.databaseInfo);
  const indexData = tablesArray.map(table => {
    return {
      tableName: table.tableName,
      numberOfIndexes: table.numberOfIndexes,
    }
  });
  const data = {
      labels: indexData.map(table => table.tableName),
      datasets: [
        {
          label: 'Indexes Per Table',
          data: indexData.map(table => table.numberOfIndexes),
          backgroundColor: [
              "rgba(190, 99, 255, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(235, 86, 255, 0.2)",
              "rgba(16, 39, 215, 0.2)",
              "rgba(129, 75, 236, 0.2)",
              "rgba(64, 118, 255, 0.2)",
          ],
          borderColor: [
              "#dbdbdbdf",
          //     "rgba(54, 162, 235, 1)",
          //     "rgba(255, 206, 86, 1)",
          //     "rgba(75, 192, 192, 1)",
          //     "rgba(153, 102, 255, 1)",
          //     "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        }
      ]
  }
//   console.log(`in doughnut chart component: ${indexData[0]}`)
  return (
      <div className="dashboard-card small-card">
          <Doughnut data={data} options={options} />
      </div>
  );
}