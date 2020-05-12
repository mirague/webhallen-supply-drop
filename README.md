# Webhallen Supply Drop opener
Simple script to open the weekly supply drop. Sends a push notification using [Pushover](https://pushover.net/api) when a supply drop is opened or a fatal error occurs. You could have this run every week on a Raspberry Pi with a CRON job.

## Quick start
1. `cp .env.template .env`
2. Edit `.env` and set all vars accordingly
3. `yarn install`
4. For Node v13+ run `npm start` or if you run Node v12 or lower `npm run node11`

## Scheduled run with CRON
Supply drops are replenished every Monday-night. The below CRON entry will run this script every Tuesday morning at 8am:
```cron
0 8 * * TUE cd ~/supply-drop && /usr/local/bin/npm run node11
```

You should change the paths to where you've cloned this repo.

Note that I'm running this on an old Raspberry Pi (arm6), meaning that the latest support version of Node is v11. If you're running Node v13+ you can change `npm run node11` with `npm start`.

### Setup CRON on Linux/macOS
1. `crontab -e`
2. Add the above snippet to the end of the file
3. `ctrl + o` to save
4. `ctrl + x` to quit