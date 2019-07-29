$(document).ready(function(){

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
    
})
  
var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: "",
    
    questions: {
        q1: "Who refers to The Ring as 'My precious'?",
        q2: "What is Gollum's actual birth name?",
        q3: "Where does The Ring have to be destroyed?",
        q4: "They are known as 'Ringwraiths, Black Riders, and 'the Nine', but what is their true title?"

    },
    options: {
        q1: ["Gollum", "Frodo Baggins", "Bilbo Baggins", "Samwise Gamgee"],
        q2: ["Smeagol", "Strider", "Nazgul", "Sauron"],
        q3: ["Mount Doom", "The Shire", "Dead Marshes", "Dale"],
        q4: ["Nazgul", "Uruk-hai", "Wargs", "Fell beasts"]
    },
    answers: {
        q1: "Gollum",
        q2: "Smeagol",
        q3: "Mount Doom",
        q4: "Nazgul"
    }
}

startGame: function() {
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // game section
    $("#game").show();


    // last results
    $("#results").html();

    // showing timer
    $("#timer").text(trivia.timer);

    // gets rid of start button
    $("#start").hide();

    // shows remaining time
    $("#remaining-time").show();

    // initialize first question
    trivia.nextQuestion();

},

  // method to loop through and display questions and options 
  nextQuestion : function(){
    
    // set timer to 20 seconds each question
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    // creates all the trivia guess options in the html
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
},
  
  timerRunning: function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
      
    else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
