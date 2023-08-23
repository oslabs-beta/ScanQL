// import { Container } from '@radix-ui/themes';
// import { FaceIcon, ImageIcon, SunIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
// import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
// import DashNav from './DashNav';
// import ConnectDB from './ConnectDB';


import { useAuth0 } from '@auth0/auth0-react';

import Loading from '../ui/Loading';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '../charts/PieChart'
import { DoughnutChart } from '../charts/DoughnutChart'
import { PolarChart } from '../charts/PolarChart';
import { BarGraph } from '../charts/BarGraph';
import { RowsInfoArray, indexTableArray } from '../../types'
import { TableInfo } from '../../store/appStore'
import { useEffect, useState } from 'react';
import useAppStore from '../../store/appStore';
import 'chart.js/auto';
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





const MetricsView: React.FC = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { metricsData } = useAppStore();
  const [rowsData, setRowsData] = useState<RowsInfoArray>([]);
  const [indexData, setIndexData] = useState<indexTableArray>([]);
  const [executionTable, setExecutionTable] = useState<{}[]>([])
  const [executionTableNames, setExecutionTableNames] = useState<string[]>([])

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated])

  useEffect(() => {
    if (!metricsData) return;
    const tablesArray: TableInfo[] = Object.values(metricsData.databaseInfo);
    const executionDataArray: {}[] = Object.values(metricsData.executionPlans);
    const execTableNames: string[] = Object.keys(metricsData.executionPlans);

    if (tablesArray.length) {

      // row chart Data
      const rows = tablesArray.map(table => {
        return {
          tableName: table.tableName,
          numberOfRows: table.numberOfRows,
        }
      })
      setRowsData(rows);

      // index chart Data
      const indexes = tablesArray.map(table => {
        return {
          tableName: table.tableName,
          numberOfIndexes: table.numberOfIndexes,
        }
      })
      setIndexData(indexes);
      // Planning Execution Times component array
      if (executionDataArray.length) setExecutionTable(executionDataArray);
      if (execTableNames.length) setExecutionTableNames(execTableNames);
    }
  }, [metricsData])

  if (isLoading) {
    return <Loading />;
  }
  const pieChartComponents: JSX.Element[] = [];
  for (let i = 0; i < 1; i++) {
    pieChartComponents.push(<PieChart key={i} rowsInfoData={rowsData} />)
  }
  // const polarChartComponents: JSX.Element[] = [];
  // for (let i = 0; i < 1; i++) {
  //   polarChartComponents.push(<PolarChart key={i} rowsInfoData={rowsData} />)
  // }
  const doughnutChartComponent: JSX.Element[] = [];
  for (let i = 0; i < 1; i++) {
    doughnutChartComponent.push(<DoughnutChart key={i} indexData={indexData} />)
  }
  const executionTimes = executionTable.map((table: {}, i: number) => {
    // grab the correct data and pass as props to each component
    return <BarGraph key={i} table={table} tableName={executionTableNames[i]} />
  })

  return (
    <div>
      <div className="dashboard-page">
        <div className="dashboard-container">
          {pieChartComponents}
          {/* {polarChartComponents} */}
          {doughnutChartComponent}
          {executionTimes}
        </div>
      </div>
    </div>
  )
}



export default MetricsView


// metricsData.executionPlans.event.Insert
  // table name will be name of table: name of execution (insert, select, update)