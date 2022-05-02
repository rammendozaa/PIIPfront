import {useEffect, useState} from 'react'
import './SeeSoftSkillQuestions.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {FaSave} from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import { NewActivity } from '../../../../../src/externalClasses'
const baseURL = "http://127.0.0.1:5000"

function SeeSoftSkillQuestions({userData, addActivity, activityIndex, sectionId}) {
    const [questions, setQuestions] = useState([])

    const fetchSoftSkillQuestions = async() => {
        fetch(baseURL + `/soft-skill-question`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setQuestions(data)
        })
    }
    useEffect(() => {
        fetchSoftSkillQuestions()
    }, []);

    const addSoftSkillQuestion = (question, index) => {
        const newAct = NewActivity(question.title, "desc", 3, question.id);
        addActivity(newAct, activityIndex, sectionId);
    }

    return (
        <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Soft Skills Questions:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) => 
                            <tr>
                                <td className='tdd'>
                                {question['title']}
                                <IconContext.Provider value={{ color: "#009879", size: '25px' }}>
                                    {
                                    <FiPlus onClick={() => addSoftSkillQuestion(question, index)}/>
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

export default SeeSoftSkillQuestions