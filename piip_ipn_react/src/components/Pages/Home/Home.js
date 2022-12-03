import React from 'react'
import HeroSection from './HeroSection'

function Home ({ userData }) {
  return (
        <>
            <HeroSection userData={userData}/>
        </>
  )
}

export default Home
