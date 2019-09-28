import PropTypes from 'prop-types';
import React from 'react';

import { withApollo } from 'react-apollo';
import { Subscribe } from 'unstated';

import UserWalletsStore from './store';
import UserWalletsTable from './table';

/**
 * UserWallets Component
 */
const UserWallets = ({ client }) => (
    <Subscribe to={[UserWalletsStore]}>
        {store => {
            const {
                state: { data, error, loading }
            } = store;

            return (
                <UserWalletsTable
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

UserWallets.displayName = 'UserWallets';

UserWallets.propTypes = {
    client: PropTypes.shape({})
};

export default withApollo(UserWallets);
