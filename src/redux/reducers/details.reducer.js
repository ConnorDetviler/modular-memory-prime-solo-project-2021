const detailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DETAILS':
        return {...state, ...action.payload}
      case 'ERASE_DETAILS':
        return {}
      default:
        return state;
    }
};

  // state.details
export default detailsReducer;
