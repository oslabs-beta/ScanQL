import React from "react";
import useAppStore from "../../store/appStore";
import { CustomTableInfo } from '../../store/appStore'


export const CustomQueryGeneralMetrics: React.FC = () => {
  const { customQueryData } = useAppStore();
  const tablesObject: CustomTableInfo = {
    nodeType: customQueryData.nodeType,
    actualRows: customQueryData.actualRows,
    actualLoops: customQueryData.actualLoops,
    sharedHitBlocks: customQueryData.sharedHitBlocks,
    sharedReadBlocks: customQueryData.sharedReadBlocks,
    totalCosts: customQueryData.totalCosts,
    startUpCosts: customQueryData.startUpCosts,
  };
  // const rows = tablesArray.map(table => {
  //   return {
  //     tableName: table.tableName,
  //     numberOfForeignKeys: table.numberOfForeignKeys,
  //     numberOfFields: table.numberOfFields,
  //   }
  // })





  return (

    <>
      <div className="custom-query-cards">
        <div className="text-card-custom">
          <div className="text-sm font-semibold dash-card-titles">Type of Scan</div>
          <p className="custom-metrics-numbers-single">{tablesObject.nodeType}</p>
        </div>
      </div>
      <div className="custom-query-cards">
        <div className="text-card-custom">
          <div className="text-sm font-semibold dash-card-titles">Number of Rows</div>
          <p className="custom-metrics-numbers-double">{tablesObject.actualRows}</p>
          <div className="text-sm font-semibold dash-card-titles">Number of Loops</div>
          <p className="custom-metrics-numbers-double">{tablesObject.actualLoops}</p>
        </div>
      </div>
      <div className="custom-query-cards">
        <div className="text-card-custom">
          <div className="text-sm font-semibold dash-card-titles">Shared Hit Blocks</div>
          <p className="custom-metrics-numbers-double">{tablesObject.sharedHitBlocks}</p>
          <div className="text-sm font-semibold dash-card-titles">Shared Read Blocks</div>
          <p className="custom-metrics-numbers-double">{tablesObject.sharedReadBlocks}</p>
        </div>
      </div>
      <div className="custom-query-cards">
        <div className="text-card-custom">
          <div className="text-sm font-semibold dash-card-titles">Start Up Costs</div>
          <p className="custom-metrics-numbers-double">{tablesObject.startUpCosts}</p>
          <div className="text-sm font-semibold dash-card-titles">Total Costs</div>
          <p className="custom-metrics-numbers-double">{tablesObject.totalCosts}</p>
        </div>
      </div>
    </>
  );
}
