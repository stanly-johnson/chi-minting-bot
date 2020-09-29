## CHI Minting bot

NodeJs script to monitor for low gas fees and mint CHI tokens. Fetches gas price from etherscan and mints CHI tokens if price is below set threshold.

This script might have bugs/errors that may cause you to lose funds - use at your own risk.

#### Config Setup

Most of the params are configurable and can be set as per your needs.

- `TOKENS_TO_MINT` number of tokens to mint in a single go - max is 140
- `TRIGGER_GAS_PRICE` mint below this gas price - in gwei
- `TIME_INTERVAL_IN_MIN` How often to ping for gas price
- `MAX_CHI_BALANCE` if chi_balance > max, no more minting - set to large value for nonstop minting


#### How to run
1. Clone repo
2. `npm install`
3. Setup `.env` file as in `.env.example`
4. Setup configs mentioned above to safe params
5. `node bot.js`

Note : Ensure ETH balance in the provided ORIGIN_ADDRESS, otherwise transaction will fail. The needed balance will depend based on the amount of `TOKENS_TO_MINT`

#### ToDo
- [ ] Send message to discord after minting
- [ ] Monitor price on Uniswap and auto-sell 