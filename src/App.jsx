import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Gallery from './pages/Gallery.jsx'
import Campaign from './pages/Campaign.jsx'
import Privacy from './pages/Privacy.jsx'
import './App.css'

const ROUTES = {
  '/': {
    Page: Landing,
    overHero: true,
    title: 'Samaya Sedona — Opening Soon',
  },
  '/gallery': {
    Page: Gallery,
    overHero: true,
    tone: 'dark',
    title: 'Gallery — Samaya Sedona',
  },
  '/founders': {
    Page: Campaign,
    overHero: false,
    title: 'Founders’ List — Samaya Sedona',
  },
  '/privacy': {
    Page: Privacy,
    overHero: false,
    title: 'Privacy Policy — Samaya Sedona',
  },
}

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/'
  return ROUTES[hash] ? hash : '/'
}

export default function App() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHash = () => {
      setRoute(currentRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const { Page, overHero, tone, title } = ROUTES[route]

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <Nav route={route} overHero={overHero} tone={tone} />
      <main id="main" className="fade-in" key={route}>
        <Page />
      </main>
      <Footer />
    </>
  )
}
