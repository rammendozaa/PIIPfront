import './Datatable.css' 

function DatatablePendingStudents({data, assignStudent}) {
    const colums = data[0] && Object.keys(data[0])  
    return (
    <div className='div-table'>
      <table className='content-table'>
          <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>School</th>
                <th>Email</th>
                <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((row,idx) => 
                    <tr>
                        <td>{row['first_name']}</td>
                        <td>{row['last_name']}</td>
                        <td>{row['school_id']}</td>
                        <td>{row['email']}</td>
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
