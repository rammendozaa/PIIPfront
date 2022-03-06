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
import Topic from './components/pages/Topic.js'
import Problem from './components/pages/Problem.js'
import CourseContent from './components/pages/CourseContent';
import NotFound from './components/pages/NotFound';
import useToken from './components/useToken';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { token, setToken, removeToken, validToken } = useToken();
  return (
    <>
      <Router>
        <Navbar validToken={validToken} removeToken={removeToken}/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/problems' element={<PrivateRoute validToken={validToken}><Problems token={token}/></PrivateRoute>}/>
          <Route path='/topics' exact element={<PrivateRoute validToken={validToken}><Topics/></PrivateRoute>}/>
          <Route path='/mock-interviews' element={<PrivateRoute validToken={validToken}><MockInterviews/></PrivateRoute>}/>
          <Route path='/soft-skills' exact element={<PrivateRoute validToken={validToken}><SoftSkills/></PrivateRoute>}/>
          <Route path='/company-tracking' exact element={<PrivateRoute validToken={validToken}><CompanyTracking/></PrivateRoute>}/>
          <Route path='/log-in' element={<LogIn validToken={validToken} setToken={setToken}/>}/>
          <Route path='/topic' element={<PrivateRoute validToken={validToken}><Topic/></PrivateRoute>} />
          <Route path='/problem' element={<PrivateRoute validToken={validToken}><Problem/></PrivateRoute>} />
          <Route path='/my-course' element={<PrivateRoute validToken={validToken}><CourseContent/></PrivateRoute>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;