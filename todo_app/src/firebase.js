import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyDfA3kalj8fhk5WAg8LrrhG8M0iqq_kmWU",
    authDomain: "todo-app-62371.firebaseapp.com",
    databaseURL: "https://todo-app-62371.firebaseio.com",
    projectId: "todo-app-62371",
    storageBucket: "todo-app-62371.appspot.com",
    messagingSenderId: "105392163099",
    appId: "1:105392163099:web:062c3729ed219fde512bbe",
    measurementId: "G-L862QQNQBZ"

});

const db = firebaseApp.firestore();

export default db;    // you can write alss :  export { db }