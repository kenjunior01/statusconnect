"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { BannerImpressionTracker } from "@/components/banner-impression-tracker"

interface Banner {
  id: string
  company: string
  image: string
  link: string
  title: string
}

interface InfiniteMovingBannersProps {
  banners: Banner[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}

export const InfiniteMovingBanners = ({
  banners,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingBannersProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      // Duplicate items for infinite scroll effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirectionAndSpeed()
      setStart(true)
    }
  }

  const getDirectionAndSpeed = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }

      const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      containerRef.current.style.setProperty("--animation-duration", duration)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className,
      )}
    >
      <div
        ref={scrollerRef}
        className={cn("flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap", start && "animate-scroll")}
      >
        {banners.map((banner, index) => (
          <BannerImpressionTracker key={`${banner.id}-${index}`} bannerId={banner.id}>
            <div className="relative w-[280px] max-w-full flex-shrink-0 rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="cursor-pointer" onClick={() => window.open(banner.link, "_blank")}>
                <div className="relative">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.company}
                    className="w-full h-16 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <h4 className="text-sm font-bold text-gray-800 truncate">{banner.company}</h4>
                      <p className="text-xs text-gray-600 truncate">{banner.title}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Anúncio Patrocinado
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-500">Ativo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BannerImpressionTracker>
        ))}
      </div>

      {/* Fade effects on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
    </div>
  )
}
