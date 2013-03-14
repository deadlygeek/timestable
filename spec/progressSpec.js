describe("Confirm progress data", function() {
    'use strict';

    it("init the progress array", function() {
        tt.resetProgress();
        expect(tt.progress.length).toBe(100);
    });

    it("test the progress array default init. values.", function() {
        expect(tt.progress[0].ms).toBe(tt.STARTING_PROGRESS);
        expect(tt.progress[0].multiplicand).toBe(0);
        expect(tt.progress[0].multiplier).toBe(0);
    });

    //temp array for testing sorting 
    var tempArray = [];
    tempArray.push({'ms':700, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':7000, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':9000, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':100, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':101, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':-10, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':450, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':451, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':449, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':1, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':0, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':2, 'multiplicand': 1, 'multiplier': 1});
    tempArray.push({'ms':2, 'multiplicand': 1, 'multiplier': 1});

    it("tt should return ten items that are sorted from largest to smallest.", function() {
        var newArray = tt.pickTopTenProgressScores(tempArray);
        expect(newArray[0].ms).toBe(9000);
        expect(newArray[1].ms).toBe(7000);
        expect(newArray[2].ms).toBe(700);
        expect(newArray[3].ms).toBe(451);
        expect(newArray[4].ms).toBe(450);
        expect(newArray[5].ms).toBe(449);
        expect(newArray[6].ms).toBe(101);
        expect(newArray[7].ms).toBe(100);
        expect(newArray[8].ms).toBe(2);
        expect(newArray[9].ms).toBe(2);
        expect(newArray.length).toBe(10);

    });
    it("when tt sorts an array of progress objects it should return a top ten array that has 10 elements .", function() {
        var newArray = tt.pickTopTenProgressScores(tempArray);
        expect(newArray.length).toBe(10);
    });

    it("when asking tt to choose an element it should return on object that contains a ms / multiplicand / multiplier property", function() {
        var item = tt.choose();
        expect(item.ms).toBeDefined();
        expect(item.multiplicand).toBeDefined();
        expect(item.multiplier).toBeDefined();
        expect(isNaN(item.ms)).not.toBe(true);
        expect(isNaN(item.multiplicand)).not.toBe(true);
        expect(isNaN(item.multiplier)).not.toBe(true);
    });

    it("when loading a progress the current progress should be overriden", function() {
        tt.resetProgress();
        expect(tt.progress[0].multiplicand).toBe(0);
        expect(tt.progress[0].multiplier).toBe(0);
        expect(tt.progress[0].ms).toBe(10000);
        expect(tt.progress[25].multiplicand).toBe(2);
        expect(tt.progress[25].multiplier).toBe(5);
        expect(tt.progress[25].ms).toBe(10000);

        //override the progress values
        tt.progress[0].multiplicand = "apple";
        tt.progress[0].multiplier = 31;
        tt.progress[0].ms = 2;
        tt.progress[25].multiplicand = "pear";
        tt.progress[25].multiplier = 100;
        tt.progress[25].ms = 333;

        //test that the over ride progress values are there
        expect(tt.progress[0].multiplicand).toBe("apple");
        expect(tt.progress[0].multiplier).toBe(31);
        expect(tt.progress[0].ms).toBe(2);
        expect(tt.progress[25].multiplicand).toBe("pear");
        expect(tt.progress[25].multiplier).toBe(100);
        expect(tt.progress[25].ms).toBe(333);

        //load the progress
        tt.loadProgress();

        //test that the over ridden values have been replaced with expected defaults
        expect(tt.progress[0].multiplicand).toBe(0);
        expect(tt.progress[0].multiplier).toBe(0);
        expect(tt.progress[0].ms).toBe(10000);
        expect(tt.progress[25].multiplicand).toBe(2);
        expect(tt.progress[25].multiplier).toBe(5);
        expect(tt.progress[25].ms).toBe(10000);

    });


});
