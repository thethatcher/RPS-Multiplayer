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
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var connectionId;

function player(){
	this.name = "";
	this.wins = 0;
	this.losses = 0;
}

connectedRef.on("value", function(snapshot){
	console.log("connected? ", snapshot.val());
	if(snapshot.val()){
		var con = connectionsRef.push(new player());
		console.log("con: ", con);
		connectionId = con.path.ct[1];
	}
	con.onDisconnect().remove();
});

connectionsRef.on("child_added", function(snapshot){
	console.log("connectionsRef ", snapshot.val());
	console.log("children count: " + snapshot.numChildren());

});

$("#nameForm").submit(function(event){
	event.preventDefault();
	var pName = $("#playerName").val();
	console.log(database.ref(connectionId).child("name"))
	database.ref("connections/"+connectionId).child("name").transaction(function(name){
		return pName;
	});
});

$("chatForm").submit(function(event){
	event.preventDefault();
});