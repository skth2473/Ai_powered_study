'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, User } from 'lucide-react'

export default function ProtectedPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center space-y-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-r-transparent" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div>
            <h1 className="text-xl font-bold text-white">Study Planner</h1>
            <p className="text-xs text-slate-400">Welcome back!</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-600/50 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 text-slate-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Card */}
          <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-8 space-y-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <User className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">
                  Welcome, {user?.user_metadata?.name || user?.email}!
                </h2>
                <p className="text-slate-400 mt-1">You&apos;re successfully logged in</p>
              </div>
            </div>

            {/* User Info */}
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Email</p>
                <p className="text-slate-200 mt-1 break-all">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Auth Method</p>
                <p className="text-slate-200 mt-1 capitalize">
                  {user?.app_metadata?.provider === 'google' ? 'Google OAuth' : 'Email & Password'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Member Since</p>
                <p className="text-slate-200 mt-1">
                  {new Date(user?.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Account ID</p>
                <p className="text-slate-200 mt-1 font-mono text-xs truncate">{user?.id}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-4">
            <h3 className="text-lg font-semibold text-white">What&apos;s Next?</h3>
            <p className="text-slate-400">
              Your login system is set up! Here&apos;s what you can do:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                <span>Build your study planner features</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                <span>Add more pages and components</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                <span>Connect your database tables</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
