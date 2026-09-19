import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedDishes from './components/FeaturedDishes'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import { supabase } from './lib/supabaseClient'
import './App.css'

function AdminRoute() {
  const [session, setSession] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setCheckingSession(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return
      setSession(nextSession)
      setCheckingSession(false)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!checkingSession && !session) {
      window.location.replace('/admin/login')
    }
  }, [checkingSession, session])

  if (checkingSession || !session) {
    return <div className="admin-auth-state">Checking admin session…</div>
  }

  return <AdminDashboard />
}

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminRoute />
  }

  if (window.location.pathname === '/admin/login') {
    return <AdminLogin />
  }

  return (
    <main className="site-shell">
      <section className="hero-section" id="home">
        <Navbar />
        <Hero />
      </section>
      <About />
      <FeaturedDishes />
      <Menu />
      <Reservation />
    </main>
  )
}

export default App
