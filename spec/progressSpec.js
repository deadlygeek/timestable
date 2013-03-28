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
        var newArray = tt.pickTopProgressScores(tempArray,10);
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
        var newArray = tt.pickTopProgressScores(tempArray,10);
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

    it("test the filtering of multiplicand and multiplier", function() {

        tt.setFilter([0,1,2,3,4,5,6,7]);
        tt.resetProgress();

        for (var i = 0; i < tt.progress.length; i++) {
            //test multiplier
            expect(tt.progress[i].multiplier).not.toBe(0);
            expect(tt.progress[i].multiplier).not.toBe(1);
            expect(tt.progress[i].multiplier).not.toBe(2);
            expect(tt.progress[i].multiplier).not.toBe(3);
            expect(tt.progress[i].multiplier).not.toBe(4);
            expect(tt.progress[i].multiplier).not.toBe(5);
            expect(tt.progress[i].multiplier).not.toBe(6);
            expect(tt.progress[i].multiplier).not.toBe(7);

            //test multiplicand
            expect(tt.progress[i].multiplicand).not.toBe(0);
            expect(tt.progress[i].multiplicand).not.toBe(1);
            expect(tt.progress[i].multiplicand).not.toBe(2);
            expect(tt.progress[i].multiplicand).not.toBe(3);
            expect(tt.progress[i].multiplicand).not.toBe(4);
            expect(tt.progress[i].multiplicand).not.toBe(5);
            expect(tt.progress[i].multiplicand).not.toBe(6);
            expect(tt.progress[i].multiplicand).not.toBe(7);
        }
        

    });


});
