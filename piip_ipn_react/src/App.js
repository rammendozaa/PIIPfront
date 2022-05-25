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
import MyInterviews from './components/Pages/Admin/MyInterviews/MyInterviews';
import CreateActivities from './components/Pages/Admin/CreateActivities/CreateActivities';
import MyProfile from './components/Pages/User/MyProfile/MyProfile'
import Quiz from './components/Pages/User/Quiz/Quiz';
import Templates from './components/Pages/SuperAdmin/CourseContent/Templates';
import TemplatesView from './components/Pages/SuperAdmin/CourseContent/TemplatesView';
import SoftSkillQuestion from './components/Pages/User/SoftSkillQuestion/SoftSkillQuestion';

function App() {
  const { userData, setUserData, removeUserData, validUserData } = useUserData();
  return (
    <>
      <Router>
        <Navbar userData={userData} validUserData={validUserData} removeUserData={removeUserData}/>
        <Routes>
          {/*No role*/}
          <Route path='/prueba' exact element={<Prueba/>}/>
          <Route path='/' exact element={<Home userData={userData}/>}/>
          <Route path='*' element={<NotFound/>} />
          <Route path='/log-in' element={<LogIn validUserData={validUserData} setUserData={setUserData}/>}/>
          <Route path='/sign-up' element={<SignUp validUserData={validUserData} setUserData={setUserData}/>}/>
          {/*Mentor, User, Super*/}
          <Route path='/topic/:topic_type/:topic_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user","mentor"]}><Topic userData={userData}/></PrivateRoute>} />
          <Route path='/problem/:problem_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user","mentor"]}><Problem userData={userData}/></PrivateRoute>} />
          <Route path='/problems' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user","mentor"]}><Problems userData={userData}/></PrivateRoute>}/>
          <Route path='/topics' exact element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user","mentor"]}><Topics userData={userData}/></PrivateRoute>}/>
          <Route path='/soft-skill/:soft_topic_id' exact element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user","mentor"]}><SoftSkills userData={userData}/></PrivateRoute>}/>
          <Route path='/solve-quiz/:quiz_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user", "mentor"]}><Quiz userData={userData}/></PrivateRoute>} />          
          <Route path='/soft-skill-question/:question_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user", "mentor"]}><SoftSkillQuestion userData={userData}/></PrivateRoute>} />          
          <Route path='/mock-interviews/:interview_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["super", "user", "mentor"]}><MockInterviews userData={userData}/></PrivateRoute>}/>
          {/*User*/}
          <Route path='/company-tracking' exact element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user"]}><CompanyTracking userData={userData}/></PrivateRoute>}/>
          <Route path='/my-course' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user"]}><MyCourseContent userData={userData}/></PrivateRoute>} />
          <Route path='/my-profile' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["user"]}><MyProfile userData={userData}/></PrivateRoute>} />
          {/*Mentor*/}
          <Route path='/update-course/:user_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor", "super"]}><CourseContent userData={userData}/></PrivateRoute>} />   
          <Route path='/add-topic' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor","super"]}><AddTopic/></PrivateRoute>} />
          <Route path='/my-students' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor", "super"]}><MyStudents userData={userData}/></PrivateRoute>} />          
          <Route path='/create-activity' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor", "super"]}><CreateActivities userData={userData}/></PrivateRoute>} />
          <Route path='/my-interviews' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor","super"]}><MyInterviews userData={userData}/></PrivateRoute>} />          
          {/*SuperAdmin*/}
          <Route path='/templates-view' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor", "super"]}><TemplatesView userData={userData}/></PrivateRoute>} />          
          <Route path='/templates/:template_id' element={<PrivateRoute userData={userData} validUserData={validUserData} validRoles={["mentor","super"]}><Templates userData={userData}/></PrivateRoute>} />          
        </Routes>
      </Router>
    </>
  );
}

export default App;