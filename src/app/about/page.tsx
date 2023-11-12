import React from 'react'
import HeroSection from '../components/HeroSection'

const About = () => {
  const obj = { title: "OUR STORY", imageUrl: "/about1.svg" };
  return (
    <HeroSection {...obj} />
  )
}

export default About;