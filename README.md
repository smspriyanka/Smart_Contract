# About CROS Token

Its a token that distributed in following addresses and every address can call withdraw function and mint tokens according to allocation

##### Marketing Development => 15%

##### Private Sale => 8.3%

##### Public Sale => 1.7%

##### Treasury => 10%

##### Float Liquidity => 2%

##### Liquidity Mining => 15%

##### Team => 11%

##### Advisors => 8%

##### EcoSystemFunds => 29%

Please note that a address can't withdraw or mint more then its allocation, here are the withdraw function (only executed by an address that have rights)

##### withdrawMarketingDevelopmentFunds

##### withdrawPrivateSaleFunds

##### withdrawPublicSaleFunds

##### withdrawTreasuryFunds

##### withdrawFloatLiquidityFunds

##### withdrawLiquidityMiningFunds

##### withdrawTeamFunds

##### withdrawAdvisorsFunds

##### withdrawEcosystemFunds

Every function have \_amount parameter, for example treasure has the allocation is 10% and total supply is 300 million so treasury address can't mint more than 30 million (10% of the total supply) however address can withdraw amount multiple times and contract keep recording of amount withdraw

# Installation

`yarn`

# deploy on testnet

`truffle migrate --reset --network ropsten`

# test

run `ganache-cli`
than `truffle test`
