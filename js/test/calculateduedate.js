/**
 * Unit tests
 */

/* global describe it */

const assert = require('assert');
const {
    parseDate,
    formatDate,
    addWorkingHours,
    calculateDueDate
} = require('../calculateduedate.js');

/* eslint-disable max-len */

describe('DueDate module', function(){

    describe('parseDate', function(){
        it('valid1',  () => { assert.equal(parseDate('2018-08-03 12:34:56').getTime(), 1533292496000); });
        it('valid2',  () => { assert.equal(parseDate('2018-08-03 12:34').getTime(), 1533292440000); });
        it('invalid', () => { assert.equal(parseDate('2018-08-32 24:15').getTime(), Date.now()); });
    });

    describe('formatDate', function(){
        it('single placeholder', () => {
            assert.equal(formatDate(new Date('2018-08-03 12:34:56'), 'Y.m.d. H:i:s'), '2018.08.03. 12:34:56');
        });
        it('multiple placeholder', () => {
            assert.equal(formatDate(new Date('2018-08-03 12:34:56'), 'H:i Y-m-d H:i'), '12:34 2018-08-03 12:34');
        });
    });

    describe('addWorkingHours', function(){
        it('none', () => {
            assert.equal(addWorkingHours(new Date('2018-08-02 12:34'),  0).getTime(), (new Date('2018-08-02 12:34')).getTime());
        });
        it('1 day', () => {
            assert.equal(addWorkingHours(new Date('2018-08-02 12:34'),  3).getTime(), (new Date('2018-08-02 15:34')).getTime());
        });
        it('2 days', () => {
            assert.equal(addWorkingHours(new Date('2018-08-02 12:34'),  9).getTime(), (new Date('2018-08-03 13:34')).getTime());
        });
        it('3 days', () => {
            assert.equal(addWorkingHours(new Date('2018-08-01 12:34'), 15).getTime(), (new Date('2018-08-03 11:34')).getTime());
        });
        it('1 weekend', () => {
            assert.equal(addWorkingHours(new Date('2018-08-03 12:34'),  8).getTime(), (new Date('2018-08-06 12:34')).getTime());
        });
        it('1 weekend + 2 days', () => {
            assert.equal(addWorkingHours(new Date('2018-08-03 12:34'), 21).getTime(), (new Date('2018-08-08 09:34')).getTime());
        });
        it('2 weekends + 3 days', () => {
            assert.equal(addWorkingHours(new Date('2018-08-02 12:34'), 62).getTime(), (new Date('2018-08-14 10:34')).getTime());
        });
    });

    describe('CalculateDueDate', function(){
        it('continuous',  () => { assert.equal(calculateDueDate('2018-08-02 12:34', 3), '2018-08-02 15:34:00'); });
        it('gappy hours', () => { assert.equal(calculateDueDate('2018-08-02 12:34:56', 9), '2018-08-03 13:34:56'); });
        it('gappy days',  () => { assert.equal(calculateDueDate('2018-08-02 12:34:56', 15), '2018-08-06 11:34:56'); });
        it('format1',     () => { assert.equal(calculateDueDate('2018.08.02. 12:00', 15, 'Y.m.d. H:i'), '2018.08.06. 11:00'); });
        it('format2',     () => { assert.equal(calculateDueDate('Aug 02 2018 11:20:01', 62), '2018-08-14 09:20:01'); });
    });

});
