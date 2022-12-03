import './ProblemsTable.css'

function ProblemsTable ({ data, goToProblem }) {
  return (
    data &&
    <div className='div-table'>
      <table className='content-table'>
          <thead className='content-table-header'>
            <tr>
              <th>Title</th>
              <th>Tags</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0
                ? (
                    data.map(row =>
                    <tr>
                        <td onClick={() => goToProblem(row)}>
                          {row.title}
                        </td>
                        <td onClick={() => goToProblem(row)}>
                          <ul style={{ 'list-style-type': 'none' }}>
                            {
                              row.tags.map((row) =>
                                <li>{row}</li>
                              )
                            }
                          </ul>
                        </td>
                        <td onClick={() => goToProblem(row)}>
                          {row.solution}
                        </td>
                    </tr>
                    )
                  )
                : (
                <tr>
                  <td>Problem not found</td>
                  <td></td>
                  <td></td>
                </tr>
                  )
            }
          </tbody>
      </table>
    </div>
  )
}

export default ProblemsTable
