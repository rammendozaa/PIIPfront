import { useState,useEffect } from 'react';
import DatatablePendingStudents from '../DatatablePendingStudents'
import Datatable from '../Datatable'
import './MyStudents.css'

function MyStudents({token}) {
    const [myStudents, setMyStudents] = useState([]);
    const [pendingStudents, setPendingStudents] = useState([]);

    useEffect(() => {
        fetch('/myStudents',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token
            },
        })
        .then(res => res.json())
        .then(data => {
            setMyStudents(data)
        });
    });
    useEffect(() => {
        fetch('/pendingStudents',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token
            },
        })
        .then(res => res.json())
        .then(data => {
            setPendingStudents(data)
        });
    },[]);

    const assignStudent = (row) => {
        const user_id = pendingStudents[row].id;
        let formData = new FormData();
        formData.append('user_id', user_id);
        fetch('/assign-student',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }

    return (
        <>
            <div className="my-students-container">
                <h2>My students</h2>
                <Datatable data={myStudents}/>
                <h2>Pending students</h2>
                <DatatablePendingStudents data={pendingStudents} assignStudent={assignStudent}/>
            </div>
        </>
    );
}
export default MyStudents