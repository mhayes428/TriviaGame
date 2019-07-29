var triviaQuestions = [{
    question: "What was the birth name given to Gollum?",
    answerList: ["Frodo", "Smeagol", "Strider", "Bilbo"],
    answer: 1
}, {
    question: "He is known by the name 'Strider'. He is a ranger, a hero, and later becomes King. Name this man!",
    answerList: ["Aragorn", "Legolas", "Gandalf", "Faromir"],
    answer: 0
}, {
    question: "Who starts as the 'Gray Wizard' and later becomes the 'White Wizard'?",
    answerList: ["Boromir", "Sauron", "Sarumon", "Gandalf"],
    answer: 3
}, {
    question: "Who is Frodo's best friend?",
    answerList: ["Samwise Gamgee", "Merry", "Pippin", "Gimli"],
    answer: 0
}, {
    question: "What is the name of the hellish beast in The Fellowship of the Ring that Gandalf must hold off as the rest of the adventurers escape?",
    answerList: ["Balroc", "Goblin King", "Cave troll", "Warg"],
    answer: 0
}, {
    question: "How many Lord of the Rings movies were released?",
    answerList: ["1", "4", "2", "3"],
    answer: 3
}, {
    question: "He is Ned Stark in 'Game of Thrones', but which character does Sean Bean play in Lord of the Rings?",
    answerList: ["Faromir", "Aragorn", "Legolas", "Boromir"],
    answer: 3
}, {
    question: "Who directed the Lord of the Rings trilogy?",
    answerList: ["Peter Jackson", "Steven Spielburg", "George Lucas", "Uwe Boll"],
    answer: 0
}, {
    question: "Name the fortress where our heroes make their final stand in The Two Towers movie.",
    answerList: ["Minas Tirith", "Dale", "Helm's Deep", "Minas Morgul"],
    answer: 2
},];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Correctomundoooo!",
    incorrect: "Nope!",
    endTime: "FIN!",
    finished: "How'd you do?"
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;


    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();

    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;

    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $("#gif").html("<img src = 'assets/images/gandalf-gif.gif'" + gifArray[currentQuestion] + '.gif" width = "400px">');

    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}