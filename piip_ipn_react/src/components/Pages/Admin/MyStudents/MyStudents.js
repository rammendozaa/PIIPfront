import { useEffect, useState } from 'react';
import DatatablePendingStudents from '../../../Datatable/DatatablePendingStudents'
import Datatable from '../../../Datatable/Datatable'
import './MyStudents.css'

function MyStudents({userData}) {
    const [myStudents, setMyStudents] = useState([]);
    const [pendingStudents, setPendingStudents] = useState([]);

    const getMyStudents = async() => {
        const response = await fetch('/myStudents',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        const data = await response.json()
        setMyStudents(data)
    }
    const getPendingStudents = async() => {
        const response = await fetch('/pendingStudents',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        const data = await response.json()
        setPendingStudents(data)
    }
    useEffect(() => {
        getMyStudents()
    }, []);
    useEffect(() => {
        getPendingStudents()
    }, []);
    useEffect(() => {
        const timer = setInterval(getMyStudents, 2000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        const timer = setInterval(getPendingStudents, 2000);
        return () => clearInterval(timer);
    }, []);

    const assignStudent = (row) => {
        const user_id = pendingStudents[row].id;
        let formData = new FormData();
        formData.append('user_id', user_id);
        fetch('/assign-student',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
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