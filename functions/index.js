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
  //元600,1200
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

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
