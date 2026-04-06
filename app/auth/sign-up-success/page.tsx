'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SignUpSuccessPage() {
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
    <div className="relative min-h-svh w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex min-h-svh w-full items-center justify-center p-4 md:p-10">
        <motion.div
          className="w-full max-w-md text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Success Icon */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-block"
          >
            <motion.div
              animate={{ scale: [0, 1] }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-green-500/30 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <CheckCircle className="h-20 w-20 text-green-400 relative z-10" />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Welcome!
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-300 mb-8"
          >
            Your account has been created successfully. We&apos;ve sent a confirmation email to your inbox.
          </motion.p>

          {/* Email reminder */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 justify-center">
              <Mail className="h-5 w-5 text-cyan-400" />
              <p className="text-slate-300">
                Check your email and click the confirmation link to activate your account
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3"
          >
            <Link href="/dashboard">
              <Button className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-semibold py-6 text-lg">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-slate-600/50 bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 hover:text-white"
              >
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Additional info */}
          <motion.div
            variants={itemVariants}
            className="mt-8 space-y-2 text-slate-400"
          >
            <p className="text-sm">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                request a new confirmation link
              </a>
            </p>
            <p className="text-sm">
              Need help?{' '}
              <Link href="/support" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Contact support
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
