var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const config = require('../config');
const chi_abi = require('../abi/ChiToken-abi.json') //https://github.com/CryptoManiacsZone/chi/blob/master/ChiToken.full.abi

// connect to network
// modify provider url in env to switch between ganache, testnet and mainnet
var web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER_URL));

exports.sendMintTx = async (sender, token_contract_addr, amount, pvt_key, gas_fee_in_gwei) => {
    //getting the nonce value for the txn, include the pending parameter for duplicate errors
    let getNonce = await web3.eth.getTransactionCount(sender, 'pending');
    // init chi contract
    let contract = new web3.eth.Contract(chi_abi, token_contract_addr, {
        from: sender
      });
        
    var rawTx = {
      nonce: getNonce,
      from: sender,
      gasPrice: web3.utils.toHex(web3.utils.toWei(gas_fee_in_gwei, 'Gwei')),
      gasLimit: web3.utils.toHex(3000000), // change as needed
      to: token_contract_addr,
      value: '0x0',
      data: contract.methods.mint(amount).encodeABI()
    };
    // helps in debugging
    console.log(rawTx);
    var tx = new Tx(rawTx);
    tx.sign(Buffer.from(pvt_key, 'hex'));
  
    var serializedTx = tx.serialize();
  
    return new Promise((resolve, reject) =>
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        if (!err) {
          console.log({hash});
          resolve(hash);
        } else {
          reject(err);
        }
      }));
  }
