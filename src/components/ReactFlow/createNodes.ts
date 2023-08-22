import { Node } from "reactflow"
export default function createNodes(ERDdata: any) {
    const initialNodes: any = []

    let x: number = 0;
    let y: number = 0;
    for (const tableName in ERDdata){
    const columnData = ERDdata[tableName];
    initialNodes.push({
    id: tableName,
    type: 'table',
    position: {x, y},
    data: {table: [tableName, columnData]},
    });

      y += 370;
      if (y > 2000) {
        y = 0;
        x += 600;
      }
    }

    return initialNodes;
};