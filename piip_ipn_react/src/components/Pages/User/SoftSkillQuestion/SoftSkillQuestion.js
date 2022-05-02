import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development';

function SoftSkillQuestion({userData}) {
    const navigate = useNavigate();
    const userId = userData.user_id;
    const {activity} = useSelector(state => state.userActivity);
    const {question_id} = useParams();
    const [question, setQuestion] = useState("Is this a question?");
    
    useEffect(() => {
        if ((activity !== undefined && activity !== null) && activity["question"]) {
            setQuestion(activity["question"])
        } else {
            fetch(`/soft-skill-question?questionId=${question_id}`, {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => {
                setQuestion(data["question"])
            })
        }
    }, []);


    return (
        <>
            <div className='main-container'>
                <h1>SoftSkillQuestion</h1>
            </div>
        </>
    )
}

export default SoftSkillQuestion