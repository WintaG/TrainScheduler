$(document).ready(function(){
	// 1. Link to Firebase
	var trainData = new Firebase("https://train-database.firebaseio.com/");

	// 2. Button for adding Trains
	$("#addTrainBtn").on("click", function(){

		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		var lineName = $("#lineInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		// Test for variables entered
		console.log(trainName);
		console.log(lineName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		// Creates local "temporary" object for holding train data
		// Will push this to firebase
		var newTrain = {
			name:  trainName,
			line: lineName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		// pushing trainInfo to Firebase
		trainData.push(newTrain);

		// clear text-boxes
		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		// Prevents page from refreshing
		return false;
	});

	trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;

		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});$(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9oH1-j0Np4hdg-9lb0MJlOmgpSKqhUWU",
    authDomain: "timesheet-9889a.firebaseapp.com",
    databaseURL: "https://timesheet-9889a.firebaseio.com",
    projectId: "timesheet-9889a",
    storageBucket: "",
    messagingSenderId: "1094795531366"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var name = "";
  var role = "";
  var startDate = "";
  var monthlyRate = "";
  var monthsWorked = "";
  var total = monthsWorked + monthlyRate;

  $("#addButton").on("click", function(event) {
    event.preventDefault()
    name = $("#name").val();
    role = $("#role").val();
    startDate = $("#startDate").val();
    monthlyRate = $("#rate").val();

    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });




  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);

    $('#newEmployee').append('<tr><td>' + childSnapshot.val().name + '</td>' +
      '<td>' + childSnapshot.val().role + '</td>' +
      '<td>' + childSnapshot.val().startDate + '</td>' +
      '<td>' + childSnapshot.val().monthlyRate + '</td></tr>');

    return;
    var newTr = $("<tr class='employee'>");
    var total = $("<td id='total'>");
    var rate = $("<td id='mRate'>" + childSnapshot.val().monthlyRate);
    var worked = $("<td id='worked'>");
    var start = $("<td id='start'>" + childSnapshot.val().startDate);
    var role = $("<td id='eRole'>" + childSnapshot.val().role);
    var eName = $("<td id='eName'>" + childSnapshot.val().name);

    $("#newEmployee").append(newTr);

    // newTr.html(total);
    newTr.append(rate);
    $(".employee").append(worked);
    $(".employee").append(start);
    $(".employee").append(role);
    $(".employee").append(eName);



    //$("#name-display").html(childSnapshot.val().name);
    //$("#role-display").html(childSnapshot.val().role);
    //$("#date-display").html(childSnapshot.val().startDate);
    //$("#rate-display").html(childSnapshot.val().monthlyRate);
    //$("#days-display").html(monthAtWork.val());
    //$("#bill-display").html(bRate.val());


  })

  var day = moment().format("DD-MM-YY");
  console.log(day)

});
