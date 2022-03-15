import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button';
import './Navbar.css'


function Navbar({validToken, removeToken, role, token}) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [administratorId, setAdministratorId] = useState(-1);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        }else{
            setButton(true)
        }
    };

    useEffect(() => {
        showButton()
    },[])
    window.addEventListener('resize',showButton);

    const logMeOut = () => {
        fetch('/logout', {
            method: "POST",
        })
        .then(res => res.json())
        .then(data => {
            removeToken();
        });
    }
    const getNavbarElements = () => {
        if(!validToken()){
            return (
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    {button && <Button buttonStyle="btn--outline" link="/log-in">Log In</Button>}
                </ul>
            )
        }else{
            alert("Role:"+role)
            if(role === "mentor"){
                return (
                    <>
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            <li className='nav-item'>
                                <Link to="/my-students" className="nav-links" onClick={closeMobileMenu}>
                                    My Students
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/add-topic" className="nav-links" onClick={closeMobileMenu}>
                                    Add Topic
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle="btn--outline" link="/" onClick={logMeOut}>Log Out</Button>}                
                    </>
                )
            }
            if(role === "user"){
                fetch('/get-admin',{
                    method: "GET",
                    headers: {
                        "Authorization": 'Bearer ' + token
                    },
                })
                .then(res => res.json())
                .then(data => {
                    setAdministratorId(data.administrator_id)
                });
                if(administratorId === -1){
                    return (
                        <>
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
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
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
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
                                <Link to="/mock-interviews" className="nav-links" onClick={closeMobileMenu}>
                                    Mock Interview
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/soft-skills" className="nav-links" onClick={closeMobileMenu}>
                                    Soft Skills
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/company-tracking" className="nav-links" onClick={closeMobileMenu}>
                                    Company Tracking
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle="btn--outline" link="/" onClick={logMeOut}>Log Out</Button>}
                    </>
                )   
            }
        }
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        PIIP IPN
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
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