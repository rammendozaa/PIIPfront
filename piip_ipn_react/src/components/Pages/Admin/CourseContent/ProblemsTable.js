import './ProblemsTable.css' 
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IconContext } from 'react-icons';


function ProblemsTable({data, addProblem, removeProblem, add}) {
  return (
    data && 
    <div className='div-table'>
      <table className='content-table'>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map(row => 
                    <tr>
                        <td className='tdd'>
                          {row['title']}
                          <IconContext.Provider value={{ color: "#009879", size: '25px' }}>
                            {
                              add ? <FiPlus onClick={() => addProblem(row)}/> : <FiMinus onClick={() => removeProblem(row)}/>
                            }
                          </IconContext.Provider>
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
