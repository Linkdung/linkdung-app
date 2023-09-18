export const addLink = (link) => {
  return {
    type: 'ADD_LINK',
    payload: link,
  };
};

export const removeLink = (linkIndex) => {
  return {
    type: 'REMOVE_LINK',
    payload: linkIndex,
  };
};