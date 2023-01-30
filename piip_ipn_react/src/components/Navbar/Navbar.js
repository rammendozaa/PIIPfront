import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import './Navbar.css'

function Navbar ({ userData, validUserData, removeUserData }) {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const [administratorId, setAdministratorId] = useState(-1)
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  const location = useLocation()

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }
  const getColor = () => {
    if (location.pathname === '/') {
      return '#300c14'
    }
    return '#731F35'
  }
  useEffect(() => {
    showButton()
  }, [])
  window.addEventListener('resize', showButton)

  const logMeOut = () => {
    fetch('/logout', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        removeUserData()
      })
  }
  const getNavbarElements = () => {
    if (!validUserData()) {
      return (
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {button && <Button buttonStyle="btn--outline" link="/log-in">Log In</Button>}
                </ul>
      )
    } else {
      if (userData.role === 'mentor') {
        return (
                    <>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to="/my-students" className="nav-links" onClick={closeMobileMenu}>
                                    My Students
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/create-activity" className="nav-links" onClick={closeMobileMenu}>
                                    Create Activities
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/problems" className="nav-links" onClick={closeMobileMenu}>
                                    Problems
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/topics" className="nav-links" onClick={closeMobileMenu}>
                                    Topics
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/templates-view" className="nav-links" onClick={closeMobileMenu}>
                                    Templates
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/my-interviews" className="nav-links" onClick={closeMobileMenu}>
                                    My interviews
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle="btn--outline" link="/" onClick={logMeOut}>Log Out</Button>}
                    </>
        )
      } else if (userData.role === 'super') {
        return (
                    <>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to="/my-students" className="nav-links" onClick={closeMobileMenu}>
                                    My Students
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/problems" className="nav-links" onClick={closeMobileMenu}>
                                    Problems
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/topics" className="nav-links" onClick={closeMobileMenu}>
                                    Topics
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/create-activity" className="nav-links" onClick={closeMobileMenu}>
                                    Create Activities
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/templates-view" className="nav-links" onClick={closeMobileMenu}>
                                    Templates
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/my-interviews" className="nav-links" onClick={closeMobileMenu}>
                                    My interviews
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle="btn--outline" link="/" onClick={logMeOut}>Log Out</Button>}
                    </>
        )
      } else if (userData.role === 'user') {
        fetch('/get-admin', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + userData.token,
            'User-Type': userData.role,
            'User-Id': userData.user_id,
          }
        })
          .then(res => res.json())
          .then(data => {
            setAdministratorId(data.administrator_id)
          })
        if (administratorId === -1) {
          return (
                        <>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to="/my-course" className="nav-links" onClick={closeMobileMenu}>
                                    My Course
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle="btn--outline" link="/" onClick={logMeOut}>Log Out</Button>}
                        </>
          )
        }
        return (
                    <>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to="/my-course" className="nav-links" onClick={closeMobileMenu}>
                                    My Course
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/problems" className="nav-links" onClick={closeMobileMenu}>
                                    Problems
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/topics" className="nav-links" onClick={closeMobileMenu}>
                                    Topics
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/company-tracking" className="nav-links" onClick={closeMobileMenu}>
                                    Company Tracking
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/my-profile" className="nav-links" onClick={closeMobileMenu}>
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle="btn--outline" link="/" onClick={logMeOut}>Log Out</Button>}
                    </>
        )
      } else {
        return (
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                {button && <Button buttonStyle="btn--outline" link="/log-in">Log In</Button>}
            </ul>
  )
  }
    }
  }
  return (
        <>
            <nav className="navbar" style={{ 'background-color': getColor() }}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        PIIP IPN
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    {
                        getNavbarElements()
                    }
                </div>
            </nav>
        </>
  )
}

export default Navbar
