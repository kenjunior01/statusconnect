"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface BannerImpressionTrackerProps {
  bannerId: string
  children: React.ReactNode
}

export function BannerImpressionTracker({ bannerId, children }: BannerImpressionTrackerProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasTrackedRef = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Banner está 50% visível
            if (!startTimeRef.current) {
              startTimeRef.current = Date.now()
            }
          } else {
            // Banner saiu de vista
            if (startTimeRef.current && !hasTrackedRef.current) {
              const viewDuration = (Date.now() - startTimeRef.current) / 1000

              // Só rastrear se foi visualizado por mais de 1 segundo
              if (viewDuration >= 1) {
                trackImpression(bannerId, viewDuration)
                hasTrackedRef.current = true
              }

              startTimeRef.current = null
            }
          }
        })
      },
      {
        threshold: [0, 0.5, 1],
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()

      // Rastrear impressão ao desmontar se ainda não foi rastreada
      if (startTimeRef.current && !hasTrackedRef.current) {
        const viewDuration = (Date.now() - startTimeRef.current) / 1000
        if (viewDuration >= 1) {
          trackImpression(bannerId, viewDuration)
        }
      }
    }
  }, [bannerId])

  const trackImpression = async (bannerId: string, viewDuration: number) => {
    try {
      await fetch("/api/analytics/banner-impressions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bannerId,
          viewDuration,
        }),
      })
    } catch (error) {
      console.error("Error tracking impression:", error)
    }
  }

  const handleClick = async () => {
    try {
      await fetch("/api/analytics/banner-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bannerId,
        }),
      })
    } catch (error) {
      console.error("Error tracking click:", error)
    }
  }

  return (
    <div ref={elementRef} onClick={handleClick}>
      {children}
    </div>
  )
}
