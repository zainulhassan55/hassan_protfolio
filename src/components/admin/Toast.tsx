import { useEffect } from 'react'

export type ToastTone = 'success' | 'error'

export type ToastMessage = {
  id: string
  tone: ToastTone
  title: string
  detail?: string
}

type ToastProps = {
  toast: ToastMessage | null
  onDismiss: () => void
  durationMs?: number
}

export function Toast({ toast, onDismiss, durationMs = 3200 }: ToastProps) {
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(onDismiss, durationMs)
    return () => window.clearTimeout(timer)
  }, [toast, onDismiss, durationMs])

  if (!toast) return null

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      <div className={`toast toast-${toast.tone}`}>
        <span className="toast-icon" aria-hidden="true">
          {toast.tone === 'success' ? (
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M6 10.2 8.6 12.8 14 7.4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 6v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
            </svg>
          )}
        </span>
        <div className="toast-body">
          <p className="toast-title">{toast.title}</p>
          {toast.detail && <p className="toast-detail">{toast.detail}</p>}
        </div>
        <button type="button" className="toast-close" onClick={onDismiss} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  )
}
