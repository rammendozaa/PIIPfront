import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import { useSelector } from "react-redux"

const baseURL = "http://127.0.0.1:5000"

function MockInterviews({userData}) {
    const {activity} = useSelector(state => state.userActivity);
    const [interviewInfo, setInterviewInfo] = useState({"feedback": null,
    "interviewCode": null,
    "chosenDate": "2022-05-18T21:36:40",
    "isConfirmed": false,
    "administratorId": 1,
    "isActive": true,
    "id": 2,
    "interview_type_id": 1,
    "languageId": null,
    "userId": 2,
    "comment": "this is a comment",
    "interviewUrl": null,
    "user": {
        "email": "prueba@yahoo.com",
        "school_id": "5",
        "last_name": "prueba",
        "id": "2",
        "first_name": "prueba"
    }});
    const {interview_id} = useParams();
    useEffect(() => {
        if ((activity !== undefined && activity !== null)) {
            setInterviewInfo(activity["activity"])
        } else {
            fetch(`/interview?interview_id=${interview_id}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(data => {
                setInterviewInfo(data)
            });
        }
        console.log(activity);
        console.log(interviewInfo);
    }, [])
    const saveInterviewChanges = async ({
        chosen_date,
        chosen_comment,
        interview_url,
        interview_code,
        new_feedback,
        is_confirmed,
    }) => {
        const chosenDate = chosen_date
        const comment = chosen_comment
        const interviewURL = interview_url
        const interviewCode = interview_code
        const feedback = new_feedback
        const isConfirmed = is_confirmed

        await fetch(
            baseURL + `/interview?interview_id=${interviewInfo["id"]}&user_id=${interviewInfo["userId"]}&role=${userData.role}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "chosenDate": chosenDate,
                    "comment": comment,
                    "interviewUrl": interviewURL,
                    "interviewCode": interviewCode,
                    "feedback": feedback,
                    "isConfirmed": isConfirmed,
                }),
            })
    }

    function AdminInterview({interviewInfo}){
        const chosenDate = interviewInfo["chosenDate"];
        const isConfirmed = interviewInfo["isConfirmed"];
        const feedback = interviewInfo["feedback"];
        const url = interviewInfo["interviewUrl"];
        const comm = interviewInfo["comment"];
        const code = interviewInfo["interviewCode"];
        const [isChecked, setChecked] = useState(Boolean(isConfirmed));
        const [chosenCalendarDate, setChosenDate] = useState((chosenDate !== null && chosenDate !== undefined) ? new Date(chosenDate) : new Date());
        const [comment, setComment] = useState(comm);
        const [interviewURL, setInterviewURL] = useState(url);
        const [interviewFeedback, setInterviewFeedback] = useState(feedback);
        const [interviewCode, setInterviewCode] = useState(code);
        const saveChanges = async() => {
            await saveInterviewChanges({
                chosen_date:chosenCalendarDate,
                chosen_comment:comment,
                is_confirmed:isChecked,
                interview_url:interviewURL,
                new_feedback:interviewFeedback,
                interview_code:interviewCode,
            });
        }
//        return <></>
        return (
            <>
                {isConfirmed === true &&
                    <div>
                    <h1>Date for interview: {chosenCalendarDate}</h1>
                    </div>
                }
                {isConfirmed === false &&
                    <div>
                        <h1>Choose a date for your interview:</h1>
                        <div><DateTimePicker onChange={setChosenDate} value={chosenCalendarDate}/></div>
                    </div>}
                {interviewURL === null &&
                <>
                    <h1>Add a link for your upcoming interview:</h1>
                    <textarea
                        id="comment"
                        value={interviewURL}
                        onChange={(e) => setInterviewURL(e.target.value)}>
                    </textarea>
                </>
                }
                {url !== null &&
                <>
                <h1>Upcoming interview link: {url}</h1>
                </>
                }
                {comm !== null &&
                <div><h1>Last interaction:</h1><h2>{comm}</h2></div>
                }
                {interviewFeedback === null &&
                <>
                    <h1>Add some feedback for this user based on your interview:</h1>
                    <textarea
                        id="comment"
                        value={interviewFeedback}
                        onChange={(e) => setInterviewFeedback(e.target.value)}>
                    </textarea>
                </>
                }
                {interviewFeedback !== null &&
                    <>
                    <h1>This is the feedback you submitted: <p>{url}</p></h1>
                    </>
                }
                {interviewCode === null &&
                <>
                    <h1>Add the code written here:</h1>
                    <textarea
                        id="comment"
                        value={interviewCode}
                        onChange={(e) => setInterviewCode(e.target.value)}>
                    </textarea>
                </>
                }
                {isConfirmed === false &&
                <label>
                    <input
                        type="checkbox"
                        onChange={() => {setChecked(!isChecked)}}
                        />
                    Confirm interview?
                </label>
                }
                <div>
                    <h2>Comments or questions?</h2>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                </div>
                <button onClick={() => saveChanges()}>Save interview info</button>
                <button onClick={() => saveChanges()}>Go back to my pending interviews</button>
            </>
        )
    }

    function UserInterview({interviewInfo}) {
        const navigate = useNavigate()
        const isConfirmed = interviewInfo["isConfirmed"]
        const feedback = interviewInfo["feedback"]
        const comm = interviewInfo["comment"]
        const chosenDate = interviewInfo["chosenDate"]
        const [chosenCalendarDate, setChosenDate] = useState(new Date(chosenDate))
        const [comment, setComment] = useState(comm)
        if (chosenCalendarDate === null) {
            setChosenDate(new Date())
        }
        const saveChanges = async() => {
            await saveInterviewChanges({
                chosen_date:chosenCalendarDate,
                chosen_comment:comment,
                is_confirmed:isConfirmed,
            });
        }
        return (
            <>
                {isConfirmed === true && feedback === null &&
                <div>
                    <h1>The interview will be held here: {interviewInfo["interview_url"]}</h1>
                    <h1>At this date: {chosenCalendarDate}</h1>
                </div>}
                {feedback !== null &&
                    <div>
                        <h1>Feedback for you: <p>{feedback}</p></h1>
                    </div>
                }
                {comm !== null &&
                <div><h1>Last interaction:</h1><h2>{comm}</h2></div>
                }
                {isConfirmed === false &&
                <div>
                    <h1>Choose a date for your interview:</h1>
                    <div><DateTimePicker onChange={setChosenDate} value={chosenCalendarDate}/></div>
                </div>}
                <div>
                    <h2>Comments or questions?</h2>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                </div>
                <button onClick={() => saveChanges()}>Save interview info</button>
                <button onClick={() => navigate(`/my-course`)}>Go back to my course</button>
            </>
        )
    }


    return (
        <>
            <div className='mock-interviews-container'>

            </div>
            <div className='Container'>
                {userData.role === "user" &&
                    <>
                        <h1>View the details of your upcoming interview</h1>
                        <UserInterview interviewInfo={interviewInfo}/>
                    </>
                }
                {userData.role !== "user" &&
                    <>
                        <h1>View the details of this interview:</h1>
                        <AdminInterview interviewInfo={interviewInfo}/>
                    </>
                }
            </div>
        </>
    )
}

export default MockInterviews