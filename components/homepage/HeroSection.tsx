'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Brain, BookOpen, Zap } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-20 right-40 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating icons */}
      <motion.div
        className="absolute top-40 left-10 opacity-20"
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Brain className="h-24 w-24 text-cyan-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-10 opacity-20"
        animate={{
          y: [0, 30, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <BookOpen className="h-20 w-20 text-purple-400" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 opacity-20"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Zap className="h-16 w-16 text-pink-400" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 mb-6">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">AI-Powered Learning</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Plan Your Success{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            with AI
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Personalized study schedules powered by artificial intelligence. Learn smarter, not
          harder.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg rounded-lg">
              Get Started Free
            </Button>
          </Link>
          <a href="#features">
            <Button
              variant="outline"
              className="border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold px-8 py-6 text-lg rounded-lg"
            >
              Learn More
            </Button>
          </a>
        </motion.div>

        {/* Stats teaser */}
        <motion.div variants={itemVariants} className="mt-16 flex justify-center gap-8">
          <div>
            <div className="text-3xl font-bold text-cyan-400">50K+</div>
            <div className="text-sm text-slate-400">Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">2M+</div>
            <div className="text-sm text-slate-400">Hours Planned</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-400">4.9★</div>
            <div className="text-sm text-slate-400">Rating</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
