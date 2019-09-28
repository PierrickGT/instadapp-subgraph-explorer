/**
 * Build GraphQL userWallets query
 * @param  {Number} [pageNumber=0] Page number to query
 * @return {Object}                GraphQL query
 */
export const queryUserWallets = (pageNumber = 0) => {
    const query = `{
	    userWallets(first: 25, skip: ${pageNumber *
            25}, orderBy: timestamp, orderDirection: desc) {
            id
            address
            owner
            transactionHash
            timestamp
        }
    }`;

    return query;
};

/**
 * Build GraphQL userWallet query
 * @param  {String} field   Field to query
 * @param  {String} value   Value to query
 * @return {Object}         GraphQL query
 */
export const queryUserWallet = (field, value) => {
    const query = `{
	    userWallets(where: {${field}: "${value}"}) {
            id
            address
            owner
            transactionHash
            timestamp
        }
    }`;

    return query;
};
