import uuid from 'uuid'
import database from '../firebase/firebase.js'

// component call action generator
// action generator return function
// component dispatches function (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
})

// normally return function will not work but we already to use redux-thunk
const startAddExpense = (expenseData = {}) => {

    // this dispatch come form mapDispatchtoProps
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        // destructor expenseData
        const {
            description = '',
            note = '', 
            amount = 0,
            createdAt = 0
        } = expenseData
        // declare expense and use destructord to expense
        const expenses = { description, note, amount, createdAt }
        // return function to test
        // in test file we can use then because this is asyn function
        return database.ref(`users/${uid}/expenses`).push(expenses).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expenses
            }))
        })
    }
}

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id}))
        })
    }
}

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates))
        })
    }
}

//SET_EXPENSE
const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {

            const Expenses = []

            snapshot.forEach((childSnapshot) => {
                Expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpenses(Expenses))
        })
    }
}

export { addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense }