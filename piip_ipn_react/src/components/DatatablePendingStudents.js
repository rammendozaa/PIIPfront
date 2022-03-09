import './Datatable.css' 

function DatatablePendingStudents({data, assignStudent}) {
    const colums = data[0] && Object.keys(data[0])  
    return (
    <div className='div-table'>
      <table className='content-table'>
          <thead>
            <tr>
                {data[0] && colums.map(heading => <th>{heading}</th>)}
                <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((row,idx) => 
                    <tr>
                        {
                            colums.map(colum => <td>{row[colum]}</td>)
                        }
                        <td>
                            <button onClick={() => assignStudent(idx)}>Add</button>
                        </td>
                    </tr>
                )
            }
          </tbody>
      </table>
    </div>
    );
}

export default DatatablePendingStudents;
