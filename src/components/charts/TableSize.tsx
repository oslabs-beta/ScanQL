import { Bar } from 'react-chartjs-2';

interface TableSizeProps {
    tableSizeData: {};
}

export const TableSize: React.FC<TableSizeProps> = ({ tableSizeData }) => {
    console.log(tableSizeData);
    // loop over tableSizeData object's value (which are objects of each table containing disksize and rowsize)
    

    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: `Planning Execution Times - `,
            color: '#ffffffc8'
          },
        },
      };
    
      const data = {
        labels: Object.keys(tableSizeData),
        datasets: [
          {
            label: 'Planning Time',
            data: [],
            backgroundColor: 'rgba(107, 99, 255, 0.5)',
            scaleFontColor: "#FFFFFF",
          },
          {
            label: 'Execution Time',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            scaleFontColor: "#FFFFFF",
          },
          {
            label: 'Total Time',
            data: [],
            backgroundColor: 'rgba(235, 86, 255, 0.2)',
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