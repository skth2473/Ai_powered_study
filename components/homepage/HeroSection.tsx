'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Brain, BookOpen, Zap, ArrowRight } from 'lucide-react'
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
        <BookOpen className="h-24 w-24 text-purple-400" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
            AI-Powered Learning
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Plan Your Success with{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Intelligence
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Transform the way you study with personalized AI-powered timetables, smart scheduling, and intelligent learning suggestions.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white px-8 py-6 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-slate-600/50 bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 hover:text-white px-8 py-6 text-lg"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Stats preview */}
        <motion.div variants={itemVariants} className="mt-16 grid grid-cols-3 gap-8">
          <div>
            <p className="text-3xl font-bold text-cyan-400">50K+</p>
            <p className="text-slate-400 text-sm mt-2">Students</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">2M+</p>
            <p className="text-slate-400 text-sm mt-2">Hours Saved</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">95%</p>
            <p className="text-slate-400 text-sm mt-2">Improvement</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
