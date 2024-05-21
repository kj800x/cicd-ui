import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8080/api/graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}

export default config
