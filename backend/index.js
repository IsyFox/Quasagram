//Dependencias
const express = require('express');
var admin = require("firebase-admin");

//Config - express
const app = express();

//Config - firebase
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//endpoint
app.get('/posts', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  let posts = [];
  db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
    snapshot.forEach(doc => {
      posts.push(doc.data());
    });
    response.json(posts);
  });
})

app.listen(process.env.PORT || 3000);

