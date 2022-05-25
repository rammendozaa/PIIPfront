import React from 'react';
import { Button } from '../../Button/Button';
import './HeroSection.css';

function HeroSection({userData}) {
  console.log(userData);
  return (
    <div className='hero-container'>
      {(!userData.role || userData.role === "user") && <>
      <h1>Prepare yourself for the internship of your dreams</h1>
      <p>PIIP IPN Helps you find the right tools to improve your personal and technical abilities</p>
      </>}
      {userData.role && userData.role !== "user" && 
      <>
      <h1>Prepare students for the internship of their dreams!</h1>
      <p>PIIP IPN enables you to help find the right tools to improve personal and technical abilities</p>
      </>
      }
      {!userData.role &&
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link='/log-in'
        >
          GET STARTED
        </Button>
      </div>
      }
      <img src='/images/home.png'></img>
    </div>
  );
}

export default HeroSection;
