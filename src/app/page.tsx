import React from 'react'
import HeroSection from './components/HeroSection'

const page = () => {
  const obj = { title: "LET\'S WATCH MOVIE TOGETHER", imageUrl: "/home.svg" };
  return (
    <>
      <HeroSection {...obj} />
    </>
  )
}

export default page