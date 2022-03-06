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

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <>
      <Router>
        <Navbar token={token}/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/problems' element={<Problems/>}/>
          <Route path='/topics' exact element={<Topics/>}/>
          <Route path='/mock-interviews' element={<MockInterviews/>}/>
          <Route path='/soft-skills' exact element={<SoftSkills/>}/>
          <Route path='/company-tracking' exact element={<CompanyTracking/>}/>
          <Route path='/log-in' element={<LogIn setToken={setToken}/>}/>
          <Route path='/topic' element={<Topic/>} />
          <Route path='/problem' element={<Problem/>} />
          <Route path='/my-course' element={<CourseContent/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
