'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LogOut, BookOpen, Brain, Clock, HelpCircle, Home } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push('/auth/login')
          return
        }

        setUser(user)
        setLoading(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'
  const userEmail = user?.email

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Study Planner</h1>
            <p className="text-sm text-slate-400">AI-powered learning assistant</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-slate-700/30 rounded-lg transition-colors" title="Home">
              <Home className="h-5 w-5 text-slate-400 hover:text-cyan-400" />
            </Link>
            <Link href="/support" className="p-2 hover:bg-slate-700/30 rounded-lg transition-colors" title="Support">
              <HelpCircle className="h-5 w-5 text-slate-400 hover:text-cyan-400" />
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600/50 bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userName}!
          </h2>
          <p className="text-slate-400">{userEmail}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                This Week Study Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0 hrs</div>
              <p className="text-xs text-slate-400 mt-1">Ready to start learning</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                Active Subjects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
              <p className="text-xs text-slate-400 mt-1">Add subjects to get started</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-400" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
              <p className="text-xs text-slate-400 mt-1">Waiting for your input</p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <Card className="border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Your Study Planner</CardTitle>
            <CardDescription className="text-slate-400">
              Intelligent study schedule generation coming soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 border border-dashed border-slate-700/50 rounded-lg text-center">
              <Brain className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">
                Your personalized AI study planner is ready. We&apos;re preparing the
                interface for you.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
