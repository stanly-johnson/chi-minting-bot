const { getCurrentSafeGasPrice, getChiBalance } = require('./utils/etherscan_adapter')
const { sendMintTx } = require('./utils/chi_adapter');
const config = require('./config');


async function bot(time_inter_min) {
    while (true) {
      try {

        console.log("Fetching current CHI Balance :")
        let chi_balance = await getChiBalance(config.ORIGIN_ADDRESS);
        console.log({chi_balance});
        if (chi_balance === undefined) throw Error("Cannot fetch current Chi Balance!")

        if (parseFloat(chi_balance) >= config.MAX_CHI_BALANCE) { 
          console.log("Chi balance max, not minting!"); continue; 
        } 

        console.log("Fetching latest price data : ")
        let current_gas_price = await getCurrentSafeGasPrice();
        console.log({current_gas_price});
        if (current_gas_price === undefined) throw Error("Cannot fetch current safe gas price!")

        if (current_gas_price > config.TRIGGER_GAS_PRICE) { 
          console.log(`Current gas price > ${config.TRIGGER_GAS_PRICE}, not minting!`); continue; 
        }

        // enforce mint limit
        if (config.TOKENS_TO_MINT > 140) throw Error("Cannot mint more than 140 tokens!")

        // if all good perform actual minting
        console.log("Sending Mint transaction..")
        let tx_hash = await sendMintTx(config.ORIGIN_ADDRESS, config.CHI_CONTRACT_ADDR, config.TOKENS_TO_MINT , config.OG_ADDR_PVT_KEY, current_gas_price)
        console.log(`Transaction broadcasted. Hash - ${tx_hash}`)

      }
      
      catch(error){
        console.log(error)
        console.log("Skipping Execution!")
      }

      finally{
        // wakes up when its time to mint again
        await new Promise(resolve => setTimeout(resolve, time_inter_min * 60 * 1000))
      }
    }
}

bot(config.TIME_INTERVAL_IN_MIN)