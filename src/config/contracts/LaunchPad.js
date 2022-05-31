export const LaunchPadContract = {
    id: '0x8bD52B2258e2c5d0D2Eb6A627C6E5Df16E40A0F4',
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_InfoAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "title",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "Id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "presalecontractaddress",
                    "type": "address"
                }
            ],
            "name": "PresaleCreated",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "SSS",
            "outputs": [
                {
                    "internalType": "contract InvestmentsInfo",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "tokenAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "unsoldTokensDumpAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "address[]",
                            "name": "whitelistedAddresses",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenPriceInWei",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "hardCapInWei",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "softCapInWei",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxInvestInWei",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "minInvestInWei",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "openTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "closeTime",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct InvestmentsFactory.PresaleInfo",
                    "name": "_info",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "listingPriceInWei",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "liquidityAddingTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lpTokensLockDurationInDays",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "liquidityPercentageAllocation",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct InvestmentsFactory.PresaleUniswapInfo",
                    "name": "_uniInfo",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "saleTitle",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "linkTelegram",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "linkDiscord",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "linkTwitter",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "linkWebsite",
                            "type": "bytes32"
                        }
                    ],
                    "internalType": "struct InvestmentsFactory.PresaleStringInfo",
                    "name": "_stringInfo",
                    "type": "tuple"
                }
            ],
            "name": "createPresale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}