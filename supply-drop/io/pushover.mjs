import fetch from 'node-fetch'
import chalk from 'chalk'

export async function sendPushNotification(...message) {
  if (message.join) {
    message = message.join(' ')
  }

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
    console.error(chalk.red(`Unexpected status from PushOver API: got ${response.status} but expected 200`))
  }
  
  console.log(chalk.green('Successfully sent PushOver Notification'))
}