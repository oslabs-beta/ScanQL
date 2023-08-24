import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { TableSize } from '../charts/TableSize'
import { IndexSizes } from '../charts/IndexSizes';
import { RowsPerTable } from '../charts/RowsPerTable'
import { IndexPerTable } from '../charts/IndexPerTable'
import { GeneralMetrics } from '../charts/GeneralMetrics';
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
    <h1 className='span-all'>General Metrics:</h1>
      <RowsPerTable />
      <IndexPerTable />
      <GeneralMetrics />
    <h1 className='span-all'>Query Execution Time:</h1>
      {executionTimes}
    <h1 className='span-all'>Database Storage:</h1>
      <TableSize />
      <IndexSizes />
    </>
  )
}

export default MetricsView;