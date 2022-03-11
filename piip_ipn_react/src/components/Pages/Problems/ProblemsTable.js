import './ProblemsTable.css' 

function ProblemsTable({data, goToProblem}) {
  return (
    data && 
    <div className='div-table'>
      <table className='content-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map(row => 
                    <tr>
                        <td onClick={() => goToProblem(row)}>
                          {row['title']}
                        </td>
                        <td onClick={() => goToProblem(row)}>
                          {row['difficulty']}
                        </td>
                    </tr>
                )
            }
          </tbody>
      </table>
    </div>
  );
}

export default ProblemsTable;
