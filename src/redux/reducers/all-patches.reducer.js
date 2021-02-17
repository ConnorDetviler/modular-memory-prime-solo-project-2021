const allPatchesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_PATCHES':
        // return [...state, ...action.payload]
        return [...action.payload]
      default:
        return state;
    }
};

  // state.details
export default allPatchesReducer;