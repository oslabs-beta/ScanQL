import { Handle, Position } from "reactflow";

export default function RFTable (nodeData: any) {
    const rows: JSX.Element[] = [];
    // console.log("data", data)
    // Columns is an object of columns with their properties
    const columns: {[key:string]: any} = nodeData.data.table[1];
    for (const columnNames in columns){ 
        const handle: JSX.Element[] = [];
        if (columns[columnNames].foreign_key === 'true'){
            handle.push (<Handle type="source" position={Position.Right} id={columnNames} />)
        } 
        if (columns[columnNames].primary_key === 'true'){
            handle.push( <Handle type="target" position={Position.Left} id={columnNames} />)
        }
        console.log(columns[columnNames].primary_key)
          rows.push(
            <tr key={columnNames}>
              <td>{columnNames}</td>
              <td>{columns[columnNames].data_type}</td>
              <td>{columns[columnNames].Constraints}</td>
              <td>{columns[columnNames].primary_key}</td>
              <td>{columns[columnNames].foreign_key}</td>
              {/* <td>{handle}</td> */}
            </tr>
            
          );
    };

    return (
      <>
        <div>
          <div>
            <label>
              {nodeData.data.table[0]}
            </label>
          </div>
          <div className='erd-table-container'>
            <table className ="erd-table">
              <thead>
                <tr className = 'erd-head-row'>
                  <th>Column</th>
                  <th>Type</th>
                  <th>Constraints</th>
                  <th>PK</th>
                  <th>FK</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}