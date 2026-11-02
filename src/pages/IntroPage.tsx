import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Pixel box of the pictured button in the 1002 x 525 slide, as percentages so it scales with the image.
const button = { left: 77.2, top: 83.8, width: 19.5, height: 7.4 }

export function IntroPage() {
  useEffect(() => {
    document.title = 'SERAA Wealth Management Strategy'
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 bg-[#f7f7f5] p-0 sm:p-4">
      <div
        className="relative"
        style={{ aspectRatio: '1002 / 525', width: 'min(100%, 1002px, calc((100dvh - var(--header-h) - 2rem) * 1002 / 525))' }}
      >
        <img
          src="/intro-slide.png"
          alt="Building SERAA into a wealth management specialist: where we stand, what to build, how to grow."
          width={1002}
          height={525}
          className="block size-full object-contain"
        />
        <Link
          to="/opportunity"
          aria-label="Explore the opportunity"
          className="absolute rounded-md bg-transparent outline-offset-2 focus-visible:outline-[3px] focus-visible:outline-[#0f766e]"
          style={{
            left: `${button.left}%`,
            top: `${button.top}%`,
            width: `${button.width}%`,
            height: `${button.height}%`,
          }}
        />
      </div>
      <Link
        to="/opportunity"
        className="mb-6 rounded-lg bg-[#0f766e] px-6 py-3 text-base font-medium text-white sm:hidden"
      >
        Explore the opportunity
      </Link>
    </div>
  )
}
