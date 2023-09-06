import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useState } from 'react';
import useAppStore from '../../store/appStore';
import { TableInfo } from '../../store/appStore';

import { Dialog } from '@radix-ui/react-dialog';

ChartJS.register(ArcElement, Tooltip, Legend);


export const RowsPerTable: React.FC = () => {
  const { metricsData, openModal, theme } = useAppStore();
  const tablesArray: TableInfo[] = Object.values(metricsData.databaseInfo);
  const rows = tablesArray.map(table => {
    return {
      tableName: table.tableName,
      numberOfRows: table.numberOfRows,
    };
  });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        font: {
          size: '10%', // Adjust the percentage value as needed
        },
      },
      title: {
        display: true,
        text: 'Rows Per Table',
        color: theme === "light" ? '#17012866' : '#ffffffac',
        font: {
          size: 14
        }
      },
    },
  };
  

  const data = {
    labels: rows.map(table => table.tableName),
    datasets: [
      {
        label: 'Rows Per Table',
        data: rows.map(table => table.numberOfRows),
        backgroundColor: [
          'rgba(190, 99, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(235, 86, 255, 0.2)',
          'rgba(16, 39, 215, 0.2)',
          'rgba(129, 75, 236, 0.2)',
          'rgba(64, 118, 255, 0.2)',
        ],
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
    <div onClick={openModal} className="dashboard-card dashboard-card-dark">
      <Pie data={data} options={options} />
    </div>
  );
};

// To pass data from the `MetricsView` component to the `PieChart` component using TypeScript, you'll need to ensure that:

// 1. The `PieChart` component is correctly set up to receive the necessary props.
// 2. The `MetricsView` component is passing the data as props to the `PieChart` component.
// 3. TypeScript types are correctly set up for these props for type-safety.

// Let's break this down step by step:

// ### 1. Define the Prop Types for PieChart:

// From the code you provided, it looks like you're trying to pass `tableInfo` as a prop to `PieChart`. 

// In `PieChart`, you hinted at a type `rowsInfo` for this prop, but didn't provide its structure. Let's define this type:

// ```typescript
// // Assuming this is in types.ts or similar
// export type TableInfo = {
//   tableName: string;
//   numberOfRows: number;
// };

// export type rowsInfo = TableInfo[]; 
// ```

// ### 2. Update PieChart to Use the Prop Types:

// Now, in your `PieChart` component, you should define and use these prop types:

// ```typescript
// interface PieChartProps {
//   tableInfo: rowsInfo;
// }

// export const PieChart: React.FC<PieChartProps> = ({ tableInfo }) => {
//   // rest of the component...
// };
// ```

// ### 3. Pass the Data from MetricsView to PieChart:

// Now, in `MetricsView`, when you're creating the `PieChart` components, you can pass the `rowsData` as `tableInfo` prop:

// ```typescript
// const pieChartComponents = rowsData.map((rowData, index) => (
//   <PieChart key={index} tableInfo={rowData} />
// ));
// ```

// Note: It's not ideal to use the index as the key for React lists, but if `tableName` is unique for each `rowData`, it would be better to use that:

// ```typescript
// const pieChartComponents = rowsData.map(rowData => (
//   <PieChart key={rowData.tableName} tableInfo={rowData} />
// ));
// ```

// ### 4. Ensure Data Transformation is Correct:

// The code you provided transforms `tablesArray` into `rowsData` and then tries to pass each item of `rowsData` to individual `PieChart` components. Ensure that the data structure and transformations are correct and fit the expected prop types.

// ### Conclusion:

// By defining prop types in TypeScript and passing data as props, you're ensuring type-safety and making sure that the components receive and use data as expected. This minimizes runtime errors and makes the codebase easier to understand and maintain.