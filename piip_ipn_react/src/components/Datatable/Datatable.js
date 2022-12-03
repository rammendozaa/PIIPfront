import './Datatable.css'

function Datatable ({ data, goToUpdateCourse }) {
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
              <th>Update Course</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map(row =>
                    <tr>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.school_id}</td>
                        <td>{row.email}</td>
                        <td><button onClick={() => goToUpdateCourse(row)}>Go</button></td>
                    </tr>
                )
            }
          </tbody>
      </table>
    </div>
  )
}

export default Datatable
