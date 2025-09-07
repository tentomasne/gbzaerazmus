"use client"

import { useRef, useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import DottedMap from "dotted-map"

import { useTheme } from "next-themes"

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string; city?: string; country?: string }
    end: { lat: number; lng: number; label?: string; city?: string; country?: string }
  }>
  lineColor?: string
}

export default function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{
    city: string
    country: string
    x: number
    y: number
  } | null>(null)

  const { theme } = useTheme()

  const map = useMemo(
    () =>
      new DottedMap({
        height: 100,
        grid: "diagonal",
        region: {
          lat: { min: 35, max: 71 },
          lng: { min: -25, max: 45 },
        },
      }),
    [],
  )

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: theme === "dark" ? "#FFFFFF40" : "#00000040",
        shape: "circle",
        backgroundColor: theme === "dark" ? "black" : "white",
      }),
    [map, theme],
  )

  const projectPoint = useCallback((lat: number, lng: number) => {
    const x = ((lng + 25) / 70) * 800
    const y = ((71 - lat) / 36) * 400
    return { x, y }
  }, [])

  const projectedDots = useMemo(
    () =>
      dots.map((dot) => ({
        ...dot,
        startPoint: projectPoint(dot.start.lat, dot.start.lng),
        endPoint: projectPoint(dot.end.lat, dot.end.lng),
      })),
    [dots, projectPoint],
  )

  const createCurvedPath = useCallback((start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }, [])

  const handlePointHover = useCallback((point: { city?: string; country?: string }, x: number, y: number) => {
    if (point.city && point.country) {
      setHoveredPoint({ city: point.city, country: point.country, x, y })
    }
  }, [])

  const handlePointLeave = useCallback(() => {
    setHoveredPoint(null)
  }, [])

  return (
    <div className="w-full aspect-[2/1.2] dark:bg-black bg-white rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="europe map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {projectedDots.map((dot, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              d={createCurvedPath(dot.startPoint, dot.endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.5 * i,
                ease: "easeOut",
              }}
              key={`start-upper-${i}`}
            ></motion.path>
          </g>
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {projectedDots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={dot.startPoint.x}
                cy={dot.startPoint.y}
                r="8"
                fill="transparent"
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => handlePointHover(dot.start, dot.startPoint.x, dot.startPoint.y)}
                onMouseLeave={handlePointLeave}
              />
              <circle cx={dot.startPoint.x} cy={dot.startPoint.y} r="2" fill={lineColor} />
              <circle cx={dot.startPoint.x} cy={dot.startPoint.y} r="2" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={dot.endPoint.x}
                cy={dot.endPoint.y}
                r="8"
                fill="transparent"
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => handlePointHover(dot.end, dot.endPoint.x, dot.endPoint.y)}
                onMouseLeave={handlePointLeave}
              />
              <circle cx={dot.endPoint.x} cy={dot.endPoint.y} r="2" fill={lineColor} />
              <circle cx={dot.endPoint.x} cy={dot.endPoint.y} r="2" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        ))}
      </svg>

      {hoveredPoint && (
        <div
          className="absolute pointer-events-none z-10 bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-md text-sm whitespace-nowrap shadow-lg transition-opacity duration-150"
          style={{
            left: `${(hoveredPoint.x / 800) * 100}%`,
            top: `${(hoveredPoint.y / 400) * 100}%`,
            transform: "translate(-50%, -100%)",
            marginTop: "-12px",
          }}
        >
          <div className="font-medium text-white">{hoveredPoint.city}</div>
          <div className="text-xs text-gray-300">{hoveredPoint.country}</div>
        </div>
      )}
    </div>
  )
}
