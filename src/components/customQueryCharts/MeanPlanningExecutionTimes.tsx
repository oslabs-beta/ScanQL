import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';


export const MeanPlanningExecutionTimes: React.FC = () => {
  const { customQueryData } = useAppStore();


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
        text: 'Mean Exec & Planning Times (Among All 10 Queries)',
        color: '#17012866',
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
    labels: customQueryData.overallMeanTimesLabels,
    datasets: [
      {
        label: 'Mean Exec Time (ms)',
        data: customQueryData.overallMeanTimesArr.map((el)=>{
          return el * 1000;
        }),
        backgroundColor: [
          'rgba(190, 99, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(235, 86, 255, 0.2)',
          'rgba(16, 39, 215, 0.2)',
          'rgba(129, 75, 236, 0.2)',
          'rgba(64, 118, 255, 0.2)',
        ], 
        // backgroundColor: 'rgba(107, 99, 255, 0.5)',
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
    <div className="customQueryBarChart">
      <Bar data={data} options={options} />
    </div>
  );
};