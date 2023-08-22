import { Handle, Position } from "reactflow";

export default function RFTable (data: any) {

    const rows: JSX.Element[] = [];

    // Columns is an object of columns with their properties
    const columns: {[key:string]: any} = data.table[1];

    for (const columnNames in columns){ 
        let handle: JSX.Element | null = null;
        if (columns[columnNames].foreign_key === 'true'){
            handle = <Handle type="source" position={Position.Right} id={columnNames} />
        } else if (columns[columnNames].primary_key === 'true'){
            handle = <Handle type="target" position={Position.Left} id={columnNames} />
        }
          rows.push(
            <tr key={columnNames}>
              <td>{columnNames}</td>
              <td>{columns[columnNames].data_type}</td>
              <td>{columns[columnNames].Constraints}</td>
              <td>{columns[columnNames].primary_key}</td>
              <td>{columns[columnNames].foreign_key}</td>
              {handle}
            </tr>
          );
    };

    return (
      <>
        <div>
          <div>
            <label>
              {data.table[0]}
            </label>
          </div>
          <div>
            <table>
              <tr>
                <th>Column</th>
                <th>Type</th>
                <th>Constraints</th>
                <th>PK</th>
                <th>FK</th>
              </tr>
              {rows}
            </table>
          </div>
        </div>
      </>
    );
}