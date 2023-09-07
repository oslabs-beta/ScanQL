import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

interface BarGraphProps {
  table: any;
  tableName: String;
}

export const QueryTimes: React.FC<BarGraphProps> = ({ table, tableName }) => {
  const {theme} = useAppStore();

  const executionTimes = [
    table.SELECT.plan.rows[0]['QUERY PLAN'][0]['Execution Time'] * 1000,
    table.UPDATE.plan.rows[0]['QUERY PLAN'][0]['Execution Time'] * 1000
  ];
  const planningTimes = [
    table.SELECT.plan.rows[0]['QUERY PLAN'][0]['Planning Time'] * 1000,
    table.UPDATE.plan.rows[0]['QUERY PLAN'][0]['Planning Time'] * 1000
  ];
  const totalTimes = [
    executionTimes[0] + planningTimes[0],
    executionTimes[1] + planningTimes[1],
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Planning vs Execution Times - ${tableName}`,
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
            size: 12
          }
        }
      },
      tooltip: {
        // enabled: false, // disable default tooltips
        // backgroundColor: 'rgb(255, 0, 200)',
        // titleColor:'rgb(0,0,255)',
        padding: {
          left: 3,
          right: 3,
          top: 2,
          bottom: 2
        },
        bodyFont: {
          size: 8
        },
        titleFont: {
          size: 10
        },
        // displayColors: false,
        callbacks:{
          afterLabel: function(context: any) {
            // Assuming that execution count is stored in an array
            const queryString = context.dataIndex === 0? "Select Query: `EXPLAIN SELECT * FROM ${tableInfo.tableName} WHERE '${sampleColumnsArr[sampleColumnsArr.length - 1]}' = $1`" : "Update Query: `EXPLAIN UPDATE ${tableInfo.tableName} SET ${updateColumn} = $1 WHERE ${pkArray[pkArray.length - 1]} = $2`" 


            return [
              queryString
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
  };

  const data = {
    innerHeight: 100,
    labels: ['Select', 'Update'],
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
    <div className="dashboard-card md-card dashboard-card-dark">
      <Bar data={data} options={options} />
    </div>
  );
}