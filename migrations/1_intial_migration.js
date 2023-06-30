const TFMToken = artifacts.require("TFMToken");
const DateTimeContract = artifacts.require("DateTimeContract");


module.exports = function(deployer, network, accounts) {
    console.log("Deployer Is : " + deployer);
    //console.log("Network Is :  " + network);
    //console.log("Account Address One is : " + accounts[0] + '--------      --------' + accounts[1] + '--------      --------' + accounts[2]);
    deployer.deploy(TFMToken, accounts[0]);
    deployer.deploy(DateTimeContract);
};
