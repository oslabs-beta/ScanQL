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
      numberOfPrimaryKeys:table.numberOfPrimaryKeys
    }
  })
  // total Foreign Keys
  const totalForeignKeys = rows.reduce((sum, table) => sum + table.numberOfForeignKeys, 0);
  const totalPrimaryKeys = rows.reduce((sum, table) => sum + table.numberOfPrimaryKeys, 0);
  // average Foreign Keys per table
  const averageForeignKeys = (totalForeignKeys / rows.length).toFixed(2);
  const averagePrimaryKeys = (totalPrimaryKeys / rows.length).toFixed(2);
  // console.log(`Total foreign keys: ${totalForeignKeys}`)
  // console.log(`Average number of foreign keys: ${averageForeignKeys}`)

  // total Number of Fields

  const totalNumberOfFields = rows.reduce((sum, table) => sum + table.numberOfFields, 0);
  
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
  
  
  // const tableTags: element[] = tablesArray.map(table => {
  //   return( 
  //     <p className= "general-metrics-numbers"> {`${table.tableName}: ${table.numberOfFields}`}</p>
  //   )
  // })

  

  return (

    <>
      <div className="flex flex-col small-card-35 justify-between">
        <div className="dashboard-card small-card">
          <div className="text-card-custom">
            <div className="text-sm font-semibold dash-card-titles">Total Number Of Tables</div>
            <p className="general-metrics-numbers">{tablesArray.length}</p>
          </div>
        </div>
        <div className="dashboard-card small-card">
          <div className="text-card-custom">
            <div className="text-sm font-semibold dash-card-titles">Total Number Of Fields</div>
            <p className="general-metrics-numbers">{totalNumberOfFields}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col small-card-35 justify-between">
      <div className="dashboard-card small-card">
        <div className="text-card-custom">
          <div className="text-sm font-semibold dash-card-titles"> Avg. Primary Keys Per Table</div>
          <p className="general-metrics-numbers">{averagePrimaryKeys}</p>
        </div>
      </div>
      <div className="dashboard-card small-card h-2/4">
        <div className="text-card-custom">
        <div className="text-sm font-semibold dash-card-titles">Avg. Foreign Keys Per Table</div>
          <p className="general-metrics-numbers">{averageForeignKeys}</p>
        </div>
      </div>
      </div>

    </>
  );
}
{/* <div className="text-sm font-semibold dash-card-titles">Avg. Foreign Keys Per Table</div>
          <p className="general-metrics-numbers">{averageForeignKeys}</p> */}