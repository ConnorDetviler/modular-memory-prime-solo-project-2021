const allPatchesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_PATCHES':
        return [...action.payload]
      default:
        return state;
    }
};

export default allPatchesReducer;