// import { Container } from '@radix-ui/themes';
import useAppStore from '../../store/appStore';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../ui/Loading';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '../charts/PieChart'




// const MetricsView: React.FC = () => {

//   return (

//     <Container size="3">
    
//     </Container>
//   )
// }

// export default MetricsView;


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// import { FaceIcon, ImageIcon, SunIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
// import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import DashNav from './DashNav';

import ConnectDB from './ConnectDB';
import { useEffect } from 'react';
// import { PieChart } from '../charts/PieChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Query Response Rates',
      color: '#ffffffc8'
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(104, 99, 255)',
      scaleFontColor: "#FFFFFF",
      backgroundColor: 'rgba(107, 99, 255, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      color: '#ffffffc8',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
      color: '#ffffffc8'
    },
  },
};

const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(107, 99, 255, 0.5)',
      scaleFontColor: "#FFFFFF",
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      scaleFontColor: "#FFFFFF",
    },
  ],
};



const MetricsView: React.FC = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { isConnectDBOpen, closeConnectDB, openConnectDB, metricsData } = useAppStore();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated])

  let tablesArray : any[] = [];
  useEffect(() => {
    if (!metricsData) return;
    tablesArray = Object.values(metricsData.databaseInfo)
    console.log(tablesArray);
    // loop through tablesArray
    // build a component in each iteration that has as props to pieChart: tableName,
  }, [metricsData])

      if (isLoading) {
    return <Loading />;
  }

    const rowsData = tablesArray.map(table => {
      return {
        tableName: table.tableName,
        numberOfRows: table.numberOfRows,
      }
    })
    
    const pieChartComponents = [];
    for (let i = 0; i < 1; i++) {
      pieChartComponents.push(<PieChart tableInfo={rowsData} />)
    }

    return (

      <div>
        {/* <div>{JSON.stringify(user)}</div> */}
        {/* <Header /> */}
        {/* {isConnectDBOpen && <ConnectDB />} */}
        <div className="dashboard-page">
          <div className="dashboard-container">
            <div className="dashboard-card">
              <Line options={options} data={data} />
            </div>
            <div className="dashboard-card">
              <Bar options={options2} data={data2} />
            </div>
              {pieChartComponents}
            <div className="dashboard-card">
              <Line options={options} data={data} />
            </div>
            <div className="dashboard-card">
              <Bar options={options2} data={data2} />
            </div>
            <div className="dashboard-card">
              <Line options={options} data={data} />
            </div>
            <div className="dashboard-card">
              <Line options={options} data={data} />
            </div>
            <div className="dashboard-card">
              <Bar options={options2} data={data2} />
            </div>
            <div className="dashboard-card">
              <Line options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    )
  } 


export default MetricsView