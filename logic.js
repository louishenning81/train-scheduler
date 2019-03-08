/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
    apiKey: "AIzaSyDkTx3oZPQengp6Wa0c9brsPQfc-jj9gXg",
    authDomain: "ladytaythebugalex.firebaseapp.com",
    databaseURL: "https://ladytaythebugalex.firebaseio.com",
    projectId: "ladytaythebugalex",
    storageBucket: "ladytaythebugalex.appspot.com",
    messagingSenderId: "332975401413"
};
firebase.initializeApp(config);



// Create a variable to reference the database.
var database = firebase.database();

var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#submit-train").on("click", function (event) {
    event.preventDefault();

    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency 
    }

    database.ref().push(newTrain);

    $("#name").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function (snapshot) {



    var tname = snapshot.val().name;
    var des = snapshot.val().destination;
    var first = snapshot.val().firstTrain;
    var freq = snapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var min = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + min);

    // Next Train
    var next = moment().add(min, "minutes");
    console.log("ARRIVAL TIME: " + moment(next).format("hh:mm"));

    var tableRow = $("<tr>");
    var nameData = $("<td>");
    var destinationData = $("<td>");
    var firstTrainData = $("<td>");
    var frequencyData = $("<td>");
    var nextArrivalData = $("<td>");
    var minutesAwayData = $("<td>");
    nameData.text(tname)
    destinationData.text(des)
    firstTrainData.text(first)
    nextArrivalData.text(moment(next).format("hh:mm a"));
    minutesAwayData.text(min);
    frequencyData.text(freq);
    tableRow.append(nameData, destinationData, frequencyData, nextArrivalData, minutesAwayData);
    $("tbody").append(tableRow);
})

