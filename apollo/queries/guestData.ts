export const getGuestData = gql`
  query FindAll {
    linktrees {
      id
      endpoint
      header
      titles
      links
    }
  }
`;

export const getGuestWithId = gql`
  query FindById($id: String!) {
    linktree(_id: $id) {
      endpoint
      header
      titles
      links
    }
  }
`;
