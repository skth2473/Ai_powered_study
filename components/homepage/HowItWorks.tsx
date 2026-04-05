'use client'

import { motion } from 'framer-motion'
import {
  UserPlus,
  Brain,
  Zap,
  TrendingUp,
} from 'lucide-react'

interface Step {
  number: number
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: <UserPlus className="h-8 w-8" />,
    title: 'Sign Up',
    description: 'Create your account with one click using email or Google',
    color: 'text-cyan-400',
  },
  {
    number: 2,
    icon: <Brain className="h-8 w-8" />,
    title: 'Tell AI Your Goals',
    description: 'Share your subjects, exams, and deadlines with our smart system',
    color: 'text-purple-400',
  },
  {
    number: 3,
    icon: <Zap className="h-8 w-8" />,
    title: 'Get Your Schedule',
    description: 'Receive an optimized, personalized study schedule instantly',
    color: 'text-pink-400',
  },
  {
    number: 4,
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Track & Improve',
    description: 'Monitor progress and let AI refine your schedule over time',
    color: 'text-blue-400',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
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
            How It Works
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get started in 4 simple steps
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 transform -translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />

          {/* Steps */}
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl hover:border-slate-600/50 transition-all">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`flex-shrink-0 ${step.color}`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        {step.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-400">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step number circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="hidden md:flex flex-shrink-0 h-12 w-12 rounded-full border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 items-center justify-center relative z-10"
                >
                  <span className="text-cyan-400 font-bold text-lg">{step.number}</span>
                </motion.div>

                {/* Mobile step number */}
                <div className="md:hidden flex-shrink-0 h-10 w-10 rounded-full border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">{step.number}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
