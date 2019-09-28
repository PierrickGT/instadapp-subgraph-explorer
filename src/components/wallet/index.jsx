import PropTypes from 'prop-types';
import React from 'react';
import Blockies from 'react-blockies';
import styled from 'styled-components';

import { Avatar, Divider, Typography } from 'antd';
import { withApollo } from 'react-apollo';
import { Subscribe } from 'unstated';

import { ETHERSCAN_URL } from '../../Constants';
import { spacingUnit } from '../../styles/variables';

import CompoundToMaker from './cdps/compoundToMaker';
import MakerToCompound from './cdps/makerToCompound';
import OpenedCDPs from './cdps/opened';
import WipedCDPs from './cdps/wiped';
import {
    CompoundToMakerContainer,
    MakerToCompoundContainer,
    OpenedCDPsStore,
    WipedCDPsStore
} from './store';

/**
 * Wallet Component
 */
const Wallet = ({ client, match }) => (
    <Subscribe
        to={[
            CompoundToMakerContainer,
            MakerToCompoundContainer,
            OpenedCDPsStore,
            WipedCDPsStore
        ]}
    >
        {(
            compoundToMakerStore,
            makerToCompoundStore,
            openedCDPsStore,
            wipedCDPsStore
        ) => {
            const { Text } = Typography;

            const walletAddress = match.params.address;

            const StyledAvatar = styled(Avatar)`
                margin-right: ${spacingUnit()};
                vertical-align: middle;
            `;

            const StyledDivider = styled(Divider)`
                margin-bottom: ${spacingUnit(4)} !important;
            `;

            const StyledWalletAddress = styled(Text)`
                vertical-align: middle;
            `;

            return (
                <>
                    <StyledDivider orientation="left">
                        <a
                            href={`${ETHERSCAN_URL}/address/${walletAddress}`}
                            target="blank"
                        >
                            <StyledAvatar shape="square" size={50}>
                                <Blockies
                                    seed={walletAddress}
                                    size={5}
                                    scale={10}
                                />
                            </StyledAvatar>
                            <StyledWalletAddress code>
                                {walletAddress}
                            </StyledWalletAddress>
                        </a>
                    </StyledDivider>
                    <Divider />
                    <OpenedCDPs
                        address={walletAddress}
                        apolloClient={client}
                        store={openedCDPsStore}
                    />
                    <WipedCDPs
                        address={walletAddress}
                        apolloClient={client}
                        store={wipedCDPsStore}
                    />
                    <MakerToCompound
                        address={walletAddress}
                        apolloClient={client}
                        store={makerToCompoundStore}
                    />
                    <CompoundToMaker
                        address={walletAddress}
                        apolloClient={client}
                        store={compoundToMakerStore}
                    />
                </>
            );
        }}
    </Subscribe>
);

Wallet.displayName = 'UsersWallet';

Wallet.propTypes = {
    client: PropTypes.shape({}),
    match: PropTypes.shape({})
};

export default withApollo(Wallet);
