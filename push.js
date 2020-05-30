var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BM8DgSdSVz2VW7rt8S6Zfm2CJgCmsluuVuiGSOFD7h1FNPM-Xog0XIpnAq9gge2asjqHJPeycKeEve2T6l5qMZg",
   "privateKey": "7ozMcWCedMHl_owbRlKIkMMgIyikielTUYCjrFMEe1c"
};
 
 
webPush.setVapidDetails(
   'mailto:muhmasykur@outlook.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dubemP0xAoU:APA91bF3LAvdLmARerq5duUpzaxPBOx-ug6bxkuvQ8wuq12rHKgrQ1fiTbZXPR94QSDSrvOwsut_whrPKqRCx6yDKzTAYUHk56LSQNvkq1NstVCLb3cY22JJC6rsPuhIwtyxSiYx7lRZ",
   "keys": {
       "p256dh": "BGJZ9eldBhz/m/0VjdIw73N6hni+cyMuL4/7A3bpccj1Re7h/XVpYJL+5iL6THy4pTBDVVf80HfW3oeEDgtGENQ=",
       "auth": "3rMaxT6mYHObjCxtUKE3Sw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '782145596297',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);