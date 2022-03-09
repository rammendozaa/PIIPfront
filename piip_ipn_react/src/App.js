import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/pages/Home.js'
import Problems from './components/pages/Problems.js'
import Topics from './components/pages/Topics.js'
import MockInterviews from './components/pages/MockInterviews.js'
import SoftSkills from './components/pages/SoftSkills.js'
import CompanyTracking from './components/pages/CompanyTracking.js'
import LogIn from './components/pages/LogIn.js'
import SignUp from './components/pages/SignUp.js'
import Topic from './components/pages/Topic.js'
import Problem from './components/pages/Problem.js'
import CourseContent from './components/pages/CourseContent';
import NotFound from './components/pages/NotFound';
import useToken from './components/useToken';
import PrivateRoute from './components/PrivateRoute';
import AddTopic from './components/pages/AddTopic'
import MyStudents from './components/pages/MyStudents';

function App() {
  const { token, setToken, removeToken, validToken, role, setRole } = useToken();
  return (
    <>
      <Router>
        <Navbar validToken={validToken} removeToken={removeToken} role={role} />
        <Routes>
          {/*No role*/}
          <Route path='/' exact element={<Home/>}/>
          <Route path='*' element={<NotFound/>} />
          <Route path='/log-in' element={<LogIn validToken={validToken} setToken={setToken} setRole={setRole}/>}/>
          <Route path='/sign-up' element={<SignUp validToken={validToken} setToken={setToken} setRole={setRole}/>}/>
          {/*Mentor, User*/}
          <Route path='/topic' element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><Topic/></PrivateRoute>} />
          <Route path='/problem' element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><Problem/></PrivateRoute>} />
          <Route path='/problems' element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><Problems token={token}/></PrivateRoute>}/>
          <Route path='/topics' exact element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><Topics/></PrivateRoute>}/>
          <Route path='/soft-skills' exact element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><SoftSkills/></PrivateRoute>}/>
          {/*User*/}
          <Route path='/mock-interviews' element={<PrivateRoute validToken={validToken} validRoles={["user"]} role={role}><MockInterviews/></PrivateRoute>}/>
          <Route path='/company-tracking' exact element={<PrivateRoute validToken={validToken} validRoles={["user"]} role={role}><CompanyTracking/></PrivateRoute>}/>
          <Route path='/my-course' element={<PrivateRoute validToken={validToken} validRoles={["user"]} role={role}><CourseContent/></PrivateRoute>} />
          {/*Mentor*/}          
          <Route path='/add-topic' element={<PrivateRoute validToken={validToken} validRoles={["mentor"]} role={role}><AddTopic/></PrivateRoute>} />
          <Route path='/my-students' element={<PrivateRoute validToken={validToken} validRoles={["mentor"]} role={role}><MyStudents/></PrivateRoute>} />          
        </Routes>
      </Router>
    </>
  );
}

export default App;