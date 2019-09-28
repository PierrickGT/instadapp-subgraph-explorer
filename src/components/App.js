import ApolloClient from 'apollo-boost';
import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'unstated';

import Layout from './layout';

import { INSTADAPP_SUBGRAPH_API_ENDPOINT } from '../Constants';

/**
 * Bankin Crawler Appolo Client
 * @type {ApolloClient}
 */
const client = new ApolloClient({
    uri: INSTADAPP_SUBGRAPH_API_ENDPOINT
});

/**
 * App Component
 */
export default () => (
    <ApolloProvider client={client}>
        <Provider>
            <Router>
                <Layout />
            </Router>
        </Provider>
    </ApolloProvider>
);
