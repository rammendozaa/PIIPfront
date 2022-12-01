import {useState, useEffect} from "react"
import DatatableMyStudents from '../../../Datatable/DatatableMyStudents'
import './MyStudents.css'

function MyStudentsPage({userData, setUserId}) {
    const [myStudents, setMyStudents] = useState([]);
    const [schools,setSchools] = useState([]);
    useEffect(() => {
        fetch('/schools',{
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setSchools(data)
        });
    },[]);
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
    useEffect(() => {
        getMyStudents()
    }, []);
    useEffect(() => {
        const timer = setInterval(getMyStudents, 2000);
        return () => clearInterval(timer);
    }, []);
    const goToUpdateCourse = (user) => {
        setUserId(user.id)
    }
    return (
        <>
            <h1>My Students</h1>
            <DatatableMyStudents data={myStudents} goToUpdateCourse={goToUpdateCourse} schools={schools}/>
        </>
    )
}
export default MyStudentsPage