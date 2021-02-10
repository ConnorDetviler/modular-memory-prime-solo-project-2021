const patchNamesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PATCH_NAMES':
        // return [...state, ...action.payload]
        return action.payload
      default:
        return state;
    }
};

  // state.details
export default patchNamesReducer;