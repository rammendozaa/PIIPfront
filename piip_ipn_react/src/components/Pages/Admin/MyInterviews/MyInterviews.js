import { useDispatch } from "react-redux"
import {useState} from 'react'
import React, {useEffect} from 'react'
import { ActivityInfo } from '../../../../externalClasses';
import { setUserActivityInfo } from '../../../../state/reducers/activity';
import { useNavigate } from "react-router-dom";
import "./MyInterviews.css"

const baseURL = "http://127.0.0.1:5000"


function MyInterviews({userData}) {
    const [interviews, setInterviews] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(baseURL + `/interview?admin_id=${userData.user_id}`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setInterviews(data);
        });
    }, []);

    const handleClick = (interview) => {
        const activityInfo = ActivityInfo(
            interview.id,
            1,
            interview,
            interview,
            interview,
        );
        dispatch(setUserActivityInfo(activityInfo));
        navigate(`/mock-interviews/${interview.id}`);
    }

    return (
        <>
            <div className='my-interviews-container'>
                <div className="my-interviews">
                    {interviews.length > 0 && (<>
                        <h1 className='interview-title'>Here are you're pending interviews.</h1>
                            {interviews.map((interview, indexInterview) => {
                            return (
                                    <>
                        <div className='Container'>
                                    <div>
                                        <h1 onClick={() => handleClick(interview)}>{interview.user.first_name}</h1>
                                    </div>
                        </div>
                                    </>
                                )
                            })}
                        </>)
                    }
                    {interviews.length == 0 &&
                        <h1 className='interview-title'>You don't have any pending interviews!</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default MyInterviews