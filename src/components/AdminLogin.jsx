import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      if (data.session) {
        window.location.replace('/admin')
        return
      }
      setCheckingSession(false)
    })

    return () => {
      mounted = false
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError) {
      console.error('Supabase admin sign-in failed:', signInError)
      setError('We could not sign you in. Please check your email and password.')
      setLoading(false)
      return
    }

    window.location.replace('/admin')
  }

  if (checkingSession) {
    return <div className="admin-auth-state">Checking admin session…</div>
  }

  return (
    <main className="admin-login-shell">
      <section className="admin-login-panel" aria-labelledby="admin-login-heading">
        <a className="admin-brand admin-login-brand" href="/" aria-label="Back to EMBER home">
          <span className="admin-brand-mark" aria-hidden="true">E</span>
          <span>EMBER</span>
        </a>
        <p className="admin-eyebrow">Restaurant administration</p>
        <h1 id="admin-login-heading">Welcome <em>back.</em></h1>
        <p className="admin-login-intro">Sign in to manage tonight&apos;s reservations.</p>

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="admin-email">Email address</label>
            <input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </div>
          {error && <p className="admin-login-error" role="alert">{error}</p>}
          <button className="button admin-login-button" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Log in'}
            {!loading && <span aria-hidden="true">↗</span>}
          </button>
        </form>
      </section>
    </main>
  )
}

export default AdminLogin
