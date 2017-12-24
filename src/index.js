var config = {
    apiKey: "AIzaSyDtWmHBfmDSMu8slmlMHrjdMSekwGEn9GQ",
    authDomain: "pizzatwilio.firebaseapp.com",
    databaseURL: "https://pizzatwilio.firebaseio.com",
    projectId: "pizzatwilio",
    storageBucket: "pizzatwilio.appspot.com",
    messagingSenderId: "603360306030"
};
// const map =
firebase.initializeApp(config);
var db = firebase.firestore();
window.db = db;

db.collection("messages").onSnapshot((querySnapshot) => {
  const msgs = [];
  querySnapshot.forEach(doc => {
    msgs.push(doc.data());
  });
  let divs = document.querySelectorAll('.msg-wrapper');
  Array.prototype.map.call(divs, div => {
    document.body.removeChild(div);
  });

  msgs.map(msg => {
    const div = document.createElement('div');
    div.classList.add('msg-wrapper');
    const title = document.createElement('p');
    const desc = document.createElement('p');
    const id = document.createElement('p');
    const created = document.createElement('p');
    const hr = document.createElement('hr');
    title.innerHTML = msg.title;
    created.innerHTML = msg.created;
    desc.innerHTML = msg.body;
    id.innerHTML = msg.id;
    div.appendChild(id);
    div.appendChild(title);
    div.appendChild(desc);
    div.appendChild(created);
    div.appendChild(hr);
    document.body.appendChild(div);
  });
  console.log(msgs);
});

// db.collection("messages").doc('message#400').set({
//   newKey: 'alkdjfljdflsaglhdg'
// }, { merge: true });
const button = document.createElement('button');
button.innerHTML = 'add msg';
button.addEventListener('click', e => {
  db.collection("messages").add({
      title: "Ada",
      body: "Lovelace",
  })
});

const backup = document.createElement('button');
backup.innerHTML = 'backup msgs';
backup.addEventListener('click', e => {
  fetch('https://us-central1-pizzatwilio.cloudfunctions.net/backupmsg')
    .then(x => console.log('backup success!'));
});

const restore = document.createElement('button');
restore.innerHTML = 'restore msgs';
restore.addEventListener('click', e => {
  fetch('https://us-central1-pizzatwilio.cloudfunctions.net/restoreMsg')
    .then(x => console.log('restore success!'));
});

const auth = document.createElement('button');
auth.innerHTML = 'google auth';
auth.addEventListener('click', e => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  // var user = result.user;
  const { displayName, email, photoURL } = result.user;


  const div = document.createElement('div');
  const name = document.createElement('p');
  const mail = document.createElement('p');
  const photo = document.createElement('img');

  name.innerHTML = displayName;
  mail.innerHTML = email;
  photo.src = photoURL;
  div.appendChild(name);
  div.appendChild(mail);
  div.appendChild(photo);
  document.body.appendChild(div);



  db.collection("users").add({ displayName, email, photoURL })
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
});

document.body.appendChild(button);
document.body.appendChild(backup);
document.body.appendChild(restore);
document.body.appendChild(auth);
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });


// const arr = [
//     {
//         title: 'messageasdasdasd from local',
//         body: 'local message'
//     },
//     {
//         title: 'message from locsdasadgasdgal',
//         body: 'local message'
//     },
//     {
//         title: 'message from locaafdgadfgl',
//         body: 'local messageafgadfg'
//     },
// ];

// arr.map(msg => db.collection("messages").add(msg));
