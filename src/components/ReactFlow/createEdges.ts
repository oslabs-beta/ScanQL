import { table } from "console";
import { Edge } from "reactflow";
export default function createEdges(ERDdata: any) {
    // ERDdata is an object of tables
  const initialEdges:Edge[] =  [];
  for (const tableName in ERDdata){
    const ColumnData = ERDdata[tableName]
    for (const columns in ColumnData){
        if (ColumnData[columns].primary_key === 'true'){
            const target = tableName;
            ColumnData[columns].foreign_tables.forEach((element: string) => {
              const source = element;
              initialEdges.push({
                id: `${source}-${target}`,
                source: source,
                target: target,
                style: {
                  strokeWidth: 2,
                  stroke: '#535D71',
                },
                markerEnd: {
                  type: 'arrowclosed',
                  width: 20,
                  height: 20,
                  color: '#535D71',
                },
              });
            });
        }
    }
  }
  // console.log(initialEdges)
  return initialEdges;
};  