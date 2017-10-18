const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// const firestore = new Firestore();
// exports.helloFirestore = functions.https.onRequest((request, response) => {
//   const helloFirestoreRef = firestore.doc(`test/hello`);
//   var helloDoc = {
//     msg: "Hello Firestore"
//   };
//   helloFirestoreRef.set(helloDoc);
//   response.send("Data inserted");
// });

// Send welcome E-mail after registration

// Resize product image

// Resize profile image
