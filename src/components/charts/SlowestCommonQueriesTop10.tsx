import { Bar, HorizontalBar } from 'react-chartjs-2';
// import { HorizontalBar } from 'react-chartjs-2';
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

interface SlowQueryObj {
  query:string;
  median: number;
  mean: number;
}

type mainArray = {
  [queryName:string]:SlowQueryObj
}


export const SlowestCommonQueriesTop10: React.FC = () => {
  const { metricsData } = useAppStore();
  console.log(metricsData);
  // const queryObject: mainArray = metricsData.dbHistMetrics.slowestCommonQueries;

  //CREATING the object for MinMax 
  // const m; 

  const shortLabelsArr : string[] = [];
  const longLabelsArr : string[] = [];
  const meanArr : number[] = [];
  const medianArr : number[] = [];
  const countArr : number[] = [];
  console.log('this is the common top 10', metricsData.dbHistMetrics.slowestCommonQueries);
  let count = 0;
  for (const query in metricsData.dbHistMetrics.slowestCommonQueries) {
    if (count >= 10) break; // Limit to top 10
    shortLabelsArr.push(query);
    longLabelsArr.push(metricsData.dbHistMetrics.slowestCommonQueries[query].query);
    meanArr.push(metricsData.dbHistMetrics.slowestCommonQueries[query].mean);
    medianArr.push(metricsData.dbHistMetrics.slowestCommonQueries[query].median);
    countArr.push(metricsData.dbHistMetrics.slowestCommonQueries[query].count);
    count++;
  }
  //tooltip function
  const footer = (tooltipItems) => {
    let sum = 0;
  
    tooltipItems.forEach(function(tooltipItem) {
      sum+=1
      // sum += tooltipItem.parsed.y;
    });
    return 'Sum: ' + sum;
  };
  // console.log('labelsarr, means arr, medianarr', shortLabelsArr, meanArr, medianArr);
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // This will allow the chart to stretch to fill its container
    // layout: {
    //   padding: {
    //     top: 0, // Adjust the padding top value to create space for the title
    //     bottom: 0,
    //   },
    // },
    plugins: {
      tooltip: {
        backgroundColor: 'rgb(255, 0, 200)',
        titleColor:'rgb(0,0,255)',
        callbacks:{
          afterLabel: function(context) {
            // Assuming that execution count is stored in an array named countArr
            const execCount = countArr[context.dataIndex];
            return 'Exec Count: ' + execCount;
          }
        },
      }
        // callbacks: {
        //     labelColor: function(context) {
        //         return {
        //             borderColor: 'rgb(0, 0, 255)',
        //             backgroundColor: 'rgb(255, 0, 0)',
        //             borderWidth: 2,
        //             borderDash: [2, 2],
        //             borderRadius: 2,
        //         };
        //     },
        //     labelTextColor: function(context) {
        //         return '#543453';
        //     }
        //   }
        // }
      },
      // title: {
      //   // position: 'top' as const, // Position title at the top
      //   display: true,
      //   text: 'Top 10 Slowest Common Executed Queries Ordered By Exec. Count',
      //   color: '#17012866',
      //   font: {
      //     size: '15%'
      //   }, 
      // },
      // legend: {
      //   display: true,
      //   position: 'bottom' as const,
      //   labels:{
      //     font: {
      //       size: '10%', // Adjust the percentage value as needed
      //     },
      //   },
      // },
      
    // },
    scales: {
      y: {
        beginAtZero: true,
      }
    },

    
  };
  const data = {
    labels: shortLabelsArr,
    datasets: [
      {
        label: 'Mean Exec Time (ms)',
        data: meanArr,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        scaleFontColor: '#FFFFFF',
      },
      // {
      //   label: 'Median Exec Time (ms)',
      //   data: medianArr,
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      //   scaleFontColor: '#FFFFFF',
      // },
    ],
  };
  return (
    <div className="dashboard-card md-card">
      <Bar data={data} options={options} />
    </div>
  );
};