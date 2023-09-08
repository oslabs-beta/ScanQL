import React from "react";
import useAppStore from "../../store/appStore";
// import { TableInfo } from '../../store/appStore'


export const DBSizeCards: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();

    // total Database Size
    const databaseSizeTotal = toNumInKB(metricsData.dbSizeMetrics.totalDatabaseSize);
    console.log('databaseSizeTotal', databaseSizeTotal)
  
    // Active Connections
    const activeConnections = metricsData.dbSizeMetrics.activeConnections;
    console.log('activeConnections', activeConnections)
  
    console.log('metricsData', metricsData);


  return (

    <>

      <div className="dashboard-card db-size-card">
        <div className="text-card-dbsize">
          <div className="text-sm font-semibold dash-card-titles">Database Size (kbs)</div>
          <p className= "general-metrics-numbers">{databaseSizeTotal}</p>
          </div>
      </div>
    </>
  );
}
