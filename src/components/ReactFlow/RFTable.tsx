import { Handle, Position } from "reactflow";
import fk_icon from "../../assets/fk_icon.png"; 
import pk_icon from "../../assets/pk_icon.png"; 

export default function RFTable (nodeData: any) {
    const rows: JSX.Element[] = [];
    // console.log("data", data)
    // Columns is an object of columns with their properties
    const columns: {[key:string]: any} = nodeData.data.table[1];
    for (const columnNames in columns){ 
        const handle: JSX.Element[] = [];
        if (columns[columnNames].foreign_key === 'true'){
            handle.push (<Handle type="source" position={Position.Right} id={columnNames} />)
        } else if (columns[columnNames].primary_key === 'true'){
            handle.push( <Handle type="target" position={Position.Left} id={columnNames} />)
        }
          rows.push(
            <tr key={columnNames}>
              <td>{columns[columnNames].primary_key === 'true' ? <img className = 'erd-key-icons' src = {pk_icon}></img> : null }</td>
              <td>{columns[columnNames].foreign_key === 'true' ? <img className = "erd-key-icons"src = {fk_icon} ></img> : null}{handle}</td>
              <td>{columnNames}</td>
              <td>{columns[columnNames].data_type}</td>
              <td>{columns[columnNames].Constraints}</td>
            </tr>
            
          );
    };

    return (
      <>
        <div>
          <div>
            <label className = "erd-titles text-xl  text-indigo-900 text-opacity-70">
              {nodeData.data.table[0]}
            </label>
          </div>
          <div className='erd-table-container'>
            <table className ="erd-table">
              <thead>
                <tr className = 'erd-head-row'>
                  <th>PK</th>
                  <th>FK</th>
                  <th>Column</th>
                  <th>Type</th>
                  <th>Constraints</th>
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