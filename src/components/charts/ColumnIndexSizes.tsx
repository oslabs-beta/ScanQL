import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';


export const ColumnIndexSizes: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();
  const indexesArray: {}[] = Object.values(metricsData.dbSizeMetrics.indexSizesByTable);
  console.log(indexesArray)
  const labelsArray: string[] = [];
  const indexData: number[] = [];
  // loop through indexes Array
    // loop through keys in current object element of indexesArray
      // create an array of
  indexesArray.forEach((table): void => {
    for (const name in table) {
        labelsArray.push(name);
        indexData.push(toNumInKB(table[name]))
    }
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Index Size by Column',
        color: '#ffffffc8',
        font: {
          size: 14
        }
      },
    },
  };
    
  const data = {
    labels: labelsArray,
    datasets: [
          {
            label: 'Index Size (kb)',
            data: indexData,
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