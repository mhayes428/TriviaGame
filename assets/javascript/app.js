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
        q1: "Who is ",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q6: "",
        q7: "",

    }
}