import fetch from 'node-fetch'
import chalk from 'chalk'
import logger from './log.mjs'

export function hasSetupPushover() {
  return process.env.PUSHOVER_TOKEN && process.env.PUSHOVER_USER
}

export async function sendPushNotification(...message) {
  if (!hasSetupPushover()) { return}
  
  if (message.join) {
    message = message.join(' ')
  }

  logger.debug('Sending push notification: ' + message)

  const response = await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      token: process.env.PUSHOVER_TOKEN,
      user: process.env.PUSHOVER_USER,
      message,
    }),
  })

  if (response.status !== 200) {
    logger.error(`Unexpected status from PushOver API: got ${response.status} but expected 200`)
  }
  
  logger.info('Successfully sent PushOver Notification')
}