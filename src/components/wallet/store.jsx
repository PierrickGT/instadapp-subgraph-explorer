import gql from 'graphql-tag';

import { Container } from 'unstated';

import {
    queryCompoundToMaker,
    queryMakerToCompound,
    queryOpenedCDPs,
    queryWipedCDPs
} from './query';

/**
 * OpenedCDPsStore Container
 * @extends Container
 */
export class OpenedCDPsStore extends Container {
    /**
     * Creates an instance of OpenedCDPsStore
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
     * Get UserOpenedCDPs from database
     * @param  {Object} apolloClient ApolloClient
     * @param  {Number} address   Address to query
     * @return {State}               New UserWallets state
     */
    getUserOpenedCDPs(apolloClient, address) {
        const query = gql(queryOpenedCDPs(address));

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

/**
 * WipedCDPsStore Container
 * @extends Container
 */
export class WipedCDPsStore extends Container {
    /**
     * Creates an instance of WipedCDPsStore
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
     * Get UserWipedCDPs from database
     * @param  {Object} apolloClient ApolloClient
     * @param  {Number} address   Address to query
     * @return {State}               New UserWallets state
     */
    getUserWipedCDPs(apolloClient, address) {
        const query = gql(queryWipedCDPs(address));

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

/**
 * MakerToCompoundContainer
 * @extends Container
 */
export class MakerToCompoundContainer extends Container {
    /**
     * Creates an instance of MakerToCompoundStore
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
     * Get UserMakerToCompound from database
     * @param  {Object} apolloClient ApolloClient
     * @param  {Number} address   Address to query
     * @return {State}               New UserWallets state
     */
    getUserMakerToCompound(apolloClient, address) {
        const query = gql(queryMakerToCompound(address));

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

/**
 * CompoundToMakerContainer
 * @extends Container
 */
export class CompoundToMakerContainer extends Container {
    /**
     * Creates an instance of CompoundToMakerStore
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
     * Get UserCompoundToMaker from database
     * @param  {Object} apolloClient ApolloClient
     * @param  {Number} address   Address to query
     * @return {State}               New UserWallets state
     */
    getUserCompoundToMaker(apolloClient, address) {
        const query = gql(queryCompoundToMaker(address));

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
