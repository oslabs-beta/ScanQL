import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

interface Table {
  diskSize: string;
  rowSize: string;
}


export const TableSize: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();
  const tablesArray: Table[] = Object.values(metricsData.dbSizeMetrics.tableSizes);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Table Storage (kb)',
        color: '#ffffffc8'
      },
    },
  };
    
  const data = {
    labels: Object.keys(metricsData.dbSizeMetrics.tableSizes),
    datasets: [
      {
        label: 'Disk Size',
        data: tablesArray.map(table => toNumInKB(table.diskSize)),
        backgroundColor: 'rgba(107, 99, 255, 0.5)',
        scaleFontColor: "#FFFFFF",
      },
      {
        label: 'Row Size',
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