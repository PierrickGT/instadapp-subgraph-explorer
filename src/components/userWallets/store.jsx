import gql from 'graphql-tag';

import { Container } from 'unstated';

import { queryUserWallets, queryUserWallet } from './query';

/**
 * UserWalletsStore Container
 * @extends Container
 */
export default class UserWalletsStore extends Container {
    /**
     * Creates an instance of UserWalletsStore
     * @param {Object} props Component props
     */
    constructor(props) {
        super(props);

        /**
         * Component state
         * @type {Object}
         */
        this.state = {
            data: {},
            error: null,
            loading: true
        };
    }

    /**
     * Get UserWallets from database
     * @param  {Object} apolloClient ApolloClient
     * @param  {Number} pageNumber   Page number to query
     * @return {State}               New UserWallets state
     */
    getUserWallets(apolloClient, pageNumber) {
        const query = gql(queryUserWallets(pageNumber));

        this.setState({
            loading: true
        });

        return apolloClient
            .query({ query })
            .then(result => {
                this.setState({
                    data: result.data,
                    error: null,
                    loading: false
                });
            })
            .catch(error => {
                this.state = {
                    data: {},
                    error,
                    loading: false
                };
            });
    }

    /**
     * Get UserWallet by address from database
     * @param  {Object} apolloClient    ApolloClient
     * @param  {String} field         Field to query
     * @param  {String} value         Value to query
     * @return {State}                  New UserWallets state
     */
    getUserWallet(apolloClient, field, value) {
        const query = gql(queryUserWallet(field, value));

        this.setState({
            loading: true
        });

        return apolloClient
            .query({ query })
            .then(result => {
                this.setState({
                    data: result.data,
                    error: null,
                    loading: false
                });
            })
            .catch(error => {
                this.state = {
                    data: {},
                    error,
                    loading: false
                };
            });
    }
}
