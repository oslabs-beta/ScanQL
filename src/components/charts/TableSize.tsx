import { Bar } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

interface Table {
  diskSize: String;
  rowSize: String;
}

// only converts to kb. could be refactored to loop through all the size units and find the one that is the most common, than proivde different scenarios for converting to each unit (kb, mb, gb); use a cache to store quantities of found unit tied to the unit as the key. 
const toNumInKB = (size: String): number => { 
  let num = '';
  for (const char of size) {
    if (/[0-9]/.test(char)) num += char;
    else break;
  }
  // check if bytes, convert accordingly and return
  if (size.toLowerCase().includes('bytes')) return parseInt(num) / 1000;
  // check if mB, convert accordingly and return
  if (size.toLowerCase().includes('mb')) return parseInt(num) * 1000;
  // return num if already kb
  return parseInt(num);
}


export const TableSize: React.FC = () => {
  const { metricsData } = useAppStore();
  const tablesArray: Table[] = Object.values(metricsData.dbSizeMetrics.tableSizes);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Table Sizes (kb)',
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