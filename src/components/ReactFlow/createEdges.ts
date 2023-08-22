import { Edge } from "reactflow";

export default function createEdges(ERDdata: any) {
    // ERDdata is an object of tables
    const initialEdges:Edge[] =  [];

    for (const tables in ERDdata){
        if (ERDdata[tables].primary_key === true){
            const target = ERDdata[tables];

            ERDdata[tables].foreign_tables.forEach((element: string) => {
                const source = element
                initialEdges.push(
                {id:'1', source: source, target:target}
            )
            });
        }
    }
    return initialEdges;
};