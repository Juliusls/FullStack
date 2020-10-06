import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from 'apollo-link-context'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-user-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      }
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000'})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const links = ApolloLink.from([
    errorLink,
    authLink,
    httpLink
])

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true
    }
  });

const splitLink = split(
({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    );
},
    wsLink,
    links,
);

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache(),
    link: splitLink
})

ReactDOM.render(
    <ApolloProvider client={client}>
            <App />
    </ApolloProvider>, document.getElementById('root'))