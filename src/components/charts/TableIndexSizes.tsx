import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';


export const TableIndexSizes: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();
  const indexesArray: {}[] = Object.values(metricsData.dbSizeMetrics.indexSizesByTable);
  const indexSizeByTableArray: number[] = indexesArray.map(table => {
    let total = 0;
    // loop through object and at each iteration run the value through toNumInKB function and add it to total
    // after loop return total
    for (const key in table) {
      total += toNumInKB(table[key]);
    }
    return total;
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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
            label: 'Total Index Size (kb)',
            data: indexSizeByTableArray,
            backgroundColor: 'rgba(107, 99, 255, 0.5)',
            scaleFontColor: "#FFFFFF",
          },
        ]
  };
  return (
    <div className="dashboard-card md-card">
      <Bar data={data} options={options} />
    </div>
  );
}