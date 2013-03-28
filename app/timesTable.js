(function () {
    'use strict';

    var me = this;

    //an array of numbers that will not be shown to the user
    var filter = [];

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

    //a helper function used to create / reset the progress array
    var initProgress = function() {
        var ra = [];
        var includeInQuestions;

        for (var i = 0; i <= 9; i++) {
            for (var y = 0; y <= 9; y++) {

                includeInQuestions = true;

                for (var z = 0; z < filter.length; z++) {
                    if (y === filter[z] || i === filter[z]) {
                        includeInQuestions = false;
                        break;
                    }
                }

                if (includeInQuestions) {
                    var tempObj = {'ms':me.tt.STARTING_PROGRESS, 'multiplicand': i, 'multiplier': y};
                    ra.push(tempObj);
                }
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
    this.tt.pickTopProgressScores = function(progress, amount) {

        //if a large group of items have the same time it prevents the same items from displaying over and over
        arrayShuffle(progress);

        progress.sort(progressSorter);

        return progress.slice(0,amount);
    };

    this.tt.resetProgress = function() {
        tt.progress = [];
        tt.progress = initProgress();
    };

    /*
     * Randomly pick one progress item from the top four highest progress scroes.
     */
    this.tt.choose = function() {

        //get the top ten items
        var topTenItems = tt.pickTopProgressScores(tt.progress, 4);

        //randomly pick 1 item from the top ten items.
        var item = topTenItems[Math.floor(Math.random() * topTenItems.length)];

        return item;

    };

    this.tt.setFilter = function(newFilters) {
        filter = newFilters;
    };

    this.tt.getFilter = function() {
        return filter;
    };

}).call(this);
