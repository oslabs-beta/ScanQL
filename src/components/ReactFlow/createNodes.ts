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

      x += 800; 

      if (x > 2000) {
        x= 0;
        y += 600;
      }
    }

    return initialNodes;
};