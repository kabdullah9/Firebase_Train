var config = {
    apiKey: "AIzaSyCE0MXcQAvsoLjQbxRy34u5AFz_4KcoSJ4",
    authDomain: "fir-train-hw.firebaseapp.com",
    databaseURL: "https://fir-train-hw.firebaseio.com",
    projectId: "fir-train-hw",
    storageBucket: "fir-train-hw.appspot.com",
    messagingSenderId: "270994519113"
  };
  firebase.initializeApp(config);

  var database= firebase.database()
 
 $("#add-train-btn").click(function(){
   
    event.preventDefault();

    var trainName = $("#train-name-input").val();
    var destinationName = $("#destination-input").val();
    var firstTrainTime = $("#first-train-time-input").val();
    var freqMin = $("#frequency-input").val();

    console.log(trainName);
    console.log(destinationName);
    console.log(firstTrainTime);
    console.log(freqMin);
  
    var dataObject = {
      TrainName: trainName,
      destinationName : destinationName,
      firstTrainTIme: firstTrainTime,
      freqMin: freqMin
    }

    database.ref().push(dataObject);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
    $("#train-name-input").focus();
  });

database.ref().on("child_added", function(snap){

  var trainName = snap.val().TrainName;
  var destinationName = snap.val().destinationName;
  var firstTrainTIme = snap.val().firstTrainTIme;
  var freqMin = snap.val().freqMin;
  
  console.log("First:"+firstTrainTIme);
  console.log("Freq:"+freqMin);

    var now = moment();
   
    var convertedFirstTime = moment(firstTrainTIme, "h:mm:a");
  
    var timeDif = moment(now).diff(convertedFirstTime, "minutes");
    console.log(timeDif);

    var mod =  timeDif % freqMin ;
    console.log("Mod: "+mod);

    var timeTillNext = freqMin - mod;
    console.log("timeTillNextTrain :"+timeTillNext);

    var nextArrival = moment().add(timeTillNext, "minutes");
    nextArrival = moment(nextArrival).format("h:mm A");

      var newtblrow = '<tr><td>'+firstTrainTIme+'</td><td>'+trainName+'</td><td>'+destinationName+'</td><td>'+freqMin+'</td><td>'+nextArrival+'</td><td>'+timeTillNext+'</td></tr>';
      $("#resultsTB").append(newtblrow);
  
});