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
var playerRef;
var players = [];

function player(){
	this.name = "";
	this.wins = 0;
	this.losses = 0;
	this.position = 0;
}

//on connect
connectedRef.on("value", function(snapshot){
	if(snapshot.val()){
		var con = connectionsRef.push(new player());
		console.log("con: ", con);
		connectionId = con.path.ct[1];
		playerRef = database.ref("connections/"+connectionId);
	}
	con.onDisconnect().remove();
});

//when a new connection to the firebase is made from anywhere.
connectionsRef.orderByChild().on("value", function(snapshot){
	$("#player1").text(snapshot.child(connectionId + "/name").val());
	if(snapshot.numChildren() > 1){
		$("#player2").text(snapshot.child(connectionId + "/name").val());
	}
});


$("#nameForm").submit(function(event){
	event.preventDefault();
	var pName = $("#playerName").val();
	console.log(database.ref(connectionId).child("name"))
	//update the name in the firebase.
	playerRef.child("name").transaction(function(name){
		return pName;
	});
});

$("chatForm").submit(function(event){
	event.preventDefault();
	console.log("test", database.DataSnapshot);
});

