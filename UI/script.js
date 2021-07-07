var express = require('express');
var app = express();
var path = require('path');
const Web3 = require('web3')
var Tx = require("ethereumjs-tx").Transaction;


app.get('/', async (req, res) => { //fine
    await loadMetaMask();
    res.sendFile(path.join(__dirname + '/index.html'));
});


 app.get('/v1/gameId', function(req, res){
    console.log(req.query.addr);
	var curVal = getGameID(req.query.addr);
	curVal.then(counterVal => {

        console.log(counterVal); 
        console.log("web3.utils.toAscii(counterVal)");
        console.log(web3.utils.toAscii(counterVal));
		res.end(counterVal)
	  });
    
 });

 app.post('/v1/bet', function(req, res){
     
/////v1/bet?gameexpiry=1&amount=12&choice=1&playerAddr=0xA74b379b79d62612aaF0fBdF235D78f26d1c088b&playerRandomness=1234

    //console.log(req.query.addr);
    //var curVal = placeBet(req.query.gameexpiry);
    //var curVal = placeBet(req.query.amount);
   // var curVal = placeBet(req.query.choice);
  //  var curVal = placeBet(req.query.playerAddr);
   // var curVal = placeBet(req.query.playerRandomness);

    //placeBet(choice,  playerRandomness,  noOfHour, playerAddr, betAmount, gameID)

    var curVal = placeBet(req.query.choice, req.query.playerRandomness, req.query.gameexpiry, req.query.playerAddr,req.query.amount, req.query.gameID);
    
	curVal.then(counterVal => {
		console.log(counterVal); 
		res.end(counterVal)
	  });
    
 });



 app.get('/getValue', async (req, res) =>{
   
    onsole.log("Calling reset")
    await contract.methods.totalSupply().call((err, result) => { console.log("updated value is " + result) })
      

 });

app.listen(8081);
console.log("server is up");

//web3.js code

// ganache url
const web3 = new Web3("http://127.0.0.1:7545")
//**NOTE** 'address' value should be changed to the address of the account which sends the transaction */
const addr =     '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const contAddr = '0x480f09cd0bC43Ec9C2465331BFbe5030eBcE3Cb4' // '0x581Bf82D102f32A628B846E489c8c9239b91049C' ;///'0x69ff9805bD7B3EC51dc01Dc94dfcd57390b6Cb06' 
const rockAddr = ''
const rockABI =[]
	  
var abi =[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			}
		],
		"name": "addNumberFunc",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playerRandomness",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "noOfHour",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "gameID",
				"type": "bytes32"
			}
		],
		"name": "initiateGame",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_gameId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "playerOne",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_playerOneChoice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playerOneRandomness",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "playerTwo",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_playerTwoChoice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playerTwoRandomness",
				"type": "uint256"
			}
		],
		"name": "judgeWinner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_gameId",
				"type": "bytes32"
			}
		],
		"name": "fetchAddr",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getAddrBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "playerRandomness",
				"type": "uint256"
			}
		],
		"name": "getContBAlance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "newGameID",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "_hashGameID",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

//68070420e79b5eb95983dbf1ab5af48f904e38c1404911318948395d734de5e7
const pkey = Buffer.from('68070420e79b5eb95983dbf1ab5af48f904e38c1404911318948395d734de5e7','hex') //plket value shpuldbe read from.env file
const contract = new web3.eth.Contract(abi, contAddr)


async function placeBet(choice,  playerRandomness,  noOfHour, playerAddr, betAmount, gameID) {
   
    console.log("placeBet impl");
    console.log(choice);
    console.log(playerRandomness);
    console.log(noOfHour);
    console.log(playerAddr);
    console.log(betAmount);
    console.log("gameid "+ gameID);
	var vid ='vid'
	console.log("int choice");
	console.log(parseInt(choice));

    web3.eth.getTransactionCount(addr, (err, txCount) => {


    const txObject = {
            nonce:    web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(800000), 
            gasPrice: web3.utils.toHex(10000000), //web3.utils.toWei(1000000)),      //('10', 'gwei')),
            to: contAddr,
            value:    web3.utils.toHex(web3.utils.toWei('10', 'ether')),
           // data: contract.methods.initiateGame(parseInt(choice), parseInt(playerRandomness), parseInt(noOfHour), vid).encodeABI()//addNumberFunc
		   data: contract.methods.addNumberFunc(parseInt(choice)).encodeABI()  //addNumberFunc
        }

	// const txObject1 = {
    //             nonce:    web3.utils.toHex(txCount),
    //             gasLimit: web3.utils.toHex(800000), 
    //             gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    //             to: contAddr,
    //             value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    //             data: contract.methods.incr('0x068518702a577f9338be0b06572f3d043b4f50707323a51ca86a09a6469d15eb').encodeABI()
    //     }

		console.log("txObject");
        const tx = new Tx(txObject)
        tx.sign(pkey)
		console.log("signed tx");

        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')
		console.log("raw");
		console.log(raw);

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)

        })

    })//web3
}

async function incr() {


	
    web3.eth.getTransactionCount(addr, (err, txCount) => {


        const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(800000), 
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                to: contAddr,
                data: contract.methods.incr().encodeABI()
        }

        const tx = new Tx(txObject)
        tx.sign(pkey)

        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)

           contract.methods.getVal().call((err, result) => { console.log("updated value is " + result) })
            
        })

    })
	

 } //send ends



async function loadMetaMask() {

    if (typeof web3 !== 'undefined'){
                    
        console.log('MetaMask is installed')

        web3.eth.getAccounts(function(err, accounts){
            
            myAccountAddress = accounts[0];
            console.log(myAccountAddress);
        }) //get accounts
    } //if
    else{
        console.log('MetaMask is not installed')
    }//else




}


async function getGameID(_addr) {
    console.log("Calling reset")
    var val=0;
    await contract.methods.newGameID().call(
             {from: _addr},  //working
            (err, result) => {
            console.log("current value ")
            console.log(result)
            val = result;
            }
        )
    return val;
}



