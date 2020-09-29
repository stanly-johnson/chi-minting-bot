const dotenv = require('dotenv');
dotenv.config();

// etherscan and contract configs
const CHI_CONTRACT_ADDR = "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c" //https://etherscan.io/token/0x0000000000004946c0e9F43F4Dee607b0eF1fA1c
const ETHERSCAN_API_URL = "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey="
const ETHERSCAN_PRICE_URL = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey="
const ETHERSCAN_ERC20_BAL_URL = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + CHI_CONTRACT_ADDR + "&tag=latest&apikey="

// config custom values
const TOKENS_TO_MINT = 10 // number of tokens to mint in a single go - max is 140 |  https://medium.com/@1inch.exchange/1inch-introduces-chi-gastoken-d0bd5bb0f92b
const TRIGGER_GAS_PRICE = 90 // mint below this gas price - in gwei
const TIME_INTERVAL_IN_MIN = 20 // scan for gas price interval
const MAX_CHI_BALANCE = 10 // if chi_balance > max, no more minting - set to large value for nonstop minting

module.exports = {
  NETWORK: process.env.NETWORK,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  TOKEN_ADDRESS: process.env.TOKEN_ADDRESS,
  ETHERSCAN_API_URL : ETHERSCAN_API_URL + process.env.ETHERSCAN_API_KEY,
  ETHERSCAN_PRICE_URL : ETHERSCAN_PRICE_URL + process.env.ETHERSCAN_API_KEY,
  DISCORD_WEBHOOK_URL : process.env.DISCORD_WEBHOOK_URL,
  PROVIDER_URL : process.env.PROVIDER_URL,
  CHI_CONTRACT_ADDR : CHI_CONTRACT_ADDR,
  ORIGIN_ADDRESS : process.env.ORIGIN_ADDRESS,
  OG_ADDR_PVT_KEY : process.env.OG_ADDR_PVT_KEY,
  ETHERSCAN_ERC20_BAL_URL : ETHERSCAN_ERC20_BAL_URL + process.env.ETHERSCAN_API_KEY,
  TOKENS_TO_MINT,
  TRIGGER_GAS_PRICE,
  TIME_INTERVAL_IN_MIN,
  MAX_CHI_BALANCE
};