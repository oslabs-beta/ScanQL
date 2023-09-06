import React from "react";
import useAppStore from "../../store/appStore";
// import { TableInfo } from '../../store/appStore'


export const DBSizeCards: React.FC = () => {
  const { metricsData, toNumInKB } = useAppStore();
  // const tablesArray: TableInfo[] = Object.values(metricsData.databaseInfo);
  // const rows = tablesArray.map(table => {
  //   return {
  //     tableName: table.tableName,
  //     numberOfForeignKeys: table.numberOfForeignKeys,
  //     numberOfFields: table.numberOfFields,
  //   }
  // })
  // total Foreign Keys
  // const totalForeignKeys = rows.reduce((sum, table) => sum + table.numberOfForeignKeys, 0);

  // average Foreign Keys per table
  // const averageForeignKeys = totalForeignKeys / rows.length;

  // console.log(`Total foreign keys: ${totalForeignKeys}`)
  // console.log(`Average number of foreign keys: ${averageForeignKeys}`)

  // total Number of Fields

  // const totalNumberOfFields = rows.reduce((sum, table) => sum + table.numberOfFields, 0);
  
  // const averageNumberOfFields = totalNumberOfFields / rows.length;

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
    <div className="grid-span05">
      <div className="dashboard-card-dbsize">
        <div className="text-card-dbsize">
          <div className="text-sm font-semibold dash-card-titles">Database Size (kbs)</div>
          <p className= "general-metrics-numbers">{databaseSizeTotal}</p>
          </div>
      </div>
      </div>
    </>
  );
}
