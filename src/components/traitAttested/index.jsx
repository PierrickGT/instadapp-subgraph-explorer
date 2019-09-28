import PropTypes from 'prop-types';
import React from 'react';

import { withApollo } from 'react-apollo';
import { Subscribe } from 'unstated';

import TraitAttestedStore from './store';
import TraitAttestedTable from './table';

/**
 * TraitAttested Component
 */
export const TraitAttested = ({ client }) => (
    <Subscribe to={[TraitAttestedStore]}>
        {store => {
            const {
                state: { data, error, loading }
            } = store;

            return (
                <TraitAttestedTable
                    apolloClient={client}
                    data={data}
                    error={error}
                    loading={loading}
                    store={store}
                />
            );
        }}
    </Subscribe>
);

TraitAttested.displayName = 'TraitAttested';

TraitAttested.propTypes = {
    client: PropTypes.shape({})
};

export default withApollo(TraitAttested);
