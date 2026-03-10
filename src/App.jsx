import { useState } from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Logos from './components/Logos'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import LeadCapture from './components/LeadCapture'
import CTA from './components/CTA'
import Footer from './components/Footer'
import DemoModal from './components/DemoModal'

export default function App() {
  const [lang, setLang] = useState('es')
  const [showDemo, setShowDemo] = useState(false)

  const openDemo = () => setShowDemo(true)
  const closeDemo = () => setShowDemo(false)

  return (
    <div>
      <Navbar lang={lang} setLang={setLang} openDemo={openDemo} />
      <Hero lang={lang} openDemo={openDemo} />
      <Logos lang={lang} />
      <Features lang={lang} openDemo={openDemo} />
      <HowItWorks lang={lang} />
      <Pricing lang={lang} openDemo={openDemo} />
      <Testimonials lang={lang} />
      <LeadCapture lang={lang} />
      <CTA lang={lang} openDemo={openDemo} />
      <Footer lang={lang} />
      {showDemo && <DemoModal onClose={closeDemo} lang={lang} />}
    </div>
  )
}
