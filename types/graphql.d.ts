// Type declaration untuk import file *.gql
// vite-plugin-graphql-loader transform setiap .gql → DocumentNode
// sehingga bisa langsung dipakai Apollo client.query() / client.mutate()

declare module '*.gql' {
  import type { DocumentNode } from 'graphql'
  const document: DocumentNode
  export default document
}

declare module '*.graphql' {
  import type { DocumentNode } from 'graphql'
  const document: DocumentNode
  export default document
}
