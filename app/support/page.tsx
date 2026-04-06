'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Phone, User, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('Error:', error.error)
        return
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, delay: 1, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl sticky top-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
              StudyPlanner
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Support Team
            </h1>
            <p className="text-slate-300 text-lg">
              Need help? Our support team is here to assist you 24/7
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg p-6 hover:border-cyan-500/30 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <User className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Support Lead</h3>
                    <p className="text-slate-300">Sarthak Kumar Thakur</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg p-6 hover:border-cyan-500/30 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Phone className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+918789735407"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      +91 8789735407
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg p-6 hover:border-cyan-500/30 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-500/10 rounded-lg">
                    <Mail className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:tsarthak544@gmail.com"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      tsarthak544@gmail.com
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-6"
                variants={itemVariants}
              >
                <p className="text-slate-300 text-sm">
                  <span className="text-cyan-400 font-semibold">Response Time:</span> We typically respond within 2-4 hours during business hours (9 AM - 6 PM IST, Monday - Friday)
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-cyan-400" />
                Send us a Message
              </h2>

              {submitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Thank you for reaching out! We&apos;ll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-200">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-200">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-200">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your issue..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 text-white placeholder:text-slate-500 rounded-md focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* FAQ */}
          <motion.div
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Help</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-semibold mb-2">Billing Issues?</p>
                <p className="text-slate-300 text-sm">Check our billing documentation or contact support with your account ID</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-purple-400 font-semibold mb-2">Feature Request?</p>
                <p className="text-slate-300 text-sm">Share your ideas and help us improve the platform</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-pink-400 font-semibold mb-2">Technical Support?</p>
                <p className="text-slate-300 text-sm">Describe the issue in detail and we&apos;ll help troubleshoot</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-semibold mb-2">General Questions?</p>
                <p className="text-slate-300 text-sm">Ask anything about using AI Study Planner</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
