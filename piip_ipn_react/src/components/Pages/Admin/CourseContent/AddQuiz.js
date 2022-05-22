import './AddQuiz.css'
import { NewActivity } from '../../../../../src/externalClasses'
import {useState, useEffect} from 'react'
import Cards from './Cards'
const baseURL = "http://127.0.0.1:5000"


function AddQuiz({userData, addActivity, activityIndex, sectionId, userId}) {
    const [quizzes, setQuizzes] = useState([])

    const fetchQuestionnaires = async () => {
        fetch(baseURL + `/questionnaire?user_id=${userId}`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setQuizzes(data)
        })
    }
    useEffect(() => {
        fetchQuestionnaires()
    }, []);

    function search(rows){
        console.log(rows);
        return rows.filter(
            row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    const [query, setQuery] = useState("");

    const addQuestionnaire = (quiz, index) => {
        const newAct = NewActivity(quiz.title, quiz.description, 6, quiz.id);
        addActivity(newAct, activityIndex, sectionId);
    }

    return (
        <>
            <div className='see-topics-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i> 
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                </div>
                <Cards data={search(quizzes)} execute={addQuestionnaire}/>
            </div>
        </>
    )
    /*
    return (
        <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Available questionnaires</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quizzes.map((quiz, index) => 
                            <tr>
                                <td className='tdd'>
                                {quiz['title']}
                                <IconContext.Provider value={{ color: "#009879", size: '25px' }}>
                                    {
                                    <FiPlus onClick={() => addQuestionnaire(quiz, index)}/>
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
    */
}

export default AddQuiz