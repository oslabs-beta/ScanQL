import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

interface Table {
  diskSize: string;
  rowSize: string;
}


export const TableSize: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();
  console.log('metrics data',metricsData)
  const tablesArray: Table[] = Object.values(metricsData.dbSizeMetrics.tableSizes);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Table Size',
        color: '#17012866',
        font: {
          size: 14
        }
      },
      legend: {
        position: 'bottom' as const,
        labels:{
          font: {
            size: '10%', // Adjust the percentage value as needed
          },
        },
      },
      
    },
  };
    
  const data = {
    labels: Object.keys(metricsData.dbSizeMetrics.tableSizes),
    datasets: [
      {
        label: 'Disk Size (kb)',
        data: tablesArray.map(table => toNumInKB(table.diskSize)),
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: "#FFFFFF",
      },
      {
        label: 'Row Size (kb)',
        data: tablesArray.map(table => toNumInKB(table.rowSize)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        scaleFontColor: "#FFFFFF",
      },
    ],
  };
  return (
    <div className="dashboard-card md-card">
      <Bar data={data} options={options} />
    </div>
  );
}