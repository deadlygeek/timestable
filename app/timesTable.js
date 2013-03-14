(function () {
    'use strict';

    var me = this;


    /*
     * 
     * Progress learning the times table is tracked by recording the time it takes for the player
     * to answer every combination of the ten times table.  The longer the player takes to answer
     * a particular question the more likely that combination will be shown to the player again
     * in the future.
     *
     * progress[]
     * progress[0] = {'ms':10000, 'multiplicand':8, 'multiplier':2}
     * progress[1] = {'ms':453, 'multiplicand':8, 'multiplier':4}
     * progress[2] = {'ms':332, 'multiplicand':7, 'multiplier':7}
     * progress[3] = {'ms':220, 'multiplicand':9, 'multiplier':3}
     * progress[4] = {'ms':5000, 'multiplicand':2, 'multiplier':2}
     * ...
     *
     * ms = milliseconds which is capped at 10000 (10 seconds).
     *
     */

    //pubic API
    this.tt = {};
    this.tt.STARTING_PROGRESS = 10000;
    this.tt.progress = [];

    //detect if current environment supports localStorage
    var supportsLocalStorage = function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    };

    //a helper function used to create / reset the progress array
    var initProgress = function() {
        var ra = [];
        for (var i = 0; i <= 9; i++) {
            for (var y = 0; y <= 9; y++) {
                var tempObj = {'ms':me.tt.STARTING_PROGRESS, 'multiplicand': i, 'multiplier': y};
                ra.push(tempObj);
            }
        }

        return ra;
    };

    var arrayShuffle = function ( myArray ) {
        var i = myArray.length, j, tempi, tempj;

        if ( i === 0 ) {
            return false;
        }
        
        while ( --i ) {
            j = Math.floor( Math.random() * ( i + 1 ) );
            tempi = myArray[i];
            tempj = myArray[j];
            myArray[i] = tempj;
            myArray[j] = tempi;
        }
    };

    var progressSorter = function(a, b) {

        if (a.ms > b.ms) {
            return -1;
        } else if (a.ms === b.ms) {
            return 0;
        }
        return 1;

    };

    //pass in the progress array to make it easier to test
    this.tt.pickTopTenProgressScores = function(progress) {

        //if a large group of items have the same time it prevents the same items from displaying over and over
        arrayShuffle(progress);

        progress.sort(progressSorter);

        return progress.slice(0,10);
    };

    this.tt.resetProgress = function() {
        tt.progress = [];
        tt.progress = initProgress();
    };

    /*
     * Randomly pick one progress item from the top ten highest progress scroes.
     */
    this.tt.choose = function() {

        //get the top ten items
        var topTenItems = tt.pickTopTenProgressScores(tt.progress);

        //randomly pick 1 item from the top ten items.
        var item = topTenItems[Math.floor(Math.random() * topTenItems.length)];

        return item;

    };

    this.tt.loadProgress = function() {
        //TODO: what if localStarage not supported -- need a nice way to handle this

        var i, y, index, ms, multiplicand, multiplier;

        if (!supportsLocalStorage()) {
            alert("Your browsers does not support localStorage. Progress will not be saved on exit.");
            tt.resetProgress();

            return false;
        }

        //clear progress so a new one can be loaded
        tt.progress = [];

        index = 0;

        for (i = 0; i <= 9; i++) {
            for (y = 0; y <= 9; y++) {
                ms = parseInt(localStorage["timestable.progress.ms." + index], 10);
                multiplicand = parseInt(localStorage["timestable.progress.multiplicand." + index], 10);
                multiplier = parseInt(localStorage["timestable.progress.multiplier." + index], 10);

                // sanity checks //
                if (0 >= ms && ms <= 10000) {
                } else {
                    ms = tt.STARTING_PROGRESS;
                }

                if (0 <= multiplicand && multiplicand <= 9) {
                } else {
                    multiplicand = i;
                }

                if (0 <= multiplier && multiplier <= 9) {
                } else {
                    multiplier = y;
                }
                // end sanity checks //

                //push the data object into the progress array
                tt.progress.push({'ms': ms, 'multiplicand': multiplicand, 'multiplier': multiplier});

                index += 1;

            }
        }

        return tt.progress;

    };

    this.tt.saveProgress = function() {
        var i;

        if (!supportsLocalStorage()) {
            return false;
        }

        for (i = 0; i < tt.progress.length; i++) {
            localStorage["timestable.progress.ms." + i] = tt.progress[i].ms;
            localStorage["timestable.progress.multiplicand." + i] = tt.progress[i].multiplicand;
            localStorage["timestable.progress.multiplier." + i] = tt.progress[i].multiplier;
        } 

    };

}).call(this);
