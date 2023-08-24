import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { TableSize } from '../charts/TableSize'
import { RowsPerTable } from '../charts/RowsPerTable'
import { IndexPerTable } from '../charts/IndexPerTable'
import { QueryTimes } from '../charts/QueryTimes';
import { useEffect } from 'react';
import useAppStore from '../../store/appStore';
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
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated])
  
  const { metricsData } = useAppStore();
  
  const executionTableNames: string[] = Object.keys(metricsData.executionPlans);
  const executionTimes = Object.values(metricsData.executionPlans).map((table, i: number) => {
    // grab the correct data and pass as props to each component
    return <QueryTimes key={i} table={table} tableName={executionTableNames[i]} />
  })

  return (
    <>
      <RowsPerTable />
      <IndexPerTable />
      {executionTimes}
      <TableSize />
    </>
  ) 
}

export default MetricsView;