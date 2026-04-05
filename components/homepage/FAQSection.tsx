'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'How does AI generate my study schedule?',
    answer:
      'Our AI analyzes your subjects, exam dates, current progress, and learning style to create an optimized schedule. It considers your available study time, preferred study sessions length, and adjusts difficulty distribution for maximum retention.',
  },
  {
    question: 'Can I adjust my schedule after it\'s created?',
    answer:
      'Absolutely! Your schedule is fully customizable. You can move topics, add breaks, change session durations, and the AI will adapt its recommendations accordingly.',
  },
  {
    question: 'Is there a free plan?',
    answer:
      'Yes! Our free tier includes basic scheduling for up to 3 subjects. Premium plans unlock unlimited subjects, advanced analytics, study group features, and priority AI assistance.',
  },
  {
    question: 'How do reminders work?',
    answer:
      'Once you enable notifications, we\'ll send you reminders 15 minutes before each study session starts. You can customize notification preferences in settings.',
  },
  {
    question: 'Can I sync my schedule with other apps?',
    answer:
      'Yes! You can export your schedule to Google Calendar, Apple Calendar, or download as an ICS file to import into any calendar application.',
  },
  {
    question: 'What if I miss a study session?',
    answer:
      'The AI will intelligently reschedule the missed topics to ensure you still cover everything before your exams. Our system learns from your patterns to suggest more realistic schedules.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about AI Study Planner
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors group"
              >
                <span className="text-left font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="h-5 w-5 text-cyan-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-700/50"
                  >
                    <div className="px-6 py-4 text-slate-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@aistudyplanner.com"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            Contact our support team →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
