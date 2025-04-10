const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.payuSuccessRedirect = functions.https.onRequest(async (req, res) => {
  try {
    console.log('✅ PayU Success POST:', req.body);

    const {
      mihpayid,
      amount,
      email,
      phone,
      productinfo,
    } = req.body;

    // 🔍 Fetch UID from users collection using email
    const usersRef = admin.firestore().collection('users');
    const userSnapshot = await usersRef.where('email', '==', email).limit(1).get();

    if (userSnapshot.empty) {
      console.error('⚠️ No user found with email:', email);
      return res.status(404).send('User not found');
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;

    // 📅 Handle dates
    const planDuration = productinfo.includes('6 Months') ? '6months' : '1year';
    const durationMonths = planDuration === '6months' ? 6 : 12;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    const subscriptionData = {
      amount: Number(amount),
      codeId: planDuration,
      planId: planDuration,
      currency: 'INR',
      email: email || '',
      phoneNumber: phone || '',
      startDate: admin.firestore.Timestamp.fromDate(startDate),
      endDate: admin.firestore.Timestamp.fromDate(endDate),
      remainingCalls: 100,
      remainingMinutes: 100,
      status: 'active',
      timestamp: admin.firestore.Timestamp.fromDate(startDate),
      transactionId: mihpayid,
      userId: userId,
    };

    // ✅ Add to Firestore
    await admin.firestore().collection('subscription').add(subscriptionData);
    console.log('🎉 Subscription saved:', subscriptionData);

    res.redirect(302, 'http://localhost:3000/success'); // ✅ Change to production URL later
  } catch (error) {
    console.error('🔥 Error handling payment success:', error);
    res.status(500).send('Something went wrong');
  }
});

exports.payuFailureRedirect = functions.https.onRequest((req, res) => {
  console.log('❌ PayU Failure:', req.body);
  res.redirect(302, 'http://localhost:3000/failure'); // ✅ Change to production URL later
});
