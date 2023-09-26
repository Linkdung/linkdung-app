const initialState = {
  links: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LINK":
      return {
        ...state,
        links: [...state.links, action.payload],
      };
    case "REMOVE_LINK":
      const updatedLinks = state.links.filter(
        (_, index) => index !== action.payload // ini maksudnya adalah index yang tidak sama dengan action.payload
      );
      return {
        ...state,
        links: updatedLinks,
      };
    default:
      return state;
  }
};

export default reducers;
