import React from "react";
import useAppStore from "../../store/appStore";
import { TableInfo } from '../../store/appStore'


export const GeneralMetrics: React.FC = () => {
  const { metricsData } = useAppStore();
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


  return (

    <>
      <div className="dashboard-card">
        <h3 >Average Foreign Keys Per Table</h3>
        <p>{averageForeignKeys}</p>
        {/* {totalForeignKeys} */}
      </div>
      <div className="dashboard-card">
        <h3>Total Number Of Fields</h3>
        {totalNumberOfFields}
        {/* {totalForeignKeys} */}
      </div>
    </>
  );
}
