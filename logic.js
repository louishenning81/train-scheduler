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

var employeeName = "";
var role = "";
var startDate = "";
var monthlyRate = 0;

$("#submit-employee").on("click", function (event) {
    event.preventDefault();

    employeeName = $("#name").val().trim();
    role = $("#role").val().trim();
    startDate = $("#start").val().trim();
    monthlyRate = $("#rate").val().trim();

    database.ref().push({
        employeeName: employeeName,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,

    }
    )
});

database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log("start snapshot");
    console.log(childSnapshot.val().employeeName);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);

    var tableRow = $("<tr>");
    var nameData = $("<td>");
    var roleData = $("<td>");
    var startData = $("<td>");
    var monthsWorkedData = $("<td>");
    var rateData = $("<td>");
    var totalBilledData = $("<td>");
    nameData.text(childSnapshot.val().employeeName)
    roleData.text(childSnapshot.val().role)
    startData.text(childSnapshot.val().startDate)
    monthsWorkedData.text("123");
    rateData.text(childSnapshot.val().monthlyRate)
    totalBilledData.text("123");
    tableRow.append(nameData, roleData, startData, monthsWorkedData, rateData, totalBilledData);
    $("tbody").append(tableRow);
})

    // full list of items to the well
    // $("tbody").append("<div class='well'><span class='member-name'> " +
    //   childSnapshot.val().name +
    //   " </span><span class='member-email'> " + childSnapshot.val().email +
    //   " </span><span class='member-age'> " + childSnapshot.val().age +
    //   " </span><span class='member-comment'> " + childSnapshot.val().comment +
    //   " </span></div>");