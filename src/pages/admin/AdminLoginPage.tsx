import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ADMIN_EMAIL } from '../../lib/constants'

export function AdminLoginPage() {
  const { isAdmin, loading, configured, requestMagicLink } = useAuth()
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  if (!loading && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    try {
      await requestMagicLink(email)
      setStatus('sent')
      setMessage('Magic link sent. Open the email on this device to finish signing in.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Could not send magic link.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 text-[var(--color-text)]">
      <div className="w-full max-w-md rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
        <p className="section-label">Admin</p>
        <h1 className="mt-2 font-display text-3xl text-[var(--color-heading)]">Sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">
          Magic-link access is limited to <span className="text-[var(--color-accent)]">{ADMIN_EMAIL}</span>.
        </p>

        {!configured && (
          <p className="mt-5 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-soft)]">
            Supabase is not configured. Add <code className="text-[var(--color-accent)]">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-[var(--color-accent)]">VITE_SUPABASE_ANON_KEY</code> to{' '}
            <code className="text-[var(--color-accent)]">.env.local</code>, then restart the dev server.
          </p>
        )}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-[var(--color-text-faint)]">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              autoComplete="email"
              disabled={!configured || status === 'sending'}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!configured || status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Email magic link'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              status === 'error' ? 'text-red-300' : 'text-[var(--color-accent)]'
            }`}
          >
            {message}
          </p>
        )}

        <Link to="/" className="mt-8 inline-flex text-sm text-[var(--color-text-faint)] hover:text-[var(--color-accent)]">
          ← Back to portfolio
        </Link>
      </div>
    </div>
  )
}
