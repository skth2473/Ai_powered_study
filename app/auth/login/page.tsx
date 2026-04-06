'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Mail, Brain, BookOpen, Zap, TrendingUp, Brain as Brain2 } from 'lucide-react'
import { motion } from 'framer-motion'

// Floating feature card component
function FeatureCard({ icon: Icon, title, description, position, delay }: { 
  icon: any; title: string; description: string; position: string; delay: number 
}) {
  return (
    <motion.div
      className={`absolute ${position} w-64 pointer-events-none`}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="p-4 rounded-lg border border-cyan-500/40 bg-slate-900/40 backdrop-blur-sm hover:border-cyan-400/60 transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-5 w-5 text-cyan-400" />
          <h4 className="font-semibold text-sm text-white">{title}</h4>
        </div>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </motion.div>
  )
}

// Typing animation component
function TypingEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/protected')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    setIsGoogleLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setIsGoogleLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flowing neon lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path
            d="M 0,200 Q 250,100 500,200 T 1000,200"
            fill="none"
            stroke="url(#neonGradient1)"
            strokeWidth="2"
          />
          <path
            d="M 0,400 Q 250,300 500,400 T 1000,400"
            fill="none"
            stroke="url(#neonGradient1)"
            strokeWidth="2"
          />
        </svg>

        {/* Pulsing orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            delay: 1,
            repeat: Infinity,
          }}
        />

        {/* Floating feature cards */}
        <FeatureCard 
          icon={Zap} 
          title="Plan Smarter" 
          description="AI creates a personalized study plan using your goals"
          position="left-10 top-1/4"
          delay={0}
        />
        <FeatureCard 
          icon={BookOpen} 
          title="Stay Consistent" 
          description="Track progress with smart analytics and insights"
          position="left-10 bottom-1/4"
          delay={1}
        />
        <FeatureCard 
          icon={TrendingUp} 
          title="Learn Better" 
          description="Smart notes, quizzes, AI-powered insights"
          position="right-10 top-1/3"
          delay={2}
        />

        {/* Large holographic brain on right */}
        <motion.div
          className="absolute right-20 bottom-10 opacity-40"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Brain2 className="h-80 w-80 text-cyan-400" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative flex min-h-svh w-full items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-md">
          <motion.div className="flex flex-col gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            {/* Header with animation */}
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-6 w-6 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <motion.p className="text-slate-400">
                <TypingEffect text="Let AI plan your success" />
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="relative border-2 border-cyan-500/60 bg-slate-950/70 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Login</CardTitle>
                <CardDescription className="text-slate-400">
                  Use your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Label htmlFor="email" className="text-slate-200">
                      Email
                    </Label>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:border-cyan-500/70 focus:ring-cyan-500/30 transition-all focus:shadow-lg focus:shadow-cyan-500/20"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Label htmlFor="password" className="text-slate-200">
                      Password
                    </Label>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:border-cyan-500/70 focus:ring-cyan-500/30 transition-all focus:shadow-lg focus:shadow-cyan-500/20"
                        placeholder="Enter your password"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Login Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 hover:from-purple-700 hover:via-cyan-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                      disabled={isLoading}
                    >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                        Logging in...
                      </span>
                    ) : (
                      'Login'
                    )}
                    </Button>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-600/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-800/50 px-2 text-slate-400">Or continue with</span>
                    </div>
                  </motion.div>

                  {/* Google Login Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/70 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-all duration-300 relative overflow-hidden group"
                      onClick={handleGoogleLogin}
                      disabled={isGoogleLoading}
                    >
                      <motion.span
                        className="absolute inset-0 bg-blue-500/20 transform -skew-x-12"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      {isGoogleLoading ? (
                        <span className="flex items-center gap-2 relative z-10">
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                          Connecting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 relative z-10">
                          <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Sign Up Link */}
                <motion.div
                  className="mt-6 text-center text-sm text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/auth/sign-up"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Bottom inspiration text */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-slate-400 text-sm">
                Small steps every day lead to big results.
              </p>
              <p className="text-cyan-400 text-sm font-semibold">
                You&apos;ve got this! 🚀
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
