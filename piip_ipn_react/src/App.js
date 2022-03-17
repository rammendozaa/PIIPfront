import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Pages/Home/Home'
import Problems from './components/Pages/Problems/Problems'
import Topics from './components/Pages/Topics/Topics'
import MockInterviews from './components/Pages/User/MockInterviews/MockInterviews'
import SoftSkills from './components/Pages/SoftSkills/SoftSkills'
import CompanyTracking from './components/Pages/User/CompanyTracking/CompanyTracking'
import LogIn from './components/Pages/LogIn/LogIn'
import SignUp from './components/Pages/SignUp/SignUp'
import Topic from './components/Pages/Topic/Topic'
import Problem from './components/Pages/Problem/Problem'
import Prueba from './components/Pages/Problem/Prueba'
import MyCourseContent from './components/Pages/User/MyCourseContent/MyCourseContent'
import CourseContent from './components/Pages/Admin/CourseContent/CourseContent';
import NotFound from './components/Pages/NotFound';
import useUserData from './components/useUserData';
import PrivateRoute from './components/PrivateRoute';
import AddTopic from './components/Pages/Admin/AddTopic/AddTopic'
import MyStudents from './components/Pages/Admin/MyStudents/MyStudents';

function App() {
  const { userData, setUserData, removeUserData, validUserData } = useUserData();
  return (
    <>
      <Router>
        <Navbar userData={userData} validUserData={validUserData} removeUserData={removeUserData}/>
        <Routes>
          {/*No role*/}
          <Route path='/prueba' exact element={<Prueba/>}/>
          <Route path='/' exact element={<Home/>}/>
          <Route path='*' element={<NotFound/>} />
          <Route path='/log-in' element={<LogIn validUserData={validUserData} setUserData={setUserData}/>}/>
          <Route path='/sign-up' element={<SignUp validUserData={validUserData} setUserData={setUserData}/>}/>
          {/*Mentor, User*/}
          <Route path='/topic' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user","mentor"]}><Topic/></PrivateRoute>} />
          <Route path='/problem/:problem_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user","mentor"]}><Problem userData={userData}/></PrivateRoute>} />
          <Route path='/problems' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user","mentor"]}><Problems userData={userData}/></PrivateRoute>}/>
          <Route path='/topics' exact element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user","mentor"]}><Topics/></PrivateRoute>}/>
          <Route path='/soft-skills' exact element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user","mentor"]}><SoftSkills/></PrivateRoute>}/>
          {/*User*/}
          <Route path='/mock-interviews' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user"]}><MockInterviews/></PrivateRoute>}/>
          <Route path='/company-tracking' exact element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user"]}><CompanyTracking/></PrivateRoute>}/>
          <Route path='/my-course' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user"]}><MyCourseContent userData={userData}/></PrivateRoute>} />
          {/*Mentor*/}
          <Route path='/update-course/:user_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor"]}><CourseContent userData={userData}/></PrivateRoute>} />   
          <Route path='/add-topic' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor"]}><AddTopic/></PrivateRoute>} />
          <Route path='/my-students' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor"]}><MyStudents userData={userData}/></PrivateRoute>} />          
        </Routes>
      </Router>
    </>
  );
}

export default App;