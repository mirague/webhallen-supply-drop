import fetch from 'node-fetch'
import { getAuthCookie, openSupplyDrop } from './io/webhallen.mjs'
import { hasSetupPushover } from './io/pushover.mjs'
import logger from './io/log.mjs'

(async () => {
  if (!hasSetupPushover()) {
    logger.warn(`Pushover not setup -- won't send any push notifications`)
  }

  await openSupplyDrop(await getAuthCookie())
})()
