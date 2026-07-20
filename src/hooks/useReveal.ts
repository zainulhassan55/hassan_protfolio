import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement = HTMLElement>(active = true) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !active) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [active])

  return ref
}
