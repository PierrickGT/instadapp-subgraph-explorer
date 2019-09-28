import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { Table } from 'antd';

import { ETHERSCAN_URL } from '../../../Constants';

/**
 * Component used to render traitAttested table
 * @extends Component
 */
export default class TraitAttestedTable extends Component {
    /**
     * Creates an instance of TraitAttestedTable
     * @param {Object} props Component props
     */
    constructor(props) {
        super(props);

        /**
         * TraitAttestedTable table columns config
         * @type {Array}
         */
        this.columns = [
            {
                title: 'Transaction',
                dataIndex: 'transactionHash',
                key: 'transactionHash',
                render: transactionHash => (
                    <a
                        href={`${ETHERSCAN_URL}/tx/${transactionHash}`}
                        target="blank"
                    >
                        {transactionHash}
                    </a>
                )
            },
            {
                title: 'Subject',
                dataIndex: 'subject',
                key: 'subject',
                render: subject => (
                    <a
                        href={`${ETHERSCAN_URL}/address/${subject}`}
                        target="blank"
                    >
                        {subject}
                    </a>
                )
            },
            {
                title: 'Attester',
                dataIndex: 'attester',
                key: 'attester',
                render: attester => (
                    <a
                        href={`${ETHERSCAN_URL}/address/${attester}`}
                        target="blank"
                    >
                        {attester}
                    </a>
                )
            },
            {
                title: 'Requester',
                dataIndex: 'requester',
                key: 'requester',
                render: requester => (
                    <a
                        href={`${ETHERSCAN_URL}/address/${requester}`}
                        target="blank"
                    >
                        {requester}
                    </a>
                )
            },
            {
                title: 'Data Hash',
                dataIndex: 'dataHash',
                key: 'dataHash'
            }
        ];

        /**
         * Component state
         * @type {Object}
         */
        this.state = {
            currentPage: 1
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    /**
     * React lifecycle
     * @return {State}     Return new state with retrieved traitAttested from page 1
     */
    componentDidMount() {
        const { apolloClient, store } = this.props;

        return store.getTraitAttesteds(apolloClient);
    }

    /**
     * Retrieve traitAttested on page change
     * @param  {Number} page Page number to retrieve
     * @return {State}       Return new state with retrieved traitAttested
     */
    onPageChange(page) {
        const { apolloClient, store } = this.props;

        this.setState({ currentPage: page });
        store.getTraitAttesteds(apolloClient, page - 1);
    }

    /**
     * React lifecycle
     */
    render() {
        const { data, error, loading } = this.props;
        const { currentPage } = this.state;

        const MainTable = styled(Table)`
            .ant-table-thead {
                > tr {
                    display: grid;
                    grid-template-columns: 132px repeat(4, 290px);
                }
            }
            .ant-table-row {
                display: grid;
                grid-template-columns: 132px repeat(4, 290px);

                > td {
                    font-size: 13px;
                    max-width: 290px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    &:first-child {
                        max-width: 132px;
                    }
                }
                .ant-table-row-expand-icon-cell {
                    display: none;
                }
            }

            .ant-pagination-item-link {
                align-items: center;
                display: flex;
                height: 100%;
            }
        `;

        let traitAttesteds = [];
        let pagination = {
            onChange: this.onPageChange,
            pageSize: 25,
            showQuickJumper: true,
            total: 101725
        };

        if (error) {
            return <p>{error}</p>;
        }

        if (!loading) {
            traitAttesteds = data && data.traitAttesteds;

            pagination = {
                ...pagination,
                current: currentPage
            };
        }

        return (
            <MainTable
                columns={this.columns}
                dataSource={traitAttesteds}
                loading={loading}
                pagination={pagination}
                itemRender={this.itemRender}
                rowKey={traitAttesteds => traitAttesteds.id} //eslint-disable-line
                scroll={{ y: 'calc(100vh - 208px)' }}
                size="small"
            />
        );
    }
}

TraitAttestedTable.displayName = 'TraitAttestedTable';

TraitAttestedTable.propTypes = {
    apolloClient: PropTypes.shape({}),
    data: PropTypes.shape({}),
    error: PropTypes.shape({}),
    loading: PropTypes.bool,
    store: PropTypes.shape({})
};
