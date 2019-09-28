import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { Divider, List, Spin, Typography } from 'antd';

import { MAKERSCAN_URL } from '../../../Constants';
import { spacingUnit } from '../../../styles/variables';

/**
 * Component used to render MakerToCompound table
 * @extends Component
 */
export default class MakerToCompound extends Component {
    /**
     * React lifecycle
     * @return {State}     Return new state with retrieved MakerToCompound
     */
    componentDidMount() {
        const { address, apolloClient, store } = this.props;

        return store.getUserMakerToCompound(apolloClient, address);
    }

    /**
     * React lifecycle
     */
    render() {
        const { store } = this.props;

        const {
            state: { data, error, loading }
        } = store;

        const { Title } = Typography;

        const Container = styled.div`
            padding-bottom: ${spacingUnit(4)};
        `;

        const StyledList = styled(List)`
            margin-left: ${spacingUnit(7)};
            padding: 0;
        `;

        const StyledListItem = styled(List.Item)`
            padding: 0;
        `;

        if (error) {
            return <p>{error}</p>;
        }

        let makerToCompounds = [];

        if (!loading) {
            makerToCompounds = data && data.makerToCompounds;

            if (makerToCompounds && makerToCompounds.length > 0) {
                return (
                    <Container>
                        <Title level={2}>
                            Transferred CDPs from Maker to Compound
                        </Title>
                        <Divider />
                        <StyledList
                            itemLayout="horizontal"
                            dataSource={makerToCompounds}
                            renderItem={item => (
                                <StyledListItem>
                                    <Title level={3}>
                                        <a
                                            href={`${MAKERSCAN_URL}/cups/${
                                                item.cdpNumber
                                            }`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.cdpNumber}
                                        </a>
                                    </Title>
                                </StyledListItem>
                            )}
                        />
                    </Container>
                );
            }
        } else if (loading) {
            return <Spin size="large" tip="Loading..." />;
        }

        return null;
    }
}

MakerToCompound.displayName = 'MakerToCompound';

MakerToCompound.propTypes = {
    address: PropTypes.string,
    apolloClient: PropTypes.shape({}),
    data: PropTypes.shape({}),
    error: PropTypes.shape({}),
    loading: PropTypes.bool,
    store: PropTypes.shape({})
};
