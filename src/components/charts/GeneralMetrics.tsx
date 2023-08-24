import React from "react";
import useAppStore from "../../store/appStore";
import { TableInfo } from '../../store/appStore'


export const GeneralMetrics: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();
  const tablesArray: TableInfo[] = Object.values(metricsData.databaseInfo);
  const rows = tablesArray.map(table => {
    return {
      tableName: table.tableName,
      numberOfForeignKeys: table.numberOfForeignKeys,
      numberOfFields: table.numberOfFields,
    }
  })
  // total Foreign Keys
  const totalForeignKeys = rows.reduce((sum, table) => sum + table.numberOfForeignKeys, 0);

  // average Foreign Keys per table
  const averageForeignKeys = totalForeignKeys / rows.length;

  // console.log(`Total foreign keys: ${totalForeignKeys}`)
  // console.log(`Average number of foreign keys: ${averageForeignKeys}`)

  // total Number of Fields

  const totalNumberOfFields = rows.reduce((sum, table) => sum + table.numberOfFields, 0);
  
  const averageNumberOfFields = totalNumberOfFields / rows.length;

  // console.log(`Total foreign keys: ${totalNumberOfFields}`)
  // console.log(`Average number of foreign keys: ${averageNumberOfFields}`)

    // total Database Size
    const databaseSizeTotal = toNumInKB(metricsData.dbSizeMetrics.totalDatabaseSize);
    console.log('databaseSizeTotal', databaseSizeTotal)
  
    // Active Connections
    const activeConnections = metricsData.dbSizeMetrics.activeConnections;
    console.log('activeConnections', activeConnections)
  
    console.log('metricsData', metricsData);


  return (

    <>
      <div className="dashboard-card">
        <div className="text-card">
          <div className="text-sm font-semibold">Total Database Size (kb)</div>
          <p className="text-violet-500">{databaseSizeTotal}</p>
          </div>
      </div>
      
      <div className="dashboard-card">
        <div className="text-card">
          <div className="text-sm font-semibold">Total Number Of Fields</div>
          <p className="text-violet-500">{totalNumberOfFields}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="text-card">
          <div className="text-sm font-semibold">Active Connections</div>
          <p className="text-violet-500">{activeConnections}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="text-card">
          <div className="text-sm font-semibold">Average Foreign Keys Per Table</div>
          <p className="text-violet-500">{averageForeignKeys}</p>
        </div>
      </div>
    </>
  );
}
