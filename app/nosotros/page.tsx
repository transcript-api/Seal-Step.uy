'use client'

import { useEffect, useRef, useState } from 'react'

const FILM_FRAMES = Array.from({ length: 50 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(4, '0')
  return `/frames-new-balance-film/frame_${frameNumber}.jpg`
})

const STORY_SEGMENTS = [
  {
    id: '01',
    title: 'LA\nCONFIANZA\nCRECIÓ.',
    copy: 'La gente volvió, recomendó y dio forma a lo que estaba naciendo.',
  },
  {
    id: '02',
    title: 'YA NO\nÉRAMOS\nPOCOS.',
    copy: 'El trabajo se volvió más constante, más claro y más intenso.',
  },
]

export default function NosotrosPage() {
  const [scrollY, setScrollY] = useState(0)
  const storyRef = useRef<HTMLElement | null>(null)
  const [storyProgress, setStoryProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateStory = () => {
      const element = storyRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const nextProgress = rect.height > 0
        ? Math.min(Math.max((window.innerHeight - rect.top) / (rect.height + 200), 0), 1)
        : 0
      setStoryProgress(nextProgress)
    }

    updateStory()
    window.addEventListener('scroll', updateStory, { passive: true })
    window.addEventListener('resize', updateStory)

    return () => {
      window.removeEventListener('scroll', updateStory)
      window.removeEventListener('resize', updateStory)
    }
  }, [])

  const filmProgress = Math.min(scrollY / 1800, 1)
  const activeFrameIndex = Math.min(
    Math.floor(filmProgress * (FILM_FRAMES.length - 1)),
    FILM_FRAMES.length - 1,
  )
  const currentFilmFrame = FILM_FRAMES[activeFrameIndex] ?? FILM_FRAMES[0]
  const trackShift = storyProgress * 120

  return (
    <main className="story-shell relative min-h-screen bg-black text-white">
      <div className="story-film pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="story-film-current absolute inset-[-6%]"
          style={{
            backgroundImage: `url(${currentFilmFrame})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            transform: `translate3d(${scrollY * 0.08}px, ${scrollY * 0.05}px, 0) scale(1.13)`,
            filter: 'saturate(1.1) contrast(1.06) brightness(0.72)',
          }}
        />
        <div className="story-film-vignette absolute inset-0" />
      </div>

      <section ref={storyRef} className="story-section relative z-10 h-[240vh] overflow-hidden">
        <div className="story-stage sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="story-flow-guides pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            <span className="story-curve story-curve-1" />
            <span className="story-curve story-curve-2" />
            <span className="story-curve story-curve-3" />
            <span className="story-curve story-curve-4" />
          </div>

          <div className="story-center-block absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div
              className="story-track"
              style={{ transform: `translate3d(${trackShift}px, 0, 0)` }}
            >
              {STORY_SEGMENTS.map((segment, index) => {
                const reveal = Math.max(0, storyProgress * 1.45 - index * 0.45)

                return (
                  <div
                    key={segment.id}
                    className="story-copy"
                    style={{ opacity: 0.12 + reveal * 0.88, transform: `translate3d(${index % 2 === 0 ? -12 : 18}px, 0, 0)` }}
                  >
                    <span className="story-number">{segment.id}</span>
                    <h2 className="story-title">{segment.title}</h2>
                    <p className="story-description">{segment.copy}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
