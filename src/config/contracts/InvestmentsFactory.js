export const investmentFactoryContract = {
    id: "0xacEBD5516fE2dCa6C612cc4a9527aDB6d9D12CD8",//"0x3c73082428105B6883c4C8cbFAF67b3b5a4DE19b",//"0xacEBD5516fE2dCa6C612cc4a9527aDB6d9D12CD8",//'0x22ace7F30BA2988e1641C983e95a7105591704AE',
    abi:
   [{"inputs":[{"internalType":"address","name":"_InfoAddress","type":"address"}],
   "stateMutability":"nonpayable","type":"constructor"},
   {"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"title","type":"bytes32"},
   {"indexed":false,"internalType":"uint256","name":"Id","type":"uint256"},
   {"indexed":false,"internalType":"address","name":"creator","type":"address"}],"name":"PresaleCreated","type":"event"},
   {"inputs":[],"name":"SSS","outputs":[{"internalType":"contract InvestmentsInfo","name":"","type":"address"}],"stateMutability":"view","type":"function"},
   {"inputs":[{"components":[{"internalType":"address","name":"tokenAddress","type":"address"},
   {"internalType":"address","name":"unsoldTokensDumpAddress","type":"address"},
   {"internalType":"address[]","name":"whitelistedAddresses","type":"address[]"},
   {"internalType":"uint256","name":"tokenPriceInWei","type":"uint256"},
   {"internalType":"uint256","name":"hardCapInWei","type":"uint256"},{"internalType":"uint256","name":"softCapInWei","type":"uint256"},
   {"internalType":"uint256","name":"maxInvestInWei","type":"uint256"},{"internalType":"uint256","name":"minInvestInWei","type":"uint256"},
   {"internalType":"uint256","name":"openTime","type":"uint256"},
   {"internalType":"uint256","name":"closeTime","type":"uint256"}],"internalType":"struct InvestmentsFactory.PresaleInfo","name":"_info","type":"tuple"},
   {"components":[{"internalType":"uint256","name":"listingPriceInWei","type":"uint256"},
   {"internalType":"uint256","name":"liquidityAddingTime","type":"uint256"},
   {"internalType":"uint256","name":"lpTokensLockDurationInDays","type":"uint256"},
   {"internalType":"uint256","name":"liquidityPercentageAllocation","type":"uint256"}],"internalType":"struct InvestmentsFactory.PresaleUniswapInfo","name":"_uniInfo","type":"tuple"},
   {"components":[{"internalType":"bytes32","name":"saleTitle","type":"bytes32"},{"internalType":"bytes32","name":"linkTelegram","type":"bytes32"},
   {"internalType":"bytes32","name":"linkDiscord","type":"bytes32"},{"internalType":"bytes32","name":"linkTwitter","type":"bytes32"},
   {"internalType":"bytes32","name":"linkWebsite","type":"bytes32"}],
   "internalType":"struct InvestmentsFactory.PresaleStringInfo","name":"_stringInfo","type":"tuple"}],
   "name":"createPresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],
   "name":"getaddresses","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
   {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
}
