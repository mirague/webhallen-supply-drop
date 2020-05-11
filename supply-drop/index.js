import fetch from 'node-fetch'
import { login, openSupplyDrop } from './io/webhallen.js'

(async () => {
  const authCookie = await login()
  await openSupplyDrop(authCookie)
})()
