const detailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DETAILS':
        return {...state, ...action.payload}
      default:
        return state;
    }
};

  // state.details
export default detailsReducer;
