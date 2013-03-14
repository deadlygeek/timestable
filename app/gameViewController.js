(function () {
    'use strict';

    var userAnswer = "0";
    var correctAnswer;
    var INPUT_INTERVAL_DELAY = 300;
    var RESULTS_INTERVAL_DELAY_CORRECT = 1000;
    var RESULTS_INTERVAL_DELAY_WRONG = 3000;
    var inputIntervalID, showResultsIntervalID;
    var currentQuestion;

    var pickNewQuestion = function() {
        //select the question
        currentQuestion = tt.choose();

        //calculate the correct answer
        correctAnswer = currentQuestion.multiplicand * currentQuestion.multiplier;

        //push the question onto the screen
        $('#question').html(currentQuestion.multiplicand + " x " + currentQuestion.multiplier + " = ?");

        linkKeyPad();

        //start the timer
        simpleTimer.startTimer();

    };

    var checkAnswer = function() {

        var intervalDelay;

        var timeUsed = simpleTimer.getMilliseconds();
        if (timeUsed > tt.STARTING_PROGRESS) {
            timeUsed = tt.STARTING_PROGRESS;
        }

        if (correctAnswer === parseInt(userAnswer, 10)) {
            updateResults("CORRECT! (" + simpleTimer.getMilliseconds() + ")");
            currentQuestion.ms = simpleTimer.getMilliseconds();
            intervalDelay = RESULTS_INTERVAL_DELAY_CORRECT;
        } else {
            updateResults("WRONG! -- " + correctAnswer);
            currentQuestion.ms = tt.STARTING_PROGRESS;
            intervalDelay = RESULTS_INTERVAL_DELAY_WRONG;
        }

        unlinkKeyPad();

        updateAnswer("");
        clearInterval(showResultsIntervalID);
        showResultsIntervalID = setInterval(handleShowResultsTimer, intervalDelay);

        //save the results
        tt.saveProgress();

    };

    var handleShowResultsTimer = function() {
        clearInterval(showResultsIntervalID);
        clearNumbersAndPickNewQuestion();
    };

    var clearNumbersAndPickNewQuestion = function() {
        updateResults(" ");
        clearNumbers();
        pickNewQuestion();
    };

    var handleInput = function(value) {
        if (userAnswer === "0") {
            userAnswer = value;

            //if this is a single digit answer check it now
            if (correctAnswer < 10) {
                startCheckAnswerTimer();
            }

        } else if (userAnswer.length === 1) {
            userAnswer += value;
            startCheckAnswerTimer();
        }

        updateAnswer(userAnswer);
    };

    var startCheckAnswerTimer = function() {
        //stop the answer timer
        simpleTimer.stopTimer();

        clearInterval(inputIntervalID);
        inputIntervalID = setInterval(handleCheckAnswerTimer, INPUT_INTERVAL_DELAY);
    };

    var handleCheckAnswerTimer = function() {
        clearInterval(inputIntervalID);
        checkAnswer();
    };

    var clearNumbers = function() {
        userAnswer = "0";
        updateAnswer(userAnswer);
    };

    var updateResults = function(value) {
        $('#result').html(value);
    };

    var updateAnswer = function(value) {
        $('#answer').html(value);
    };


    var handleTap = function(e) {
        var key; 

        e.preventDefault();
        e.stopImmediatePropagation();

        key = e.currentTarget.attributes['key-value'].value;

        if (key === "c") {
            clearNumbers();
        } else if (key === "e") {
            checkAnswer();
        } else {
            handleInput(key);
        }

    };

    var unlinkKeyPad = function() {
        $(".keybutton").unbind("tap", handleTap);
    };

    var linkKeyPad = function() {
        $(".keybutton").bind("tap", handleTap);
    };


    //PUBLIC API

    this.gvc = {};

    this.gvc.initGame = function() {
        pickNewQuestion();
    };

}).call(this);
