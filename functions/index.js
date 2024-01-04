/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

var allowlist = [
  // 'http://example1.com',
  // 'http://example2.com',
  'http://localhost:8080',    // ok
  'https://localhost:8080',    // error 
  // 'http://localhost:8081', // error CORS
  'https://ks-server-client2.web.app',
  'https://ks-server-client2.firebaseapp.com/',
]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      // headers: 'content-type',
    } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
const cors = require('cors')(corsOptionsDelegate);

// const cors = require('cors')({
//   // origin: true,                    // ok client : http://localhost:8080
//   // origin: 'http://localhost:8080', // ok
//   // origin: 'http://localhost:8081', // error  CORS
//   origin: [                            // not work (all OK, no error)
//     'http://colorworld.kr',
//     'http://colorworld.co.kr',
//   ],
//   credentials: true,
//   // credentials: false
// });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
exports.helloWorld = onRequest(
  {cors:true},
  // {cors:'localhost:8080'},
  // {cors:'http://localhost:8080'},
  // {cors:['localhost:8080']},
  // {cors:['localhost:8081']},
  (req, res) => {
    cors(req, res, () => {
      // console.log(req.body.data);
      // console.log(JSON.parse(req.body.data));
      // console.log(req.body);
      let userName = '-';
      // console.log(req.body);
      console.log(req.method);
      if (req.method === 'POST') {// if (req.body) {
        // console.log(JSON.parse(req.body));
        j = JSON.parse(req.body);
        // console.log(j.data.username);
        userName = j.data.username;
        // console.log(username);
      }
      else if (req.method === 'GET') {
        // console.log(req.query);
        userName = req.query.username;
      }

      res.cookie('username', userName, {
        maxAge: 900000,
        httpOnly: true,
        sameSite: 'None',
        // sameSite: 'Strict',
        // sameSite: 'Lax',
        secure: true,
        // domain: '127.0.0.1',
        // domain: [
          //   'localhost',
          //   'us-central1-ks-server-client2.cloudfunctions.net'
          // ], // for safari, for develop, not work
        // path:'/',
      });

      const usernameCookie = req.headers.cookie//?.username;
      console.log('usernameCookie:', usernameCookie);
      console.log('userName:',userName);

      logger.info("Hello logs!", { structuredData: true });
      // res.send("Hello from Firebase!!");
      res.json({
        message: 'Hello from Firebase!',
        userName,
        cookieUserName: usernameCookie,
      });
    });
});
