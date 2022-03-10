import React from 'react';
import { Button } from '../../Button/Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>Prepare yourself for the intership of your dreams</h1>
      <p>PIIP IPN Helps you find the right tools to improve your personal and technical abilities</p>
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
      <img src='/images/home.png'></img>
    </div>
  );
}

export default HeroSection;
