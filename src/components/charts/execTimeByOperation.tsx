import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

// type ExecTimeByOperation = {
//   [operation: string] :  {
//     query: string;
//     operation: string;
//     median_exec_time: number;
//     mean_exec_time: number;
//     stdev_exec_time:number;
//     min_exec_time: number;
//     max_exec_time: number;
//     execution_count: number;

//   }
// }

interface Table {
    query: string;
    operation: string;
    median_exec_time: number;
    mean_exec_time: number;
    stdev_exec_time:number;
    min_exec_time: number;
    max_exec_time: number;
    execution_count: number;
}


export const ExecTimesByOperation: React.FC = () => {
  const { metricsData, theme } = useAppStore();
  console.log(metricsData);
  const tablesArray: Table[] = Object.values(metricsData.dbHistMetrics.execTimesByOperation);

  //CREATING the object for MinMax 
  // const m; 


  const options = {
    
    responsive: true,
    maintainAspectRatio: false, // This will allow the chart to stretch to fill its container
    // layout: {
    //   padding: {
    //     top: 0, // Adjust the padding top value to create space for the title
    //     bottom: 0,
    //   },
    // },
    plugins: {
      title: {
        // position: 'top' as const, // Position title at the top
        display: true,
        text: 'Mean/Median Exec Times by Operations (All Queries)',
        color: theme === "light" ? '#17012866' : '#ffffffac',
        font: {
          size: '10%'
        },
        
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels:{
          font: {
            size: '10%', // Adjust the percentage value as needed
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };
  // const errorBarsData = tablesArray.map(object => ({
  // y: object.mean_exec_time * 1000,
  //   y: 5000,
  //   min: object.min_exec_time * 1000,
  //   max: object.max_exec_time * 1000
  // })); 
  const data = {
    labels: Object.keys(metricsData.dbHistMetrics.execTimesByOperation),
    datasets: [
      {
        label: 'Mean Exec Time (ms)',
        data: tablesArray.map(object => object.mean_exec_time ),
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: '#FFFFFF',
      },
      {
        label: 'Median Exec Time (ms)',
        data: tablesArray.map(object => object.median_exec_time),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        scaleFontColor: '#FFFFFF',
      },
      // {
      //   label: 'Error Bars',
      //   data: errorBarsData,
      //   type: 'line',
      //   borderColor: 'red',
      //   // borderWidth: 2,
      //   // pointRadius: 0,
      //   fill: false,
      //   tension: 0,
      //   yAxisID: 'Min/Max'
      // }
    ],
  };
  return (
    <div className="dashboard-card md-card dashboard-card-dark">
      <Bar data={data} options={options} />
    </div>
  );
};