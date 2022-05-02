import {useEffect, useState} from 'react'
import './AddQuiz.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {FaSave} from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import { NewActivity } from '../../../../../src/externalClasses'
const baseURL = "http://127.0.0.1:5000"


function AddQuiz({userData, addActivity, activityIndex, sectionId}) {
    const [quizzes, setQuizzes] = useState([])

    const fetchQuestionnaires = async () => {
        fetch(baseURL + `/questionnaire`,{
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


    const addQuestionnaire = (quiz, index) => {
        const newAct = NewActivity(quiz.title, quiz.description, 6, quiz.id);
        addActivity(newAct, activityIndex, sectionId);
    }

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
}

export default AddQuiz