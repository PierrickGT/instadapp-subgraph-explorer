/**
 * Build GraphQL OpenedCDPs query
 * @param  {Number} Address     Address to query
 * @return {Object}             GraphQL query
 */
export const queryOpenedCDPs = address => {
    const query = `{
	    openedCDPs(where: { owner: "${address}" }) {
            id
            cdpNumber
            owner
            transactionHash
            timestamp
        }
    }`;

    return query;
};

/**
 * Build GraphQL WipedCDPs query
 * @param  {Number} Address     Address to query
 * @return {Object}             GraphQL query
 */
export const queryWipedCDPs = address => {
    const query = `{
	    wipedCDPs(where: { owner: "${address}" }) {
            id
            cdpNumber
            owner
            daiAmount
            daiFee
            makerFee
            transactionHash
            timestamp
        }
    }`;

    return query;
};

/**
 * Build GraphQL MakerToCompound query
 * @param  {Number} Address     Address to query
 * @return {Object}             GraphQL query
 */
export const queryMakerToCompound = address => {
    const query = `{
	    makerToCompounds(where: { owner: "${address}" }) {
            id
            cdpNumber
            owner
            daiAmount
            ethAmount
            fees
            transactionHash
            timestamp
        }
    }`;

    return query;
};

/**
 * Build GraphQL CompoundToMaker query
 * @param  {Number} Address     Address to query
 * @return {Object}             GraphQL query
 */
export const queryCompoundToMaker = address => {
    const query = `{
	    compoundToMakers(where: { owner: "${address}" }) {
            id
            cdpNumber
            owner
            daiAmount
            ethAmount
            fees
            transactionHash
            timestamp
        }
    }`;

    return query;
};
