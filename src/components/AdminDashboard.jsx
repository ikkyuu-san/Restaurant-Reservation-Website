import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const reservationFields = 'id, name, email, phone, reservation_date, reservation_time, guests, special_requests, status, created_at'

const formatDate = (value) => {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

const formatTime = (value) => {
  if (!value) return '—'
  return value.slice(0, 5)
}

const formatCreatedAt = (value) => {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

const getTodayKey = () => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

function AdminDashboard() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [updatingReservation, setUpdatingReservation] = useState(null)
  const [actionError, setActionError] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true)
      setFetchError('')

      const { data, error } = await supabase
        .from('reservations')
        .select(reservationFields)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase reservations fetch failed:', error)
        setFetchError('We could not load reservations. Please try again later.')
      } else {
        setReservations(data ?? [])
      }

      setLoading(false)
    }

    fetchReservations()
  }, [])

  const summary = useMemo(() => {
    const todayKey = getTodayKey()
    const todayReservations = reservations.filter((reservation) => reservation.reservation_date === todayKey)
    const pendingReservations = reservations.filter((reservation) => reservation.status?.toLowerCase() === 'pending')

    return {
      todayCount: todayReservations.length,
      pendingCount: pendingReservations.length,
      todayGuests: todayReservations.reduce((total, reservation) => total + Number(reservation.guests || 0), 0),
    }
  }, [reservations])

  const handleStatusUpdate = async (reservationId, status) => {
    setUpdatingReservation({ id: reservationId, status })
    setActionError('')

    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', reservationId)

    if (error) {
      console.error(`Supabase reservation status update failed for ${reservationId}:`, error)
      setActionError('We could not update that reservation. Please try again.')
      setUpdatingReservation(null)
      return
    }

    setReservations((currentReservations) => currentReservations.map((reservation) => (
      reservation.id === reservationId ? { ...reservation, status } : reservation
    )))
    setUpdatingReservation(null)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Supabase admin logout failed:', error)
      setLoggingOut(false)
      return
    }

    window.location.replace('/admin/login')
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <a className="admin-brand" href="/" aria-label="Back to EMBER home">
          <span className="admin-brand-mark" aria-hidden="true">E</span>
          <span>EMBER</span>
        </a>
        <div className="admin-header-meta">
          <span>Restaurant administration</span>
          <a href="/">View website ↗</a>
          <button className="admin-logout-button" type="button" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Signing out…' : 'Log out'}
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-page-heading">
          <div>
            <p className="admin-eyebrow">EMBER / Overview</p>
            <h1>Good evening, <em>team.</em></h1>
          </div>
          <p className="admin-date">Thursday, 19 September 2026</p>
        </div>

        <section className="admin-summary" aria-label="Reservation summary">
          <div className="summary-item">
            <span className="summary-label">Today</span>
            <strong>{summary.todayCount}</strong>
            <span className="summary-note">reservations</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Pending</span>
            <strong>{summary.pendingCount}</strong>
            <span className="summary-note">need attention</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Guests</span>
            <strong>{summary.todayGuests}</strong>
            <span className="summary-note">expected tonight</span>
          </div>
        </section>

        <section className="admin-reservations" aria-labelledby="reservations-heading">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">Bookings / 01</p>
              <h2 id="reservations-heading">Reservations</h2>
            </div>
            <button className="admin-outline-button" type="button">Export list ↗</button>
          </div>
          {actionError && <p className="admin-action-error" role="alert">{actionError}</p>}

          <div className="reservation-table-wrap">
            <table className="reservation-table">
              <thead>
                <tr>
                  <th scope="col">Guest</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Date &amp; time</th>
                  <th scope="col">Guests</th>
                  <th scope="col">Special requests</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td className="table-state" colSpan="8">Loading reservations…</td></tr>
                )}
                {!loading && fetchError && (
                  <tr><td className="table-state table-state-error" colSpan="8">{fetchError}</td></tr>
                )}
                {!loading && !fetchError && reservations.length === 0 && (
                  <tr><td className="table-state" colSpan="8">No reservations have been made yet.</td></tr>
                )}
                {!loading && !fetchError && reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td data-label="Guest">
                      <strong>{reservation.name}</strong>
                      <span className="reservation-id">{reservation.id}</span>
                    </td>
                    <td data-label="Contact">
                      <span>{reservation.email}</span>
                      <span>{reservation.phone}</span>
                    </td>
                    <td data-label="Date & time">
                      <strong>{formatDate(reservation.reservation_date)}</strong>
                      <span>{formatTime(reservation.reservation_time)}</span>
                    </td>
                    <td data-label="Guests">{reservation.guests}</td>
                    <td className="request-cell" data-label="Special requests">{reservation.special_requests || '—'}</td>
                    <td data-label="Status"><span className={`status-pill status-${(reservation.status || 'pending').toLowerCase()}`}>{reservation.status || 'Pending'}</span></td>
                    <td data-label="Created">{formatCreatedAt(reservation.created_at)}</td>
                    <td className="action-cell" data-label="Actions">
                      <button
                        className="table-action confirm"
                        type="button"
                        disabled={updatingReservation?.id === reservation.id}
                        onClick={() => handleStatusUpdate(reservation.id, 'confirmed')}
                      >
                        {updatingReservation?.id === reservation.id && updatingReservation.status === 'confirmed' ? 'Confirming…' : 'Confirm'}
                      </button>
                      <button
                        className="table-action cancel"
                        type="button"
                        disabled={updatingReservation?.id === reservation.id}
                        onClick={() => handleStatusUpdate(reservation.id, 'cancelled')}
                      >
                        {updatingReservation?.id === reservation.id && updatingReservation.status === 'cancelled' ? 'Cancelling…' : 'Cancel'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminDashboard
