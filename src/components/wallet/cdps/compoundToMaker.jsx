import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { Divider, List, Spin, Typography } from 'antd';

import { MAKERSCAN_URL } from '../../../Constants';
import { spacingUnit } from '../../../styles/variables';

/**
 * Component used to render CompoundToMaker table
 * @extends Component
 */
export default class CompoundToMaker extends Component {
    /**
     * React lifecycle
     * @return {State}     Return new state with retrieved CompoundToMaker
     */
    componentDidMount() {
        const { address, apolloClient, store } = this.props;

        return store.getUserCompoundToMaker(apolloClient, address);
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

        let compoundToMakers = [];

        if (!loading) {
            compoundToMakers = data && data.compoundToMakers;

            if (compoundToMakers && compoundToMakers.length > 0) {
                return (
                    <Container>
                        <Title level={2}>
                            Transferred CDPs from Compound to Maker
                        </Title>
                        <Divider />
                        <StyledList
                            itemLayout="horizontal"
                            dataSource={compoundToMakers}
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

CompoundToMaker.displayName = 'CompoundToMaker';

CompoundToMaker.propTypes = {
    address: PropTypes.string,
    apolloClient: PropTypes.shape({}),
    data: PropTypes.shape({}),
    error: PropTypes.shape({}),
    loading: PropTypes.bool,
    store: PropTypes.shape({})
};
