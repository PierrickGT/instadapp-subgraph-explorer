/**
 * Build GraphQL transactions query
 * @param  {Number} [pageNumber=0] Page number to query
 * @return {Object}                GraphQL query
 */
const buildQuery = (pageNumber = 0) => {
    const query = `{
	    traitAttesteds(first: 25, skip: ${pageNumber *
            25}, orderBy: timestamp, orderDirection: desc) {
            id
            subject
            attester
            requester
            dataHash
            transactionHash
        }
    }`;

    return query;
};

export default buildQuery;
