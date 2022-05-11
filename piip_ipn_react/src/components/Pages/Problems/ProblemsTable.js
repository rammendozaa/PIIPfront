import './ProblemsTable.css' 

function ProblemsTable({data, goToProblem}) {
  const cleanTags = (tags) => {
    return tags
  }
  return (
    data && 
    <div className='div-table'>
      <table className='content-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Tags</th>
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
                          {cleanTags(row['tags'])}
                        </td>
                        <td onClick={() => goToProblem(row)}>
                          {row['solution']}
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
