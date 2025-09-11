"use client"
import type React from "react"
import { motion } from "motion/react"

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void
  active: string | null
  item: string
  children?: React.ReactNode
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors duration-300"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/30 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-white/5"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
                }}
              >
                <motion.div layout className="w-max h-full p-4 backdrop-blur-md">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void
  children: React.ReactNode
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/20 dark:border-white/10 backdrop-blur-xl flex justify-center space-x-8 px-10 py-4 shadow-2xl shadow-black/10 dark:shadow-white/5"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
      }}
    >
      {children}
    </nav>
  )
}

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string
  description: string
  href: string
  src: string
}) => {
  return (
    <a
      href={href}
      className="flex space-x-3 p-3 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 group"
    >
      <img
        src={src || "/placeholder.svg"}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black/90 dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
          {title}
        </h4>
        <p className="text-neutral-600 text-sm max-w-[10rem] dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </a>
  )
}

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all duration-300 py-2 px-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/5"
    >
      {children}
    </a>
  )
}
