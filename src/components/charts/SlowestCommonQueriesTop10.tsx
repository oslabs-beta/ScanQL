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
const splitBySpaces: string[] = (inputStr: string, spaceCount: number) => {
  let chunks = [];
  let parts = inputStr.split(' ');

  while (parts.length) {
    chunks.push(parts.splice(0, spaceCount).join(' '));
  }

  return chunks;
};
const splitByLength: Array = (inputStr:string, minLength:number, maxLength:number) => {
  const parts = inputStr.split(' ');
  let chunks = [];
  let chunk = "";

  for (let part of parts) {
    // If the current chunk plus the next word is within the limit, add the word to the chunk.
    if (chunk.length + part.length <= maxLength) {
      chunk += (chunk ? " " : "") + part;
    } else {
      // If it exceeds, push the current chunk to the chunks array and reset the chunk.
      chunks.push(chunk);
      chunk = part;
    }
  }

  // Ensure that the last chunk doesn't fall below the minimum length.
  // If it does, merge it with the previous chunk.
  if (chunks.length && (chunks[chunks.length - 1].length + chunk.length) < minLength) {
    chunks[chunks.length - 1] += " " + chunk;
  } else {
    chunks.push(chunk);
  }

  return chunks.filter(chunk => chunk.length >= minLength);
};


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
      sum += 1;
      // sum += tooltipItem.parsed.y;
    });
    return 'Sum: ' + sum;
  };
  // console.log('labelsarr, means arr, medianarr', shortLabelsArr, meanArr, medianArr);
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // This will allow the chart to stretch to fill its container
  
    plugins: {
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
          size: 8 // adjust as needed
        },
        titleFont: {
          size: 10 // adjust as needed
        },
        // displayColors: false,
        callbacks:{
          afterLabel: function(context) {
            // Assuming that execution count is stored in an array
            const execCount = countArr[context.dataIndex];
            let queryString = longLabelsArr[context.dataIndex];
            let wrappedStringArray = splitByLength(queryString, 20,40);

            return [
              'Exec Count: ' + execCount,
              'Query:  ', ...wrappedStringArray
            ];
          },
        },
      },
      title: {
      // position: 'top' as const, // Position title at the top
        display: true,
        text: 'Top 10 Slowest Common Executed Queries Ordered By Exec. Count',
        color: '#17012866',
        font: {
          size: '15%'
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
    },

    
  };
  const data = {
    labels: shortLabelsArr,
    datasets: [
      {
        label: 'Mean Exec Time (ms)',
        data: meanArr.map((el)=> {return (el * 1000);}),
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