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