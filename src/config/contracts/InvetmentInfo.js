export const InvestementInfo = {
    id: '0xF69ea1357E4Df48563C78f8BcD92c470d7F38CFA',
    abi: [
        {
            anonymous: false,
            inputs: [
                {indexed: true, internalType: 'address', name: 'previousOwner', type: 'address'},
                {indexed: true, internalType: 'address', name: 'newOwner', type: 'address'}
            ],
            name: 'OwnershipTransferred',
            type: 'event'
        },
        {inputs: [{internalType: 'address', name: '_presale', type: 'address'}], name: 'addPresaleAddress', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [], name: 'getDevFeePercentage', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'getMinDevFeeInWei', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [{internalType: 'uint256', name: 'Id', type: 'uint256'}], name: 'getPresaleAddress', outputs: [{internalType: 'address', name: '', type: 'address'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'getPresalesCount', outputs: [{internalType: 'uint256', name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'owner', outputs: [{internalType: 'address', name: '', type: 'address'}], stateMutability: 'view', type: 'function'},
        {inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [{internalType: 'uint256', name: '_devFeePercentage', type: 'uint256'}], name: 'setDevFeePercentage', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [{internalType: 'uint256', name: '_minDevFeeInWei', type: 'uint256'}], name: 'setMinDevFeeInWei', outputs: [], stateMutability: 'nonpayable', type: 'function'},
        {inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'}
    ]
}
//todo..purpose of this contract?
// {"tokenAddress":"0xbd1EB6a307839a573702C86fA3b91ac8e46042B2","unsoldTokensDumpAddress":"0x000000000000000000000000000000000000dEaD","whitelistedAddresses":[],"tokenPriceInWei":"100000000000000000","hardCapInWei":"2000000000000000000","softCapInWei":"500000000000000000","maxInvestInWei":"500000000000000000","minInvestInWei”:"100000000000000000","openTime":"1651737507","closeTime":"1651741107"}
//{"listingPriceInWei":"110000000000000000","liquidityAddingTime":"1648191598","lpTokensLockDurationInDays":"10","liquidityPercentageAllocation":"99"}
// {"saleTitle":"0x4c61622070652061617469206861690000000000000000000000000000000000","linkTelegram":"0x4c61622070652061617469206861692064756100000000000000000000000000","linkDiscord":"0x4c6162207065206161746920686169206475612062616e000000000000000000","linkTwitter":"0x4c6162207065206161746920686169206475612062616e206b00000000000000","linkWebsite":"0x4c6162207065206161746920686169206475612062616e206b2074616d616e61"}
