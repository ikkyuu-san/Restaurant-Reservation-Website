import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  requests: '',
}

function Reservation() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')

  useEffect(() => {
    if (!submitted) return undefined
    const timeoutId = window.setTimeout(() => setSubmitted(false), 6000)
    return () => window.clearTimeout(timeoutId)
  }, [submitted])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setSubmitted(false)
    setSubmissionError('')
  }

  const validate = () => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.'
    if (!form.email.trim()) nextErrors.email = 'Please enter your email address.'
    else if (!emailPattern.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    if (!form.date) nextErrors.date = 'Please choose a reservation date.'
    if (!form.time) nextErrors.time = 'Please choose a reservation time.'
    if (!form.guests || Number(form.guests) < 1) nextErrors.guests = 'Please select at least one guest.'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setSubmitted(false)
    setSubmissionError('')

    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    const reservation = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      reservation_date: form.date,
      reservation_time: form.time,
      guests: Number(form.guests),
      special_requests: form.requests.trim() || null,
    }

    try {
      const { error } = await supabase.from('reservations').insert([reservation])

      if (error) {
        console.error('Supabase reservation insert failed:', error)
        setSubmissionError('We could not complete your request. Please try again.')
        return
      }

      setSubmitted(true)
      setForm(initialForm)
      setErrors({})
    } catch (error) {
      console.error('Unexpected reservation submission error:', error)
      setSubmissionError('We could not complete your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="reservation-section" id="reservation">
      <div className="reservation-inner">
        <div className="reservation-heading">
          <div>
            <div className="section-kicker">Your table awaits</div>
            <h2>Make it an evening to <em>remember.</em></h2>
          </div>
          <p>
            Join us for a considered evening of food, fire, and warm Bangkok hospitality.
          </p>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit} noValidate>
          <div className="reservation-fields">
            <div className={`form-field${errors.name ? ' has-error' : ''}`}>
              <label htmlFor="reservation-name">Full name</label>
              <input id="reservation-name" name="name" type="text" value={form.name} onChange={updateField} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'reservation-name-error' : undefined} />
              {errors.name && <span className="field-error" id="reservation-name-error">{errors.name}</span>}
            </div>
            <div className={`form-field${errors.email ? ' has-error' : ''}`}>
              <label htmlFor="reservation-email">Email address</label>
              <input id="reservation-email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'reservation-email-error' : undefined} />
              {errors.email && <span className="field-error" id="reservation-email-error">{errors.email}</span>}
            </div>
            <div className={`form-field${errors.phone ? ' has-error' : ''}`}>
              <label htmlFor="reservation-phone">Phone number</label>
              <input id="reservation-phone" name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'reservation-phone-error' : undefined} />
              {errors.phone && <span className="field-error" id="reservation-phone-error">{errors.phone}</span>}
            </div>
            <div className={`form-field${errors.date ? ' has-error' : ''}`}>
              <label htmlFor="reservation-date">Reservation date</label>
              <input id="reservation-date" name="date" type="date" value={form.date} onChange={updateField} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'reservation-date-error' : undefined} />
              {errors.date && <span className="field-error" id="reservation-date-error">{errors.date}</span>}
            </div>
            <div className={`form-field${errors.time ? ' has-error' : ''}`}>
              <label htmlFor="reservation-time">Reservation time</label>
              <input id="reservation-time" name="time" type="time" value={form.time} onChange={updateField} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? 'reservation-time-error' : undefined} />
              {errors.time && <span className="field-error" id="reservation-time-error">{errors.time}</span>}
            </div>
            <div className={`form-field${errors.guests ? ' has-error' : ''}`}>
              <label htmlFor="reservation-guests">Number of guests</label>
              <input id="reservation-guests" name="guests" type="number" min="1" value={form.guests} onChange={updateField} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? 'reservation-guests-error' : undefined} />
              {errors.guests && <span className="field-error" id="reservation-guests-error">{errors.guests}</span>}
            </div>
            <div className={`form-field form-field-wide${errors.requests ? ' has-error' : ''}`}>
              <label htmlFor="reservation-requests">Special requests <span>(optional)</span></label>
              <textarea id="reservation-requests" name="requests" value={form.requests} onChange={updateField} rows="3" placeholder="Dietary notes, celebrations, or anything we should know" />
            </div>
          </div>

          <div className="reservation-submit-row">
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Reserve a Table'}
              {!submitting && <span aria-hidden="true">↗</span>}
            </button>
            {submitted && <p className="reservation-success" role="status">Thank you. Your reservation request has been received.</p>}
            {submissionError && <p className="reservation-error" role="alert">{submissionError}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Reservation
