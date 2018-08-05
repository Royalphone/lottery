const Web3 = require('web3');
const {interface,bytecode} = require('./compile');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'taste color swallow wild parent cup endorse hammer spoil dream blossom trash';
const provider = new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/v3/b5193966085f4ae0a469a7a77215b0ba");
const web3 = new Web3(provider);

deploy=async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode
        }).send({
            from:accounts[0],
            gas:'600000'
        });
    console.log('address:' + result.options.address);
    console.log(interface);
};
deploy();
