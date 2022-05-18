import './Datatable.css' 

function DatatablePendingStudents({data, assignStudent, schools}) {
    const colums = data[0] && Object.keys(data[0]) 
    const getSchoolName = (idx) => {
        for (var i = 0; i < schools.length; i++){
            if(schools[i]['id'] == idx){
                return schools[i]['name'];
            }
        }
        return "School not found"
    }
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
                data.length > 0 ? 
                    data.map((row,idx) => 
                        <tr>
                            <td>{row['first_name']}</td>
                            <td>{row['last_name']}</td>
                            <td>
                                {
                                    getSchoolName(row['school_id'])
                                }
                            </td>
                            <td>{row['email']}</td>
                            <td>
                                <button className='btn-create-activities3' onClick={() => assignStudent(idx)}>Add</button>
                            </td>
                        </tr>
                    )
                :
                <tr>
                    <td>There is no pending students</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            }
          </tbody>
      </table>
    </div>
    );
}

export default DatatablePendingStudents;
