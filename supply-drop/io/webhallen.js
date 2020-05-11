import fetch from 'node-fetch'
import chalk from 'chalk'
import log from './log.js'
import { sendPushNotification } from './pushover.js'

function extractSetCookie(setCookie) {
  const webhallen = setCookie.match(/webhallen=([a-zA-Z0-9]*)/g)
  const last_visit = setCookie.match(/last_visit=([0-9]*)/g)
  const auth = setCookie.match(/webhallen_auth=([a-zA-Z0-9\%_]*)/)
  return (
    webhallen + '; ' + 
    last_visit + 
    (auth ? '; ' + auth[0] : '')
  )
}

export async function login(username, password) {
  const r = await fetch('https://www.webhallen.com/api/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: process.env.WEBHALLEN_USERNAME,
      password: process.env.WEBHALLEN_PASSWORD,
    })
  })

  if (r.status >= 300) {
    log.error(`Webhallen login: unexpected status - got ${r.status} but expected 200`)
    return
  }

  return extractSetCookie(r.headers.get('set-cookie'))
}

export async function openSupplyDrop(cookie) {
  const r = await fetch('https://www.webhallen.com/api/supply-drop', {
    method: 'POST',
    headers: {
      'cookie': cookie,
    }
  })

  if (r.status === 403) {
    console.warn(chalk.yellow('Got a 403 when trying to open supply drop, this likely means it\'s not ready yet'))
    return
  } else if (r.status !== 200) {
    log.error(`Webhallen supply-drop: unexpected status - got ${r.status} but expected 200`)
    return
  }
  
  const json = await r.json()
  
  if (!json.drops) {
    log.error('Missing `drops` in response body')
    return
  }

  json.drops.forEach(drop => {
    log.info(`${drop.name} (${drop.description})`)
  })
}