import { useEffect, useRef } from 'react'

export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const els = root.querySelectorAll('.reveal')
    if (!els.length) return

    // Immediately reveal anything already in viewport
    els.forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 80) {
        el.classList.add('visible')
      }
    })

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.05, rootMargin: '40px 0px 0px 0px' }
    )

    els.forEach(el => {
      if (!el.classList.contains('visible')) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  return ref
}
