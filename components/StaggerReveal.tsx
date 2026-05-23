'use client'

import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}

const dirMap = {
  up:    { y: 32, x: 0  },
  down:  { y: -32, x: 0 },
  left:  { y: 0, x: 32  },
  right: { y: 0, x: -32 },
  none:  { y: 0, x: 0   },
}

export function StaggerReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.08,
  direction = 'up',
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  const { x, y } = dirMap[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden:  { opacity: 0, x, y },
                visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
              }}
            >
              {child}
            </motion.div>
          ))
        : (
          <motion.div
            variants={{
              hidden:  { opacity: 0, x, y },
              visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
            }}
          >
            {children}
          </motion.div>
        )
      }
    </motion.div>
  )
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  const { x, y } = dirMap[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }}
    >
      {children}
    </motion.div>
  )
}
