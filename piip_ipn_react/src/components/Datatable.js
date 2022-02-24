import './Datatable.css' 

function Datatable({data}) {
    const colums = data[0] && Object.keys(data[0])
  return (
    <div className='div-table'>
      <table className='content-table'>
          <thead>
            <tr>{data[0] && colums.map(heading => <th>{heading}</th>)}</tr>
          </thead>
          <tbody>
            {
                data.map(row => 
                    <tr>
                        {colums.map(colum => <td>{row[colum]}</td>)}
                    </tr>
                )
            }
          </tbody>
      </table>
    </div>
  );
}

export default Datatable;
