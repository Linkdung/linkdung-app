export const createGuestDataMutation = gql`
  mutation Create($data: LinktreeInput!) {
    linktree {
      createLink(input: $data) {
        endpoint
        header
        titles
        links
      }
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
