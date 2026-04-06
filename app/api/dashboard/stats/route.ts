import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return mock stats for now
    // In production, these would be fetched from a database
    const stats = {
      weeklyStudyTime: 0,
      activeSubjects: 0,
      aiSuggestions: 0,
      recentActivity: [],
      upcomingTests: [],
    }

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
