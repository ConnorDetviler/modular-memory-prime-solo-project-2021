const allTagsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_TAGS':
        return [...action.payload]
      default:
        return state;
    }
};

export default allTagsReducer;