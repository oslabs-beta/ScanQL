import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';


export const ColumnIndexSizes: React.FC = () => {
  const { metricsData, toNumInKB, theme } = useAppStore();
  const indexesArray: {}[] = Object.values( metricsData.dbSizeMetrics.indexSizesByTable);
  console.log(indexesArray);
  const labelsArray: string[] = [];
  const indexData: number[] = [];
  // loop through indexes Array
  // loop through keys in current object element of indexesArray
  // create an array of
  indexesArray.forEach((table): void => {
    for (const name in table) {
      labelsArray.push(name.slice(0, -2));
      indexData.push(toNumInKB(table[name]));
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Index Size by Column (kbs)',
        color: theme === "light" ? '#17012866' : '#ffffffac',
        font: {
          size: '10%'
        },
        padding: {
          top: 10,
          bottom: 10
        }
      },
      legend: {
        display: false,
        position: 'bottom' as const,
        labels: {
          font: {
            size: '10%',
          },
          boxWidth: 10,
          padding: 10
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          padding: 0,
          autoSkip: false
        }
      },
      x: {
        ticks: {
          maxRotation: 90, // Set the maximum rotation angle to 90
          minRotation: 90,  // Set the minimum rotation angle to 90
          font: {
            size: '10%'
          },
        }
      }
    }
  };
    
  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: 'Index Size (kb)',
        data: indexData,
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: '#FFFFFF',
      },
    ]
  };
  return (
    <div className="dashboard-card md-card dashboard-card-dark">
      <Bar data={data} options={options} />
    </div>
  );
};