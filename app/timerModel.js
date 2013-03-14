(function () {
    'use strict';

    var currentMinute = "0";
    var currentSecond = "00";
    var isTimerRunning = false;

    var totalAccumulatedTimeInMilliseconds = 0;
    var dateAtTimerStart = false;


    var updateMillisecondsToNow = function() {
        var now = new Date().getTime();

        totalAccumulatedTimeInMilliseconds = now - dateAtTimerStart;
    };

    //API
    this.simpleTimer = {};

    this.simpleTimer.getMilliseconds = function() {

        if (dateAtTimerStart === false) {
            //timer was never started
            return 0;
        } else if (isTimerRunning) {
            updateMillisecondsToNow();
            return totalAccumulatedTimeInMilliseconds;
        } else {
            return totalAccumulatedTimeInMilliseconds;
        }

    };

    this.simpleTimer.stopTimer = function() {
        isTimerRunning = false;
        updateMillisecondsToNow();
    };

    //reset donest stop the timer from running
    this.simpleTimer.resetTimer = function() {
        totalAccumulatedTimeInMilliseconds = 0;
        dateAtTimerStart = new Date().getTime();
    };

    this.simpleTimer.startTimer = function() {
        isTimerRunning = true;
        totalAccumulatedTimeInMilliseconds = 0;
        dateAtTimerStart = new Date().getTime();
    };

    this.simpleTimer.isRunning = function() {
        return isTimerRunning;
    };

    this.simpleTimer.formatMinutesSeconds = function() {

        var seconds = Math.floor(((totalAccumulatedTimeInMilliseconds / 1000) % 60)).toString();
        var minutes = Math.floor(((totalAccumulatedTimeInMilliseconds / 1000) / 60)).toString();

        //check that seconds is two characters long
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }

        currentMinute = minutes;
        currentSecond = seconds;

    };

}).call(this);
