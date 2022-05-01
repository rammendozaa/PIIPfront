import { useSelector, useDispatch } from "react-redux"
import React from 'react'

function MockInterviews() {
    const { interview } = useSelector(state => state.userActivity);
    return (
        <>
            <div className='main-container'>
                <h1>MockInterviews</h1>
            </div>
        </>
    )
}

export default MockInterviews