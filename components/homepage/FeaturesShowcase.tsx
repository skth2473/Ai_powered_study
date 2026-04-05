'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  Zap,
  Bell,
  BarChart3,
  BookOpen,
  Trophy,
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'AI-Powered Scheduling',
    description: 'Intelligent timetables that adapt to your learning pace and goals',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Smart Priority Management',
    description: 'Auto-prioritize subjects based on exam dates and difficulty',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: 'Real-time Reminders',
    description: 'Get notified exactly when your study sessions begin',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Progress Tracking',
    description: 'Visualize your learning journey with detailed analytics',
    color: 'from-pink-500/20 to-purple-500/20',
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Study Analytics',
    description: 'Deep insights into your study patterns and productivity',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Exam Prep Mode',
    description: 'Specialized scheduling for competitive exam preparation',
    color: 'from-cyan-500/20 to-pink-500/20',
  },
]

export function FeaturesShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="features"
      className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900"
    >
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
            Powerful Features for Smart Learning
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to optimize your study schedule and achieve your goals
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`group p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br ${feature.color} backdrop-blur-xl hover:border-slate-600/50 transition-all cursor-pointer overflow-hidden relative`}
            >
              {/* Hover effect background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Neon border effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl border border-cyan-500/0 group-hover:border-cyan-500/50 transition-all"
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
