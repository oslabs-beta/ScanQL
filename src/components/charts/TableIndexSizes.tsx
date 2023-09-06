import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';


export const TableIndexSizes: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();
  const indexesArray: {}[] = Object.values(metricsData.dbSizeMetrics.indexSizesByTable);
  const indexSizeByTableArray: number[] = indexesArray.map(table => {
    let total = 0;

    for (const key in table) {
      total += toNumInKB(table[key]);
    }
    return total;
  });

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Index Size by Table',
        color: '#17012866',
        font: {
          size: 14
        }
      },
    },
  };
    
  const data = {
    labels: metricsData.dbSizeMetrics.tableNames,
    datasets: [
      {
        label: 'Index Size (kbs)',
        data: indexSizeByTableArray,
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: '#FFFFFF',
      },
    ]
  };
  return (
    <div className="dashboard-card db-size-charts">
      <Bar data={data} options={options} />
    </div>
  );
};