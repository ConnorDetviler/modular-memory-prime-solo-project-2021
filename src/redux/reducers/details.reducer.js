const detailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DETAILS':
        return {...state, ...action.payload}
      default:
        return state;
    }
};

  // user will be on the redux state at:
  // state.details
export default detailsReducer;
