import useAppStore from '../../store/appStore';
import { Bar } from 'react-chartjs-2';
import { IndexItem } from '../../Types';

export const TableIndexSizes: React.FC = () => {
  const { metricsData, toNumInKB, theme } = useAppStore();
  const indexesArray: {}[] = Object.values(metricsData.dbSizeMetrics.indexSizesByTable);
  const indexSizeByTableArray: number[] = indexesArray.map((table: IndexItem)  => {
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
        color: theme === "light" ? '#17012866' : '#ffffffac',
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
    <div className="dashboard-card db-size-charts dashboard-card-dark">
      <Bar data={data} options={options} />
    </div>
  );
};