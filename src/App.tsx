import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Legacy from './components/Legacy'
import Divisions from './components/Divisions'
import Projects from './components/Projects'
import MaterialStory from './components/MaterialStory'
import MaterialStrip from './components/MaterialStrip'
import People from './components/People'
import Housing from './components/Housing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { divisionOptions } from './data/content'

export default function App() {
  const [division, setDivision] = useState(divisionOptions[0])

  const housingInquiry = useCallback(() => {
    setDivision('Stanogradnja')
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2">
        Preskoči na sadržaj
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Legacy />
        <Divisions />
        <Projects />
        <MaterialStrip />
        <MaterialStory />
        <People />
        <Housing onInquiry={housingInquiry} />
        <Contact division={division} setDivision={setDivision} />
      </main>
      <Footer />
    </MotionConfig>
  )
}
