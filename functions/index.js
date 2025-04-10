const functions = require('firebase-functions');

// 🔁 Redirect after success
exports.payuSuccessRedirect = functions.https.onRequest((req, res) => {
  console.log('PayU Success POST:', req.body);
  res.redirect(302, 'http://localhost:3000/success');  // Change to production URL later
});

// 🔁 Redirect after failure
exports.payuFailureRedirect = functions.https.onRequest((req, res) => {
  console.log('PayU Failure POST:', req.body);
  res.redirect(302, 'http://localhost:3000/failure');  // Change to production URL later
});
