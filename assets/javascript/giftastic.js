//VARIABLES FOR PAGE//
var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "faE0EFB3EbYH1pWILBOb902ZJAsxRIpB";
var gifLimit = "&limit=10";
var topics = ["Odell Beckham Jr.", "Drew Brees", "Ezekiel Elliott", "Aaron Rodgers", "Richard Sherman", "Clay Matthews", "Antonio Brown", "Tom Brady", "Tyreek Hill", "Roger Goodell"];
var athleteButton;
var athleteAdded;
var newAthlete;
var submit;
var athlete;
var outcome;
var outcomeSection;
var outcomeDiv;
var gifRating;
var p;
var athleteIMG;

$(document).ready(function() {
    for (var i = 0; i < topics.length; i++) {
        var athleteButton = $("<button>").text(topics[i]);
        athleteButton.attr("info-athlete", topics[i]);
        athleteButton.addClass("athlete-button");
        $("#athletes").append(athleteButton);
    } 

    $("#athlete-button").on("click", function(event) {
        event.preventDefault();
        var athleteAdded = false;
        if(topics.indexOf($("#athlete-input").val()) !==-1) {
            athleteAdded = true;
        }
        if($("#athlete-input").val() !== "" && athleteAdded === false) {
            var newAthlete = $("#athlete-input").val();
            topics.push(newAthlete);
            var submit = $("<button>").text(newAthlete);
            submit.attr("info-athlete", newAthlete);
            submit.addClass("athlete-button");
            $("#athletes").append(submit);
        }
        $("#athlete-input").val("");
    });
   

    $(document).on("click", ".athlete-button", function() {
        var athlete = $(this).attr("info-athlete");
        var apiKey = "faE0EFB3EbYH1pWILBOb902ZJAsxRIpB";
        var gifLimit = "&limit=10";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athlete + "&api_key=" + apiKey + gifLimit;
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
          var outcome = response.data;

          var outcomeSection = $("<section class='outcome-container'>");

          for (var i = 0; i < outcome.length; i++) {
              var outcomeDiv = $("<div class= 'outcome-container'>");

              var gifRating =  outcome[i].rating;

              var p = $("<p>").text("Rating: " + gifRating);

              var athleteIMG = $("<img class='outcome'>");
              athleteIMG.attr("src", outcome[i].images.fixed_height_still.url);
              athleteIMG.attr("info-state", "still");
              athleteIMG.attr("info-still", outcome[i].images.fixed_height_still.url);
              athleteIMG.attr("info-animate", outcome[i].images.fixed_height.url);

              outcomeDiv.prepend(athleteIMG);
              outcomeDiv.prepend(p);

              outcomeSection.prepend(outcomeDiv);
            }

            $("#athlete-gifs").prepend(outcomeSection);

        });

    });

    //ON-CLICK FUNCTION TO PAUSE AND PLAY DISPLAYED GIF//
    $(document).on("click", ".result", function() {
        var condition = $(this).attr("info-state");

        if (condition === "still") {
            $(this).attr("src", $(this).attr("info-animate"));
            $(this).attr("info-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("info-still"));
            $(this).attr("info-state", "still");
        }
    });
      

});










