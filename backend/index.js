//Dependencias
const express = require('express');
var admin = require('firebase-admin');
let inspect = require('util').inspect;
let Busboy = require('busboy');
let path = require('path');
let fs = require('fs');
let os = require('os');
let UUID = require('uuid-v4');

//Config - express
const app = express();

//Config - firebase
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "quasagram-inc.appspot.com"
});

const db = admin.firestore();
let bucket = admin.storage().bucket();

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

//endpoint
app.post('/createPost', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  let uuid = UUID();

  var bb = Busboy({ headers: request.headers });
  let fields = {};
  let fileData = {};

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
    `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    let filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimeType }
  });

    bb.on('field', (name, val, info) => {
      fields[name] = val;
    });

    bb.on('close', () => {
      bucket.upload(
        fileData.filepath,{
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: fileData.mimeType,
              firebaseStorageDownloadTokens: uuid
            }
          }
        },
        (err, uploadedFile) => {
          if (!err) {
            createDocument(uploadedFile)
          }
        }
      )

      function createDocument(uploadedFile) {
        db.collection('posts').doc(fields.id).set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
        }).then(() => {
          response.send('Post adicionado: ' + fields.id);
        });

      }

    });
    request.pipe(bb);

})

app.listen(process.env.PORT || 3000);

