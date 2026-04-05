'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface StatCounter {
  label: string
  endValue: number
  suffix: string
  color: string
}

const stats: StatCounter[] = [
  {
    label: 'Active Students',
    endValue: 50000,
    suffix: '+',
    color: 'text-cyan-400',
  },
  {
    label: 'Study Hours Planned',
    endValue: 2000000,
    suffix: '+',
    color: 'text-blue-400',
  },
  {
    label: 'Grade Improvement',
    endValue: 95,
    suffix: '%',
    color: 'text-purple-400',
  },
  {
    label: 'Rating',
    endValue: 49,
    suffix: '★ / 50',
    color: 'text-pink-400',
  },
]

function StatCard({ stat }: { stat: StatCounter }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000 // 2 seconds
    const increment = stat.endValue / (duration / 16) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= stat.endValue) {
        setCount(stat.endValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, stat.endValue])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl hover:border-slate-600/50 transition-all"
    >
      <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-slate-400 text-sm md:text-base">{stat.label}</div>
    </motion.div>
  )
}

export function StatisticsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Thousands of Students
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join a community of learners achieving their goals with AI-powered planning
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
