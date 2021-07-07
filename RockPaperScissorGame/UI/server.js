var express = require('express');
var app = express();
var path = require('path');
const Web3 = require('web3')
var Tx = require("ethereumjs-tx").Transaction;
var dotenvConfig = require('dotenv').config();

// app.get('/', async (req, res) => {
//     await loadMetaMask()

//    // console.log(process.env.DB_HOST);
//     res.sendFile(path.join(__dirname + '/index.html'));

// });



// app.post('/increment', async (req, res) =>{
//   //  console.log("increment");
//     await incr();
// 	res.send("incrementing value");
	
//  });

app.get('/rock', async (req, res) =>{
   await loadMetaMask()
    res.sendFile(path.join(__dirname + '/rock.html'));
	
 });

//  app.get('/getValue', async (req, res) =>{
   
// 	//	console.log("Calling reset")
//     await contract.methods.totalSupply().call((err, result) => { console.log("updated value is " + result) })
      

//  });


app.listen(8082);
console.log("server is up");

//web3.js code

// ganache url
const web3 = new Web3("http://127.0.0.1:7545")
//**NOTE** 'address' value should be changed to the address of the account which sends the transaction */
const addr = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const rockAddr = '0x9eDc608Db6bf4A75fDF989Fb9D038764260483d5' //contract address

	
var abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "gameID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "playerAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "betAmt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "choice",
				"type": "uint256"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "gameID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "gameResult",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winnerAddr",
				"type": "address"
			}
		],
		"name": "GameEnded",
		"type": "event"
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
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
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
		"inputs": [],
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
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "gameID",
				"type": "bytes32"
			}
		],
		"name": "getWinnerDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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

const contAddr = '0xF3164fa95fDac51a288fE5D1f9Fa1f543FE5fBD3' 
// const pkey = Buffer.from('68070420e79b5eb95983dbf1ab5af48f904e38c1404911318948395d734de5e7','hex')
const contract = new web3.eth.Contract(abi, contAddr)
const rockContract = new web3.eth.Contract(abi, rockAddr)

/*
async function incr() {

  //  console.log("incr impl");
	
    web3.eth.getTransactionCount(addr, (err, txCount) => {

     // (uint _choice, uint playerRandomness, uint noOfHour, bytes32 gameID) 
        const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(800000), 
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                to: contAddr,
                value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
                data: contract.methods.initiateGame(1, 12, 1, '0x5ffd832bc096ef015dc274558425ed449c6b78577d2641b968780a2a4708e5e6').encodeABI()
             //   data: contract.methods.incr('0x068518702a577f9338be0b06572f3d043b4f50707323a51ca86a09a6469d15eb').encodeABI()
        }

        const tx = new Tx(txObject)
        tx.sign(pkey)

        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          //  console.log('err:', err, 'txHash:', txHash)

          
        })

    })


	

} //send ends
*/

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

//rock UI


 app.get('/v1/gameId', function(req, res){
   
	  var curVal = getGameID(req.query.addr);
	  curVal.then(counterVal => {
	    	res.end(counterVal)

	  });
    
 });


app.get('/v1/winner', function(req, res){
  
	  var curVal = getWinner(req.query.gameID, req.query.playerAddr);
   
	  curVal.then(winneraddr => {
        console.log("/v1/winner  ",winneraddr);
	    	res.end(winneraddr);
	  });
    
 });


 app.post('/v1/bet', function(req, res){
        // var curVal = placeBet(req.query.choice, req.query.playerRandomness, req.query.gameexpiry, req.query.playerAddr,req.query.amount, req.query.gameID, req.query.user);   

        var curVal = placeBet(req.query.choice, req.query.playerRandomness, req.query.playerAddr,req.query.amount, req.query.gameID, req.query.user); 

        curVal.then(_bet => {
          res.end(_bet)
          });
    
 });



app.post('/v1/endgame', function(req, res){
  
  var curVal =  endGame(req.query.gameID, req.query.playerOne, 
                                  req.query.playerOnechoice, req.query.playerOneRandomness,
                                  req.query.playerTwo, req.query.playerTwoChoice, 
                                  req.query.playerTwoRandomness); 

    curVal.then(data => {
          res.end(data);
          
      });
  
 });
 

/*
async function initiateGame() {

    console.log("initiate game");
	
    web3.eth.getTransactionCount(addr, (err, txCount) => {

      var block = web3.eth.getBlock("latest");
      var _gasLimit = block.gasLimit/block.transactions.length;
      console.log("_gasLimit  ", _gasLimit);
      var _gaspPrice =  web3.eth.getGasPrice(function(e, r) { console.log(r) })
      console.log("_gaspPrice  ", _gaspPrice);

     // (uint _choice, uint playerRandomness, uint noOfHour, bytes32 gameID) 
        const txObject = {
                nonce:    web3.utils.toHex(txCount),
               gasLimit: web3.utils.toHex(800000), 
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                to: contAddr,
                value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
                data: contract.methods.initiateGame(1, 12, 1, '0x5ffd832bc096ef015dc274558425ed449c6b78577d2641b968780a2a4708e5e6').encodeABI()
             //   data: contract.methods.incr('0x068518702a577f9338be0b06572f3d043b4f50707323a51ca86a09a6469d15eb').encodeABI()
        }

        const tx = new Tx(txObject)
        tx.sign(pkey)

        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)

        })
    })
}
*/

//using
async function getGameID(_addr) {

    var val=0;
    await rockContract.methods.newGameID().call(
             {from: _addr},  //working
            (err, result) => {
            val = result;
            console.log("err ", err);
            }
        )
    return val;
}

//using
async function getWinner(_gameID, playerAddr) {

  //  console.log(_gameID, playerAddr);

    var val=0;
    await rockContract.methods.getWinnerDetails(_gameID).call(
             {from: playerAddr},  //working
            (err, result) => {
            val = result;
         //   console.log("val ",val);
            }
        )
    return val;
  
   // console.log("Calling getWinner")
  
}

//ar curVal = placeBet(req.query.choice, req.query.playerRandomness, req.query.playerAddr,req.query.amount, req.query.gameID, req.query.user); 
//using
async function placeBet(choice,  playerRandomness, playerAddr, betAmount, gameID, _user) {
      //  console.log("placebet");
       
	
    web3.eth.getTransactionCount(playerAddr, (err, txCount) => {//changed addr
      
      var _gasPrice = web3.eth.gasPrice;
      var _gasLimit = web3.eth.getBlock("latest").gasLimit; //referring to current block gas limit

        const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit:  web3.utils.toHex(800000), //previous
                gasPrice:  web3.utils.toHex(web3.utils.toWei('10', 'gwei')), //previous
                to: contAddr,
                value:  web3.utils.toHex(web3.utils.toWei(betAmount, 'wei')),   //web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),//previous value
                data: contract.methods.initiateGame(choice, playerRandomness, gameID).encodeABI() 
        }
        const tx = new Tx(txObject)
     
        if(_user == 1) {

            
              const pkey = Buffer.from(process.env.playerOneKey,'hex')
              tx.sign(pkey)

              const serializedTx = tx.serialize()
              const raw = '0x' + serializedTx.toString('hex')
              web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                  return "bet placed successfully"
              
              })

        } else {
             // console.log("player 2 ")
              const pkey = Buffer.from(process.env.playerTwoKey,'hex')
           
              tx.sign(pkey)
            
              const serializedTx = tx.serialize()
              const raw = '0x' + serializedTx.toString('hex')
              web3.eth.sendSignedTransaction(raw, (err, txHash) => {

                  console.log("err ", err);
                  return "bet placed successfully"
              })
        }
    })

}


async function endGame(_gameId, _playerOne, _playerOneChoice, _playerOneRandomness, _playerTwo, _playerTwoChoice, _playerTwoRandomness  ) {

        var message;
        web3.eth.getTransactionCount(_playerOne, (err, txCount) => {

        var _gasPrice = web3.eth.gasPrice;
        var _gasLimit = web3.eth.getBlock("latest").gasLimit;
        const txObject = {
              
                nonce:    web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(800000), 
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                to: contAddr,
                data: contract.methods.judgeWinner(_gameId, _playerOne, _playerOneChoice, _playerOneRandomness, _playerTwo, _playerTwoChoice, _playerTwoRandomness).encodeABI() 
            
        }

        const tx = new Tx(txObject)
     

        const pkey = Buffer.from(process.env.playerOneKey,'hex')
       
        tx.sign(pkey)
       
        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')
       var obj =  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                 console.log("err ", err);
                  if(txHash != null) {
                         
                    message ='game ended successfully'; 
                  } else {

                    message ='Issue in ending game'; 
                  }

                return message;
              
              }).events //sendsign tx

        })//web3
    
}




