import detailsReducer from './details.reducer'

describe('Testing the details.reducer', () => {

    test('Test initial state is empty object', () => {
        const action = { type: 'test' };
        const previousState = undefined
        let newState = detailsReducer(previousState, action);
        expect (newState).toEqual({});
    })

    test('Test that new state is object from server', () => {
        const action = { type: 'SET_DETAILS'};
        const previousState = {};
        let newState = detailsReducer(previousState, action);
        expect (newState).toEqual({})
    })

    test('Test that new state is empty object', () => {
        const action = { type: 'ERASE_DETAILS'};
        const previousState = {};
        let newState = detailsReducer(previousState, action);
        expect (newState).toEqual({})
    })
})
