import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { TableSize } from '../charts/TableSize'
import { TableIndexSizes } from '../charts/TableIndexSizes';
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
import { ColumnIndexSizes } from '../charts/ColumnIndexSizes';
import { MetricsSeparator } from '../ui/MetricsSeparator';
import { ExecTimesByOperation } from '../charts/execTimeByOperation';
import { SlowestQueriesTop10 } from '../charts/SlowestQueriesTop10';
import { SlowestCommonQueriesTop10 } from '../charts/SlowestCommonQueriesTop10';

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
  // throw new Error('Metrics view Crashed!')
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]); // added navigate to array to remove warning

  const { metricsData } = useAppStore();

  const executionTableNames: string[] = Object.keys(metricsData.executionPlans);
  const executionTimes = Object.values(metricsData.executionPlans).map((table, i: number) => {
    // grab the correct data and pass as props to each component
    return <QueryTimes key={i} table={table} tableName={executionTableNames[i]} />

  })

  return (
    <>
      {/* <h3 className='span-all'>General Metrics:</h3> */}
      <MetricsSeparator title={'General Metrics'}/>
      <RowsPerTable />
      <IndexPerTable />
      <GeneralMetrics />
      <MetricsSeparator title={'Query Execution Time'}/>
      {executionTimes}
      <MetricsSeparator title={'Database Size'}/>
      <TableSize />
      <TableIndexSizes />
      <ColumnIndexSizes />
      <MetricsSeparator title={'Performance Statistices to-date'}/>
      <ExecTimesByOperation/>
      <SlowestQueriesTop10/>
      <SlowestCommonQueriesTop10/>


    </>
  )
}

export default MetricsView;