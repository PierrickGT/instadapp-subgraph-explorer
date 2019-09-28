import PropTypes from 'prop-types';
import moment from 'moment';
import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';

import { Button, Icon, Input, Table } from 'antd';
import { Link } from 'react-router-dom';

import { ETHERSCAN_URL } from '../../../Constants';

/**
 * Component used to render UserWallets table
 * @extends Component
 */
export default class UserWalletsTable extends Component {
    /**
     * Creates an instance of UserWalletsTable
     * @param {Object} props Component props
     */
    constructor(props) {
        super(props);

        const StyledDate = styled.span`
            font-weight: bold;
            text-transform: capitalize;
        `;

        /**
         * UserWalletsTable table columns config
         * @type {Array}
         */
        this.columns = [
            {
                title: 'Wallet created',
                dataIndex: 'timestamp',
                key: 'timestamp',
                render: (timestamp, record) => (
                    <a
                        href={`${ETHERSCAN_URL}/tx/${record.transactionHash}`}
                        target="blank"
                    >
                        <StyledDate>
                            {`${moment
                                .unix(timestamp)
                                .format('dddd Do MMMM YYYY')} at ${moment
                                .unix(timestamp)
                                .format('hh:mm:ss A')}`}
                        </StyledDate>
                    </a>
                )
            },
            {
                title: 'Wallet Address',
                dataIndex: 'address',
                key: 'address',
                ...this.getColumnSearchProps('address')
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
                ...this.getColumnSearchProps('owner')
            }
        ];

        /**
         * Component state
         * @type {Object}
         */
        this.state = {
            currentPage: 1,
            searchText: ''
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    /**
     * React lifecycle
     * @return {State}     Return new state with retrieved UserWallets from page 1
     */
    componentDidMount() {
        const { apolloClient, store } = this.props;

        return store.getUserWallets(apolloClient);
    }

    /**
     * Retrieve UserWallets on page change
     * @param  {Number} page Page number to retrieve
     * @return {State}       Return new state with retrieved UserWallets
     */
    onPageChange(page) {
        const { apolloClient, store } = this.props;

        this.setState({ currentPage: page });
        store.getUserWallets(apolloClient, page - 1);
    }

    getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            this.searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            this.handleSearch(dataIndex, selectedKeys, confirm)
                        }
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: 'block'
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={() =>
                            this.handleSearch(dataIndex, selectedKeys, confirm)
                        }
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: filtered => (
                <Icon
                    type="search"
                    style={{ color: filtered ? '#1890ff' : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            },
            render: text => {
                const { searchText } = this.state;

                const highlightedAddress = (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text}
                    >
                        {text}
                    </Highlighter>
                );

                if (dataIndex === 'address') {
                    return (
                        <Link
                            to={`/instadapp-subgraph-explorer/wallet/${text}`}
                        >
                            {highlightedAddress}
                        </Link>
                    );
                }

                return (
                    <a href={`${ETHERSCAN_URL}/address/${text}`} target="blank">
                        {highlightedAddress}
                    </a>
                );
            }
        };
    }

    handleSearch(dataIndex, selectedKeys, confirm) {
        const { apolloClient, store } = this.props;

        confirm();
        this.setState({ searchText: selectedKeys[0] });
        return store.getUserWallet(apolloClient, dataIndex, selectedKeys[0]);
    }

    handleReset(clearFilters) {
        const { apolloClient, store } = this.props;

        clearFilters();
        this.setState({ searchText: '' });
        return store.getUserWallets(apolloClient);
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
                    grid-template-columns: repeat(3, 1fr);
                }
            }
            .ant-table-row {
                display: grid;
                grid-template-columns: repeat(3, 1fr);

                > td {
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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

        let userWallets = [];
        let pagination = {
            onChange: this.onPageChange,
            pageSize: 25,
            total: 25 * (currentPage + 1)
        };

        if (error) {
            return <p>{error}</p>;
        }

        if (!loading) {
            userWallets = data && data.userWallets;

            pagination = {
                ...pagination,
                current: currentPage
            };
        }

        return (
            <MainTable
                columns={this.columns}
                dataSource={userWallets}
                loading={loading}
                pagination={pagination}
                itemRender={this.itemRender}
                rowKey={userWallets => userWallets.id} //eslint-disable-line
                scroll={{ y: 'calc(100vh - 208px)' }}
                size="small"
            />
        );
    }
}

UserWalletsTable.displayName = 'UserWalletsTable';

UserWalletsTable.propTypes = {
    apolloClient: PropTypes.shape({}),
    data: PropTypes.shape({}),
    error: PropTypes.shape({}),
    loading: PropTypes.bool,
    store: PropTypes.shape({})
};
