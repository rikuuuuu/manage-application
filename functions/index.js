const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const app = express()
const nuxt = new Nuxt({
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/assets/',
  },
})

async function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  await nuxt.ready()
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, (promise) => {
      promise.then(resolve).catch(reject)
    })
  })
}

app.use(handleRequest)
exports.ssrapp = functions.https.onRequest(app)

// var schedule = require('node-schedule');
// var OneSignal = require('onesignal-node');
//
// const dayjs = require('dayjs');
// require('dayjs/locale/ja')
// const advancedFormat = require('dayjs/plugin/advancedFormat');
// dayjs.extend(advancedFormat)
// dayjs.locale('ja')

// nodemailer
//
// const nodemailer = require('nodemailer')
// // const gmailEmail = functions.config().gmail.email
// // const gmailPassword = functions.config().gmail.password
// const gmailEmail = ''
// const gmailPassword = ''
// const mailTransport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: gmailEmail,
//         pass: gmailPassword
//     }
// })
//
// var admin = require("firebase-admin");
//
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: ""
// });
//
// exports.deleteaccount = functions.https.onCall((data, context) => {
//   admin.auth().deleteUser(data.userid)
//   .then(function() {
//     console.log('Successfully deleted user');
//   })
//   .catch(function(error) {
//     console.log('Error deleting user:', error);
//   });
// });


// ---  AWS Fetch Video ---
//
// var AWS = require('aws-sdk');
//
// // AWS.config.loadFromPath('./rootkey.json');
//
// // aws root acount
// // var accessKey = ''
// // var secretKey = ''
//
// // aws IAM user rikuuu
// var accessKey = ''
// var secretKey = ''
//
// AWS.config.update({
//   region: 'ap-northeast-1',
//   credentials: new AWS.Credentials(accessKey, secretKey)
// });
//
//
//
// // var serviceAccount = require("path/to/serviceAccountKey.json");
//
// exports.awslist = functions.https.onCall(async (data, context) => {
//
//   var s3 = new AWS.S3({
//     signatureVersion: 'v4'
//   });
//
//   var listparams = {
//     Bucket: '',
//     Prefix: data.filekey
//   }
//
//   var list = await s3.listObjects(listparams).promise()
//
//   var listkey = []
//
//   list.Contents.map(n => n.Key).forEach(v => {
//   		listkey.push(v)
// 	});
//
//   var rootfileurl
//   var tsfileurls = []
//
//   await Promise.all(listkey.map(async key => {
//
//     console.log('key', key)
//
//     var urlparams = {
//           Key: key,
//           Bucket: '',
//           Expires: 60*60
//         };
//
//     var videourl = s3.getSignedUrl('getObject', urlparams)
//
//     if ( key.indexOf('m3u8') != -1) {
//       rootfileurl = videourl
//     } else {
//       tsfileurls.push(videourl)
//     }
//
//
//   }))
//
//   // var listparams = {
//   //   Bucket: '',
//   //   Prefix: ''
//   // }
//   //
//   // var list = await s3.listObjects(listparams).promise()
//   //
//   // var listkey = []
//   //
//   // list.Contents.map(n => n.Key).forEach(v => {
//   // 		listkey.push(v)
// 	// });
//   //
//   // var rootfile
//   // var rootfileurl
//   // var tsfiles = []
//   //
//   // await Promise.all(listkey.map( async key => {
//   //
//   //     var params = {
//   //           Key: key,
//   //           Bucket: '',
//   //         };
//   //
//   //     var urlparams = {
//   //           Key: key,
//   //           Bucket: '',
//   //           Expires: 60*60
//   //         };
//   //
//   //     var videourl = s3.getSignedUrl('getObject', urlparams)
//   //
//   //     var videoData = await s3.getObject(params).promise()
//   //
//   //     console.log('videourl', videourl)
//   //
//   //     const strvideo = String(videoData.Body)
//   //
//   //     if ( key.indexOf('m3u8') != -1) {
//   //       rootfile = strvideo
//   //       rootfileurl = videourl
//   //     } else {
//   //       tsfiles.push(strvideo)
//   //     }
//   //
//   // }))
//   console.log('rootfileurl', rootfileurl, 'tsfileurls', tsfileurls)
//
//   return { rootfileurl: rootfileurl, tsfileurls: tsfileurls }
//
// });

// exports.listenWithdraw = functions.firestore.document('withdraw/{wid}').onCreate((snap, context) => {
//   var withdraw = snap.data()
//   var email = {
//       from: gmailEmail,
//       to: '',
//       subject: '【タレントの出金申請の報告】',
//       html: `<p>タレントから出金申請がありました。内容を確認し、期日までに振り込みをお願いいたします。</p>` +
//       `<br>` +
//       `<p>タレントの出金申請内容</p>` +
//       `<p>・振り込み期日：　${dayjs(withdraw.withdrawDate * 1000).format('YYYY/MM/DD')}</p>` +
//       `<p>・金額：　${withdraw.balance}</p>` +
//       `<br>` +
//       `<p>タレントの口座情報</p>` +
//       `<p>・銀行名：　${withdraw.bankName}</p>` +
//       `<p>・支店名：　${withdraw.bankBranch}</p>` +
//       `<p>・口座番号：　${withdraw.accountNumber}</p>` +
//       `<p>・口座名義：　${withdraw.holderName}</p>` +
//       `<br>` +
//       `<p>出金申請日：　${dayjs(withdraw.requestTime * 1000).format('YYYY/MM/DD')}</p>`
//   }
//   mailTransport.sendMail(email, (err, info) => {
//       if (err) {
//           return console.log(err)
//       }
//       return console.log('success')
//   })
// });
//
// // 新規登録の際に保存されるタイミングにより、Updateの際にメールを送信している。（onCreateだと情報が拾えない）
// exports.listenUsers = functions.firestore.document('users/{userid}').onWrite((change, context) => {
//
//   const newValue = change.after.data();
//
//   const previousValue = change.before.data();
//
//   if (newValue.authStatus === 1 && !previousValue.authStatus) {
//
//     var user = 'ファン'
//     if (newValue.talent === true) {
//       user = 'タレント'
//     }
//
//     var email = {
//         from: gmailEmail,
//         to: '',
//         subject: `【${user}の登録の報告】`,
//         html: `<p>${user}の登録がありました。内容を確認し、本人確認の審査をお願いいたします。</p>` +
//         `<br>` +
//         `<p>${user}の登録内容</p>` +
//         `<p>・${user}名：　${newValue.nickName}</p>` +
//         `<p>・本名：　${newValue.familyName + newValue.givenName}</p>` +
//         `<p>・本名（カナ）：　${newValue.familyKana + newValue.givenKana}</p>` +
//         `<p>・登録日時：　${dayjs(newValue.joined * 1000).format('YYYY/MM/DD')}</p>` +
//         `<p>・リンク：　<a href="https://o2-talk.firebaseapp.com/approval/all">https://o2-talk.firebaseapp.com/approval/all</a></p>`
//     }
//     mailTransport.sendMail(email, (err, info) => {
//         if (err) {
//             return console.log(err)
//         }
//         return console.log('success')
//     })
//   }
// });
//
// // 通報
// exports.listenReport = functions.firestore.document('report/{rid}').onCreate((snap, context) => {
//   var report = snap.data()
//
//   var email = {
//       from: gmailEmail,
//       to: '',
//       subject: `【通報がありました。】`,
//       html: `<p>通報がありました。内容を確認し、対処をお願いいたします。</p>` +
//       `<br>` +
//       `<p>通報内容</p>` +
//       `<p>・通報したアカウントID：　${report.reporterId}</p>` +
//       `<p>・通報されたアカウントID：　${report.reportedId}</p>` +
//       `<p>・トークID：　${report.talkId}</p>` +
//       `<p>・内容：　${report.reason}</p>` +
//       `<p>・通報日時：　${dayjs(report.sentAt * 1000).format('YYYY/MM/DD')}</p>` +
//       `<p>・リンク：　<a href="https://o2-talk.firebaseapp.com/">https://o2-talk.firebaseapp.com</a></p>`
//   }
//   mailTransport.sendMail(email, (err, info) => {
//       if (err) {
//           return console.log(err)
//       }
//       return console.log('success')
//   })
// });
//
//
// exports.listenTalk = functions.firestore.document('talks/{tid}').onWrite((change, context) => {
//
//   const newValue = change.after.data();
//
//   const previousValue = change.before.data();
//
//   // トーク購入
//   if (newValue.userId && !previousValue.userId) {
//
//     var email = {
//         from: gmailEmail,
//         to: '',
//         subject: `【トーク購入の報告】`,
//         html: `<p>トーク購入が購入されました。</p>` +
//         `<br>` +
//         `<p>トーク内容</p>` +
//         `<p>・開始予定時刻：　${dayjs(newValue.startTime * 1000).add(9, 'hour').format('YYYY/MM/DD kk:mm')}</p>` +
//         `<p>・終了予定時刻：　${dayjs(newValue.endTime * 1000).add(9, 'hour').format('YYYY/MM/DD kk:mm')}</p>` +
//         `<p>・トークID：　${newValue.tid}</p>` +
//         `<p>・タレントID：　${newValue.talentId}</p>` +
//         `<p>・ファンID：　${newValue.userId}</p>` +
//         `<p>・値段：　${newValue.price}円</p>` +
//         `<p>・リンク：　<a href="https://o2-talk.firebaseapp.com/talks/${newValue.tid}">https://o2-talk.firebaseapp.com/talks/${newValue.tid}</a></p>`
//     }
//     mailTransport.sendMail(email, (err, info) => {
//         if (err) {
//             return console.log(err)
//         }
//         return console.log('success')
//     })
//
//     var date = new Date(newValue.startTime * 1000)
//     var j = schedule.scheduleJob(date, function(){
//
//       var startemail = {
//           from: gmailEmail,
//           to: '',
//           subject: `【トーク開始の報告】`,
//           html: `<p>トークが開始されました。</p>` +
//           `<br>` +
//           `<p>トーク内容</p>` +
//           `<p>・開始予定時刻：　${dayjs(newValue.startTime * 1000).add(9, 'hour').format('YYYY/MM/DD kk:mm')}</p>` +
//           `<p>・終了予定時刻：　${dayjs(newValue.endTime * 1000).add(9, 'hour').format('YYYY/MM/DD kk:mm')}</p>` +
//           `<p>・トークID：　${newValue.tid}</p>` +
//           `<p>・タレントID：　${newValue.talentId}</p>` +
//           `<p>・ファンID：　${newValue.userId}</p>` +
//           `<p>・値段：　${newValue.price}円</p>` +
//           `<p>・リンク：　<a href="https://o2-talk.firebaseapp.com/talks/${newValue.tid}">https://o2-talk.firebaseapp.com/talks/${newValue.tid}</a></p>`
//       }
//       mailTransport.sendMail(startemail, (err, info) => {
//           if (err) {
//               return console.log(err)
//           }
//           return console.log('success')
//       })
//
//       admin.firestore().collection('talks').doc(newValue.tid).get().then(function(doc) {
//         var talk = doc.data()
//         if (!(talk.talentId in talk.enterList)) {
//           var temail = {
//               from: gmailEmail,
//               to: '',
//               subject: `【タレントがトークに遅刻しています。】`,
//               html: `<p>トークが開始されましたが、タレントがトークに遅刻しています。</p>` +
//               `<br>` +
//               `<p>トーク内容</p>` +
//               `<p>・開始予定時刻：　${dayjs(newValue.startTime * 1000).add(9, 'hour').format('YYYY/MM/DD kk:mm')}</p>` +
//               `<p>・終了予定時刻：　${dayjs(newValue.endTime * 1000).add(9, 'hour').format('YYYY/MM/DD kk:mm')}</p>` +
//               `<p>・トークID：　${newValue.tid}</p>` +
//               `<p>・タレントID：　${newValue.talentId}</p>` +
//               `<p>・ファンID：　${newValue.userId}</p>` +
//               `<p>・値段：　${newValue.price}円</p>` +
//               `<p>・リンク：　<a href="https://o2-talk.firebaseapp.com/talks/${newValue.tid}">https://o2-talk.firebaseapp.com/talks/${newValue.tid}</a></p>`
//           }
//           mailTransport.sendMail(temail, (err, info) => {
//               if (err) {
//                   return console.log(err)
//               }
//               return console.log('success')
//           })
//         }
//       })
//     });
//   }
// });
//
// // ルーム作成
// exports.listenRoom = functions.firestore.document('rooms/{rid}').onCreate((snap, context) => {
//   var room = snap.data()
//
//   var email = {
//       from: gmailEmail,
//       to: '',
//       subject: `【ルームが作成されました。】`,
//       html: `<p>ルームが作成されました。　リンクからさらに詳しく確認することができます。</p>` +
//       `<br>` +
//       `<p>ルーム内容</p>` +
//       `<p>・ルーム名：　${room.name}</p>` +
//       `<p>・ルームID：　${room.rid}</p>` +
//       `<p>・作成日時：　${dayjs(room.created * 1000).format('YYYY/MM/DD')}</p>` +
//       `<p>・リンク：　<a href="https://o2-talk.firebaseapp.com/talkrooms/${room.rid}">https://o2-talk.firebaseapp.com/talkrooms/${room.rid}</a></p>`
//   }
//   mailTransport.sendMail(email, (err, info) => {
//       if (err) {
//           return console.log(err)
//       }
//       return console.log('success')
//   })
// });
//
//
// // アプリ通知
// // exports.approvalNotification = functions.https.onCall(async (data, context) => {
// //
// //   var myClient = new OneSignal.Client({
// //      userAuthKey: data.userAuthKey,
// //      app: { appAuthKey: '', appId: '' }
// //   });
// //
// //   var text
// //
// //   if (data.isTalent === true) {
// //
// //     if (data.approvalState === 2) {
// //       text = '本人確認写真とプロフィール情報が一致しません。再提出をしてください。'
// //     } else {
// //       text = '本人確認が完了しました。'
// //     }
// //
// //   } else {
// //
// //     if (data.approvalState === 2) {
// //       text = '本人確認写真とプロフィール情報が一致しません。再提出をしてください。'
// //     } else {
// //       text = '本人確認が完了しました。１on１ライブできるようになります。'
// //     }
// //
// //   }
// //
// //   var approvalNotification = new OneSignal.Notification({
// //     contents: {
// //         en: text,
// //         tr: "本人確認申請の結果"
// //     }
// //   });
// //
// //   // approvalNotification.postBody["included_segments"] = ["Active Users"];
// //   // approvalNotification.postBody["excluded_segments"] = ["Banned Users"];
// //   approvalNotification.postBody["include_player_ids"] = [data.userAuthKey]
// //
// //   // approvalNotification.postBody["data"] = {"abc": "123", "foo": "bar"};
// //   // approvalNotification.postBody["send_after"] = 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)';
// //
// //   myClient.sendNotification(approvalNotification, function (err, httpResponse,data) {
// //      if (err) {
// //          console.log('Something went wrong...');
// //      } else {
// //          console.log(data, httpResponse.statusCode);
// //      }
// //   });
// //
// //   var notref = admin.firestore().collection('notification')
// //
// //   notref.add({
// //     signalId: data.user.info.signalId,
// //     userId: data.user.info.userid,
// //     title: data.user.info.nickName + 'さん',
// //     body: text,
// //     type: 5,
// //     sentAt: data.sentat,
// //     canceled: false
// //   }).then(doc => {
// //     console.log(doc.id)
// //     notref.doc(doc.id).update({
// //       nid: doc.id
// //     });
// //   });
// //
// //
// // });
//
// exports.fetchPurchase = functions.https.onCall(async (data, context) => {
//   // var purchases = []
//   var payments = []
//   await admin.firestore().collection('purchase').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       payments.push(doc.data())
//       // purchases.push(doc.data())
//     })
//   }).catch((err) => {
//     console.log('fetch失敗')
//   })
//   return { payments: payments }
//   // return { purchases: purchases }
// });
//
// // payment
// exports.fetchPayment = functions.https.onCall(async (data, context) => {
//   var payments = []
//   await admin.firestore().collection('payment').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       payments.push(doc.data())
//     })
//   }).catch((err) => {
//     console.log('fetch失敗')
//   })
//   return { payments: payments }
// });
//
// // charge
// exports.fetchCharge = functions.https.onCall(async (data, context) => {
//   var charges = []
//   await admin.firestore().collection('charge').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       charges.push(doc.data())
//     })
//   }).catch((err) => {
//     console.log('fetch失敗')
//   })
//   return { charges: charges }
// });
//
// // refund
// exports.fetchRefund = functions.https.onCall(async (data, context) => {
//   var refunds = []
//   await admin.firestore().collection('refund').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       refunds.push(doc.data())
//     })
//   }).catch((err) => {
//     console.log('fetch失敗')
//   })
//   return { refunds: refunds }
// });
//
// exports.withdrawStatusChange = functions.https.onCall(async (data, context) => {
//   console.log('wid', data.wid)
//   await admin.firestore().collection('withdraw').doc(data.wid).update({
//     status: 1
//   })
// })
//
// exports.fetchWithdraw = functions.https.onCall(async (data, context) => {
//   var withdraw = []
//   await admin.firestore().collection('withdraw').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       withdraw.push(doc.data())
//     })
//   }).catch((err) => {
//     console.log('fetch失敗')
//   })
//   return { withdraw: withdraw }
// });
