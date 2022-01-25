# About CROS Token

Its a token that distributed in following addresses and every address can call withdraw function and mint tokens according to allocation

##### Marketing Development => 15%

##### Private Sale => 11%

##### Public Sale => 2%

##### Treasury => 10%

##### Float Liquidity => 2%

##### Liquidity Mining => 15%

##### Team => 15%

##### Advisors => 4%

##### EcoSystemFunds => 26%

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

Every function have \_amount parameter, for example treasure has the allocation is 10% and total supply is 1 Billion so treasury address can't mint more than 100 million (10% of the total supply) however address can withdraw amount multiple times and contract keep recording of amount withdraw

# Installation

`yarn`

# deploy on testnet

`truffle migrate --reset --network ropsten`

# test

run `ganache-cli`
than `truffle test`
