import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { ADMIN_EMAIL } from '../lib/constants'
import { isAuthorizedAdminEmail } from '../lib/portfolioApi'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type AuthContextValue = {
  session: Session | null
  user: User | null
  isAdmin: boolean
  loading: boolean
  configured: boolean
  requestMagicLink: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      const next = data.session
      if (next && !isAuthorizedAdminEmail(next.user.email)) {
        void supabase!.auth.signOut()
        setSession(null)
      } else {
        setSession(next)
      }
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (nextSession && !isAuthorizedAdminEmail(nextSession.user.email)) {
        void supabase!.auth.signOut()
        setSession(null)
        return
      }
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const requestMagicLink = useCallback(async (email: string) => {
    if (!supabase) throw new Error('Supabase is not configured')
    const normalized = email.trim().toLowerCase()
    if (!isAuthorizedAdminEmail(normalized)) {
      throw new Error(`Only ${ADMIN_EMAIL} can access the admin area.`)
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        shouldCreateUser: true,
      },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAdmin: isAuthorizedAdminEmail(session?.user?.email),
      loading,
      configured: isSupabaseConfigured,
      requestMagicLink,
      signOut,
    }),
    [session, loading, requestMagicLink, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
