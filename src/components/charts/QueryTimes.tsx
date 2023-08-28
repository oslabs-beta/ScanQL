import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Query Response Rates',
//       color: '#ffffffc8'
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(104, 99, 255)',
//       scaleFontColor: "#FFFFFF",
//       backgroundColor: 'rgba(107, 99, 255, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       color: '#ffffffc8',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export const options2 = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Planning Execution Times - Event',
//       color: '#ffffffc8'
//     },
//   },
// };

// const labels2 = ['Insert', 'Select', 'Update'];

// export const data2 = {
//   labels: labels2,
//   datasets: [
//     {
//       label: 'Planning Time',
//       data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(107, 99, 255, 0.5)',
//       scaleFontColor: "#FFFFFF",
//     },
//     {
//       label: 'Execution Time',
//       data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       scaleFontColor: "#FFFFFF",
//     },
//     {
//       label: 'Total Time',
//       data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       scaleFontColor: "#FFFFFF",
//     },
//   ],
// };

interface BarGraphProps {
  table: any;
  tableName: String;
}

export const QueryTimes: React.FC<BarGraphProps> = ({ table, tableName }) => {
  //  Insert Execution Metrics
  // const insertExecutionTime = table.INSERT.plan.rows[0]['QUERY PLAN'][0]['Execution Time'];
  // const insertPlanningTime = table.INSERT.plan.rows[0]['QUERY PLAN'][0]['Planning Time'];

  const executionTimes = [
    table.INSERT.plan.rows[0]['QUERY PLAN'][0]['Execution Time'] * 1000,
    table.SELECT.plan.rows[0]['QUERY PLAN'][0]['Execution Time'] * 1000,
    table.UPDATE.plan.rows[0]['QUERY PLAN'][0]['Execution Time'] * 1000
  ];

  const planningTimes = [
    table.INSERT.plan.rows[0]['QUERY PLAN'][0]['Planning Time'] * 1000,
    table.SELECT.plan.rows[0]['QUERY PLAN'][0]['Planning Time'] * 1000,
    table.UPDATE.plan.rows[0]['QUERY PLAN'][0]['Planning Time'] * 1000
  ];

  const totalTimes = [
    executionTimes[0] + planningTimes[0],
    executionTimes[1] + planningTimes[1],
    executionTimes[2] + planningTimes[2]
  ];

  // console.log(`Execution Times: ${executionTimes}, Planning Times: ${planningTimes}`)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Planning vs Execution Times (ms) - ${tableName}`,
        color: '#17012866',
        font: {
          size: '15%'
        }
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels:{
          font: {
            size: '10%'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
  };

  const data = {
    innerHeight: 100,
    labels: ['Insert', 'Select', 'Update'],
    datasets: [
      {
        label: 'Planning Time (ms)',
        data: planningTimes,
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: "#FFFFFF",
      },
      {
        label: 'Execution Time (ms)',
        data: executionTimes,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        scaleFontColor: "#FFFFFF",
      },
      {
        label: 'Total Time (ms)',
        data: totalTimes,
        backgroundColor: 'rgba(235, 86, 255, 0.2)',
        scaleFontColor: "#FFFFFF",
      },
    ],
  };
  return (
    <div className="dashboard-card md-card">
      <Bar data={data} options={options} />
    </div>
  );
}





// export const options2 = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//       color: '#ffffffc8'
//     },
//   },
// };

// const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data2 = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(107, 99, 255, 0.5)',
//       scaleFontColor: "#FFFFFF",
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       scaleFontColor: "#FFFFFF",
//     },
//   ],
// };