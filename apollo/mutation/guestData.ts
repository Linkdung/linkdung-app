export const createGuestDataMutation = gql`
  mutation Insert($data: NewLinktree!) {
    createLink(input: $data) {
      id
      endpoint
      header
      titles
      links
    }
  }
`;
export const updateGuestDataMutation = gql`
  mutation Update($id: String!, $data: NewLinktree!) {
    updateLink(id: $id, input: $data) {
      id
      endpoint
      header
      titles
      links
    }
  }
`;
