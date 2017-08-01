var config = {
    apiKey: "AIzaSyCEAJkc6Y7Q8AtUe9Itr5_XXlngnMbXeJg",
    authDomain: "rps-multiplayer-a57af.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-a57af.firebaseio.com",
    projectId: "rps-multiplayer-a57af",
    storageBucket: "",
    messagingSenderId: "4941196544"
  }
firebase.initializeApp(config);

var database = firebase.database();
var players = database.ref("players");