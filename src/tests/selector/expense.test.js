import getVisibleExpenses from '../../selector/expenses'
import moment from 'moment'
import expenses from '../fixtures/expenses' // object to test

// This how to test our filter
// 1 create an Object for test
// 2 thorw it to function

test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'Date',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[1]])
})

test('should filter by start date', () => {
    const filters = {
        text: '',
        sortBy: 'Date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([expenses[2], expenses[0]])
})

test('should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'Date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([ expenses[0], expenses[1] ])
})

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'Date',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([ expenses[2],expenses[0],expenses[1] ])
})

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'Amount',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleExpenses(expenses, filters)
    expect(result).toEqual([ expenses[1],expenses[2],expenses[0] ])
})