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
} from "chart.js";
import { ColumnIndexSizes } from "../charts/ColumnIndexSizes";
import { MetricsSeparator } from "../ui/MetricsSeparator";
import { ExecTimesByOperation } from "../charts/execTimeByOperation";
import { SlowestQueriesTop10 } from "../charts/SlowestQueriesTop10";
import { SlowestCommonQueriesTop10 } from "../charts/SlowestCommonQueriesTop10";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { DBSizeCards } from '../charts/DbSizeCards';

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
  const { isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    const { metricsData, uri, connectToDatabase, dbName } = useAppStore();

    const handleClick = (): void => {
        connectToDatabase(uri, dbName);
      }

    const executionTableNames: string[] = Object.keys(
        metricsData.executionPlans
    );
    const executionTimes = Object.values(metricsData.executionPlans).map(
        (table, i: number) => {
            // grab the correct data and pass as props to each component
            return (
                <QueryTimes
                    key={i}
                    table={table}
                    tableName={executionTableNames[i]}
                />
            );
        }
    );

  return (
    <>
      <div className="span-all2">
        <MetricsSeparator title={"Database Overview"} />
          <Button>
            <UpdateIcon
              onClick={() => {
                handleClick();
              }} 
              className="text-white " 
              width={25} 
              height={25}
            />
          </Button>
      </div>
      <GeneralMetrics />
      <RowsPerTable />
      <IndexPerTable />
      <MetricsSeparator title={'Database Size'}/>
      <TableSize />
      <TableIndexSizes />
      <ColumnIndexSizes />
      <DBSizeCards/>
      <MetricsSeparator title={'Past Query Performance'}/>
      <ExecTimesByOperation/>
      <SlowestQueriesTop10/>
      <SlowestCommonQueriesTop10/>
      <MetricsSeparator title={'Query Execution Time'}/>
      {executionTimes}
    </>
  )
}

export default MetricsView;
