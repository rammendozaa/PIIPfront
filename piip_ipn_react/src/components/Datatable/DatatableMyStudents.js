import './Datatable.css'

function DatatableMyStudents ({ data, goToUpdateCourse, schools }) {
  const colums = data[0] && Object.keys(data[0])
  const getSchoolName = (idx) => {
    for (let i = 0; i < schools.length; i++) {
      if (schools[i].id == idx) {
        return schools[i].name
      }
    }
    return 'School not found'
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
                <th>Update Course</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(row =>
                        <tr>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{getSchoolName(row.school_id)}</td>
                            <td>{row.email}</td>
                            <td><button className='btn-create-activities3' onClick={() => goToUpdateCourse(row)}>Go</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
  )
}

export default DatatableMyStudents
