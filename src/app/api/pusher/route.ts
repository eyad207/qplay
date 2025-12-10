import { NextRequest, NextResponse } from 'next/server'
import { pusherServer } from '@/lib/pusher'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { channel, event, data } = body

    await pusherServer.trigger(channel, event, data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Pusher error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
