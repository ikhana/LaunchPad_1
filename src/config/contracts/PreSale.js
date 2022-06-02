export const PreSaleContract = {
    id: '',
    abi: [
        {
            inputs: [
                {internalType: 'address', name: '_FactoryAddress', type: 'address'},
                {internalType: 'address', name: '_DevAddress', type: 'address'}
            ],
            stateMutability: 'nonpayable',
            type: 'constructor'
        },
        {inputs: [], name: 'DevAddress', outputs: [{internalType: 'address payable', name: '', type: 'address'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'DevFeesExempted', outputs: [{internalType: 'bool', name: '', type: 'bool'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'Id', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'LiqLockAddress', outputs: [{internalType: 'address', name: '', type: 'address'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'addLiquidityAndLockLPTokens', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [{internalType: 'address[]', name: '_whitelistedAddresses', type: 'address[]'}], name: 'addwhitelistedAddresses', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [], name: 'cancelAndTransferTokensToPresaleCreator', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [], name: 'claimTokens', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [{internalType: 'address', name: '', type: 'address'}], name: 'claimed', outputs: [{internalType: 'bool', name: '', type: 'bool'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'closeTime', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'collectFundsRaised', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {
            inputs: [
                {internalType: 'uint256', name: '_closeTime', type: 'uint256'},
                {internalType: 'uint256', name: '_maxInvestInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_minInvestInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_uniLiquidityAddingTime', type: 'uint256'}
            ],
            name: 'editInfoPresaleDev',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {inputs: [], name: 'getRefund', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [], name: 'hardCapInWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'invest', outputs: [], stateMutability: 'payable', type: 'function'},
        {inputs: [{internalType: 'address', name: '', type: 'address'}], name: 'investments', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'linkDiscord', outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'linkTelegram', outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'linkTwitter', outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'linkWebsite', outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'maxInvestInWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'minInvestInWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'onlyWhitelistedAddressesAllowed', outputs: [{internalType: 'bool', name: '', type: 'bool'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'openTime', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'presaleCancelled', outputs: [{internalType: 'bool', name: '', type: 'bool'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'presaleCreatorAddress', outputs: [{internalType: 'address payable', name: '', type: 'address'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'presaleCreatorClaimTime', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'presaleCreatorClaimWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'saleTitle', outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}], stateMutability: 'view', type: 'function'},
        {
            inputs: [
                {internalType: 'address', name: '_presaleCreator', type: 'address'},
                {internalType: 'address', name: '_tokenAddress', type: 'address'},
                {internalType: 'address', name: '_unsoldTokensDumpAddress', type: 'address'}
            ],
            name: 'setAddressInfo',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {inputs: [{internalType: 'bool', name: '_DevFeesExempted', type: 'bool'}], name: 'setDevFeesExempted', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {
            inputs: [
                {internalType: 'uint256', name: '_totalTokens', type: 'uint256'},
                {internalType: 'uint256', name: '_tokenPriceInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_hardCapInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_softCapInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_maxInvestInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_minInvestInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_openTime', type: 'uint256'},
                {internalType: 'uint256', name: '_closeTime', type: 'uint256'}
            ],
            name: 'setGeneralInfo',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {internalType: 'address', name: '_LiqLockAddress', type: 'address'},
                {internalType: 'uint256', name: '_DevFeePercentage', type: 'uint256'},
                {internalType: 'uint256', name: '_MinDevFeeInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_Id', type: 'uint256'}
            ],
            name: 'setInfo',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {inputs: [{internalType: 'bool', name: '_onlyWhitelistedAddressesAllowed', type: 'bool'}], name: 'setOnlyWhitelistedAddressesAllowed', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {
            inputs: [
                {internalType: 'bytes32', name: '_saleTitle', type: 'bytes32'},
                {internalType: 'bytes32', name: '_linkTelegram', type: 'bytes32'},
                {internalType: 'bytes32', name: '_linkDiscord', type: 'bytes32'},
                {internalType: 'bytes32', name: '_linkTwitter', type: 'bytes32'},
                {internalType: 'bytes32', name: '_linkWebsite', type: 'bytes32'}
            ],
            name: 'setStringInfo',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {internalType: 'uint256', name: '_uniListingPriceInWei', type: 'uint256'},
                {internalType: 'uint256', name: '_uniLiquidityAddingTime', type: 'uint256'},
                {internalType: 'uint256', name: '_uniLPTokensLockDurationInDays', type: 'uint256'},
                {internalType: 'uint256', name: '_uniLiquidityPercentageAllocation', type: 'uint256'}
            ],
            name: 'setUniswapInfo',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {inputs: [], name: 'softCapInWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'token', outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'tokenPriceInWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'tokensLeft', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'totalCollectedWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'totalInvestorsCount', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'totalTokens', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'uniLPTokensLockDurationInDays', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'uniLiquidityAdded', outputs: [{internalType: 'bool', name: '', type: 'bool'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'uniLiquidityAddingTime', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'uniLiquidityPercentageAllocation', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'uniListingPriceInWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'unsoldTokensDumpAddress', outputs: [{internalType: 'address', name: '', type: 'address'}], stateMutability: 'view', type: 'function'},
        {inputs: [{internalType: 'address', name: '', type: 'address'}], name: 'whitelistedAddresses', outputs: [{internalType: 'bool', name: '', type: 'bool'}], stateMutability: 'view', type: 'function'},
        {stateMutability: 'payable', type: 'receive'}
    ]
}
