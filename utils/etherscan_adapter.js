const request = require("request");
const config = require('../config')

fetchData = (url) => {
    //console.log(url);
    return new Promise((resolve, reject) => {
        request.get(url, (error, response, data) => {
            if (error) reject(error)
            else resolve(data)
        });
    })
}

exports.getCurrentSafeGasPrice = async() => {
    try{
        data = await fetchData(config.ETHERSCAN_API_URL);
        //console.log(`Response from api ${data}`)
        let json_data = JSON.parse(data);
        return json_data['result']['SafeGasPrice']
    }catch(error){
        console.log("Error in fetching latest gas price ",error)
        return false
    }
}

exports.getCurrentEthPrice = async() => {
    try{
        data = await fetchData(config.ETHERSCAN_PRICE_URL);
        //console.log(`Response from api ${data}`)
        let json_data = JSON.parse(data);
        return json_data['result']['ethusd']
    }catch(error){
        console.log("Error in fetching latest eth price ",error)
        return false
    }
}

exports.getChiBalance = async(account) => {
    //https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken
    try{
        data = await fetchData(config.ETHERSCAN_ERC20_BAL_URL + '&address=' + account);
        //console.log(`Response from api ${data}`)
        let json_data = JSON.parse(data);
        return json_data['result']
    }catch(error){
        console.log("Error in fetching latest eth price ",error)
        return false
    }
}

