'use client'

import PusherClient, { type Channel } from 'pusher-js'

interface SharedChannel {
  channel: Channel
  consumers: number
}

export interface PusherChannelLease {
  channel: Channel
  release: () => void
}

let pusherClient: PusherClient | null = null
const sharedChannels = new Map<string, SharedChannel>()
let disconnectTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Returns the one lazily-created Channels client for this browser tab.
 * Server code must use pusher-server.ts instead.
 */
export const getPusherClient = () => {
  if (disconnectTimer) {
    clearTimeout(disconnectTimer)
    disconnectTimer = null
  }

  if (!pusherClient) {
    pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    })
  }

  return pusherClient
}

/**
 * Keeps a channel alive while a component consumes it. The last consumer
 * unsubscribes the channel and disconnects the tab's shared client.
 */
export const acquirePusherChannel = (channelName: string): PusherChannelLease => {
  const client = getPusherClient()
  let sharedChannel = sharedChannels.get(channelName)

  if (!sharedChannel) {
    sharedChannel = {
      channel: client.subscribe(channelName),
      consumers: 0,
    }
    sharedChannels.set(channelName, sharedChannel)
  }

  sharedChannel.consumers += 1
  let released = false

  return {
    channel: sharedChannel.channel,
    release: () => {
      if (released) return
      released = true

      const currentChannel = sharedChannels.get(channelName)
      if (!currentChannel) return

      currentChannel.consumers -= 1
      if (currentChannel.consumers > 0) return

      client.unsubscribe(channelName)
      sharedChannels.delete(channelName)

      if (sharedChannels.size === 0 && pusherClient === client) {
        // Let React Strict Mode remount synchronously reacquire the same
        // socket instead of briefly opening a second one.
        disconnectTimer = setTimeout(() => {
          if (sharedChannels.size === 0 && pusherClient === client) {
            client.disconnect()
            pusherClient = null
          }
          disconnectTimer = null
        }, 0)
      }
    },
  }
}
