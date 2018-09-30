var config = {
    apiKey: "AIzaSyCDqQNyM4ET7k8-Yf5JOtkaJegQDxw1FVs",
    authDomain: "train-9aed4.firebaseapp.com",
    databaseURL: "https://train-9aed4.firebaseio.com",
    projectId: "train-9aed4",
    storageBucket: "",
    messagingSenderId: "42992138656"
};

firebase.initializeApp(config);

var database = firebase.database();

$('#add-train-btn').on('click', function(event) {
    event.preventDefault();

    var trainName = $('#train-name-input').val().trim();
    var destination = $('#des-input').val().trim();
    var startTime = $('#start-input').val().trim();
    var rateTer = $('#rate-input').val().trim();

    var newTrain = {
        name: trainName,
        dest: destination,
        start: startTime,
        frequency: rateTer,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    

    alert("Train succesfully added");

    $('#train-name-input').val("");
    $('#des-input').val("");
    $('#start-input').val("");
    $('#rate-input').val("");
});

database.ref().once("child_added", function(childSnapshot){
    var trainTitle = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;

    console.log(trainDest);
    console.log(trainTitle);
    console.log(trainStart);
    console.log(trainFreq);
    

    var trainStarter = moment.unix(trainStart).format("MM/DD/YYYY");

    var trainArrival = moment().diff(moment(trainStart, "X"), "minutes");
    console.log(trainArrival);

    var newRow = $('<tr>').append(
        $('<td>').text(trainTitle),
        $('<td>').text(trainDest),
        $('<td>').text(trainStart),
        $('<td>').text(trainFreq),
        $('<td>').text(trainStarter),
        $('<td>').text(trainArrival),
    );

    $("#train-table > tbody").append(newRow);

});