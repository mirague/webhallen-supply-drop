# Webhallen Supply Drop opener
Simple Node script to open your weekly supply drop, so you don't have to! 

Sends a push notification (optional) when a supply drop is opened or an error occurs. You could have this run every week on a Raspberry Pi with a CRON job.

<img src="https://i.imgur.com/DeHEHRM.jpg" alt="Notification on Phone" width="300" />

## Quick start
1. `cp .env.template .env`
2. Edit `.env` and set all vars accordingly
3. `yarn install`
4. For Node v13+ run `npm start` or if you run Node v12 or lower `npm run node11`

## Push notifications (optional)
To setup Push notifications you need to setup an account with [Pushover](https://pushover.net/api). You can try it out for free for 7 days and after that choose to [unlock forever for 5$ per device platform](https://pushover.net/pricing) (e.g. unlock it for all Apple devices).

1. [Create your account](https://pushover.net/signup)
2. Download the Pushover app on your phone and login
3. Create [a new Pushover app](https://pushover.net/apps) and call it something like "Supply Drop". You'll get a code, this is the `PUSHOVER_TOKEN` you should add in your `.env` file.
4. Find your "User Key" [on the Pushover dashboard](https://pushover.net/) and set this to `PUSHOVER_USER`
5. Done!

## Logs
All logs are written to `logs/app.log`

## Scheduled run with CRON
Supply drops are replenished every Monday-night. The below CRON entry will run this script every Tuesday morning at 8am:
```cron
0 8 * * TUE (cd ~/scripts-bin/supply-drop && /usr/local/bin/node --experimental-modules -r dotenv/config index.mjs) > /var/log/webhallen-supplydrop.log
```

You should change the paths to where you've cloned this repo.

Note that I'm running this on an old Raspberry Pi (arm6), meaning that the latest support version of Node is v11. If you're running Node v13+ you can change `npm run node11` with `npm start`.

### Setup CRON on Linux/macOS
1. `crontab -e`
2. Add the above snippet to the end of the file
3. `ctrl + o` to save
4. `ctrl + x` to quit
