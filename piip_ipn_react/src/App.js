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
import MyCourseContent from './components/Pages/User/MyCourseContent/MyCourseContent'
import NotFound from './components/Pages/NotFound';
import useToken from './components/useToken';
import PrivateRoute from './components/PrivateRoute';
import AddTopic from './components/Pages/Admin/AddTopic/AddTopic'
import MyStudents from './components/Pages/Admin/MyStudents/MyStudents';

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
          <Route path='/problem/:problem_id' element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><Problem token={token}/></PrivateRoute>} />
          <Route path='/problems' element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><Problems token={token}/></PrivateRoute>}/>
          <Route path='/topics' exact element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><Topics/></PrivateRoute>}/>
          <Route path='/soft-skills' exact element={<PrivateRoute validToken={validToken} validRoles={["user","mentor"]} role={role}><SoftSkills/></PrivateRoute>}/>
          {/*User*/}
          <Route path='/mock-interviews' element={<PrivateRoute validToken={validToken} validRoles={["user"]} role={role}><MockInterviews/></PrivateRoute>}/>
          <Route path='/company-tracking' exact element={<PrivateRoute validToken={validToken} validRoles={["user"]} role={role}><CompanyTracking/></PrivateRoute>}/>
          <Route path='/my-course' element={<PrivateRoute validToken={validToken} validRoles={["user"]} role={role}><MyCourseContent token={token}/></PrivateRoute>} />
          {/*Mentor*/}          
          <Route path='/add-topic' element={<PrivateRoute validToken={validToken} validRoles={["mentor"]} role={role}><AddTopic/></PrivateRoute>} />
          <Route path='/my-students' element={<PrivateRoute validToken={validToken} validRoles={["mentor"]} role={role}><MyStudents token={token}/></PrivateRoute>} />          
        </Routes>
      </Router>
    </>
  );
}

export default App;