import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '../Button';
import './Navbar.css'


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
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
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
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
                        <li className='nav-item'>
                            <Link to="/log-in" className="nav-links-mobile" onClick={closeMobileMenu}>
                                Log In
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle="btn--outline" link="/log-in">Log In</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar