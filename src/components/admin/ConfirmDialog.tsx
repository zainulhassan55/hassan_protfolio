import { useEffect, useRef } from 'react'

export type ConfirmRequest = {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
}

type ConfirmDialogProps = {
  request: ConfirmRequest | null
  busy?: boolean
  onCancel: () => void
}

export function ConfirmDialog({ request, busy = false, onCancel }: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!request) return
    confirmRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !busy) onCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [request, busy, onCancel])

  if (!request) return null

  return (
    <div className="confirm-overlay" role="presentation" onClick={() => !busy && onCancel()}>
      <div
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="section-label">Confirm</p>
        <h2 id="confirm-title" className="confirm-title">
          {request.title}
        </h2>
        <p id="confirm-message" className="confirm-message">
          {request.message}
        </p>
        <div className="confirm-actions">
          <button type="button" className="btn btn-secondary" disabled={busy} onClick={onCancel}>
            Cancel
          </button>
          <button
            ref={confirmRef}
            type="button"
            className="btn btn-danger"
            disabled={busy}
            onClick={request.onConfirm}
          >
            {busy ? 'Deleting…' : (request.confirmLabel ?? 'Delete')}
          </button>
        </div>
      </div>
    </div>
  )
}
