"use client"
import WorldMap from "@/components/ui/world-map"
import { motion } from "motion/react"

export default function WorldMapDemo() {
  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side - Title and Description */}
          <div className="text-left lg:col-span-1">
            <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
              European{" "}
              <span className="text-neutral-400">
                {"Connectivity".split("").map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </p>
            <p className="text-sm md:text-lg text-neutral-500 max-w-2xl py-4">
              GBZA´s Erasmus journey across Europe, connecting cities and cultures. Fascinating!
            </p>
          </div>
          
          {/* Right side - Map */}
          <div className="lg:col-span-2">
            <WorldMap
              dots={[
                {
                  start: { lat: 51.5074, lng: -0.1278, city: "London", country: "United Kingdom" },
                  end: { lat: 48.8566, lng: 2.3522, city: "Paris", country: "France" },
                },
                {
                  start: { lat: 48.8566, lng: 2.3522, city: "Paris", country: "France" },
                  end: { lat: 52.52, lng: 13.405, city: "Berlin", country: "Germany" },
                },
                {
                  start: { lat: 52.52, lng: 13.405, city: "Berlin", country: "Germany" },
                  end: { lat: 41.9028, lng: 12.4964, city: "Rome", country: "Italy" },
                },
                {
                  start: { lat: 41.9028, lng: 12.4964, city: "Rome", country: "Italy" },
                  end: { lat: 40.4168, lng: -3.7038, city: "Madrid", country: "Spain" },
                },
                {
                  start: { lat: 40.4168, lng: -3.7038, city: "Madrid", country: "Spain" },
                  end: { lat: 59.3293, lng: 18.0686, city: "Stockholm", country: "Sweden" },
                },
                {
                  start: { lat: 59.3293, lng: 18.0686, city: "Stockholm", country: "Sweden" },
                  end: { lat: 50.0755, lng: 14.4378, city: "Prague", country: "Czech Republic" },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
