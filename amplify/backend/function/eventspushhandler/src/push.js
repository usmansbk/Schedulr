const OneSignal = require('onesignal-node');

const appId = process.env.APPLICATION_ID;
const appAuthKey = process.env.API_KEY;
const userAuthKey = process.env.USER_AUTH_KEY;

const client = new OneSignal.Client({
  userAuthKey,
  app: {
    appAuthKey,
    appId
  }
});

// const ttl = Number(process.env.TTL); // In seconds
const playersLimit = Number(process.env.PLAYERS_LIMIT);
const web_url = process.env.WEB_URL;

function CreateNotification(notif, include_player_ids) {
  const { contents, title, ttl, data } = notif;

  const notification = new OneSignal.Notification({
    contents,
    headings: {
      en: title
    },
    ttl,
    include_player_ids,
    web_url,
    data,
    android_accent_color: '63a4ff'
  });
  return notification;
}

async function SendMessage(data, players) {
  for (let count = 0; count < playersLimit; count += playersLimit) {
    const include_player_ids = players.slice(count, playersLimit);
    const notification = CreateNotification(data, include_player_ids);
    try {
      await client.sendNotification(notification);
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = SendMessage;