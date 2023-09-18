const initialState = {
  links: [],
};

const linkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LINK':
      return {
        ...state,
        links: [...state.links, action.payload],
      };
    default:
      return state;
  }
};

export default linkReducer;
