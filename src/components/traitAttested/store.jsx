import gql from 'graphql-tag';

import { Container } from 'unstated';

import buildQuery from './query';

/**
 * TraitAttestedStore Container
 * @extends Container
 */
export default class TraitAttestedStore extends Container {
    /**
     * Creates an instance of TraitAttestedStore
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
     * Get traitAttested from database
     * @param  {Object} apolloClient ApolloClient
     * @param  {Number} pageNumber   Page number to query
     * @return {State}               New traitAttested state
     */
    getTraitAttesteds(apolloClient, pageNumber) {
        const query = gql(buildQuery(pageNumber));

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
