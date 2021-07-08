var express = require('express');
var app = express();
var path = require('path');
const Web3 = require('web3')
var Tx = require("ethereumjs-tx").Transaction;
var dotenvConfig = require('dotenv').config();



app.get('/', async (req, res) =>{
   await loadMetaMask()
    res.sendFile(path.join(__dirname + '/rock.html'));
	
 });


app.listen(8082);
console.log("server is up");

//web3.js code

// ganache url
const web3 = new Web3("http://127.0.0.1:7545")

//**NOTE** 'address' value should be changed to the address of the account which sends the transaction */
const rockAddr = '0x534d63d4b9e5cA173fF11326998ABea2517C0E11' //game contract address

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

 
const rockContract = new web3.eth.Contract(abi, rockAddr)

//rock UI

 app.get('/v1/gameId', function(req, res){
   
	  var curVal = getGameID(req.query.addr);
	  curVal.then(counterVal => {
	    	res.end(counterVal)

	  });
 });

 const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

app.get('/v1/winner', async(req, res)=>{
  
	var _val = await getWinner(req.query.gameID, req.query.playerAddr) ;
	res.end(_val);
    
 });


 app.post('/v1/bet', function(req, res){
		
		console.log("/v1/bet");
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
 


async function getGameID(_addr) {

    var val=0;
    await rockContract.methods.newGameID().call(
             {from: _addr},  
            (err, result) => {
            val = result;
            console.log("err ", err);
            }
        )
    return val;
}


async function getWinner(_gameID, playerAddr) {

    console.log(_gameID, playerAddr);

    var val=0;
    await rockContract.methods.getWinnerDetails(_gameID).call(
             {from: playerAddr},  
            (err, result) => {
			val = result;  
			}
	)


  return val;
  
}



async function placeBet(choice,  playerRandomness, playerAddr, betAmount, gameID, _user) {

	console.log(choice,  playerRandomness, playerAddr, betAmount, gameID, _user);

    web3.eth.getTransactionCount(playerAddr, (err, txCount) => {
      console.log("getTransactionCount");
	
    //   var _gasPrice = web3.eth.gasPrice;
	//   var _gasLimit = web3.eth.getBlock("latest").gasLimit; //referring to current block gas limit
	

	  console.log(_gasPrice,_gasLimit);
        const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit:   web3.utils.toHex(800000), 
                gasPrice:   web3.utils.toHex(web3.utils.toWei('10', 'gwei')), 
                to: rockAddr, 
				value:  web3.utils.toHex(web3.utils.toWei(betAmount, 'wei')),  
				data: rockContract.methods.initiateGame(choice, playerRandomness, gameID).encodeABI() 
        }
        const tx = new Tx(txObject)
		console.log("tx ", tx);
        if(_user == 1) {

			  console.log("user one");
			
              const pkey = Buffer.from(process.env.playerOneKey,'hex')
              tx.sign(pkey)
			  console.log("tx.sign");
			  const serializedTx = tx.serialize()
			  console.log("serilizaedtx");
			  const raw = '0x' + serializedTx.toString('hex')
			  console.log("raw");
              web3.eth.sendSignedTransaction(raw, (err, txHash) => {
				  console.log("err :", err,  "txHash ", txHash);
                  return "bet placed successfully"
              
              })

        } else {
              console.log("user two ")
              const pkey = Buffer.from(process.env.playerTwoKey,'hex')
           
              tx.sign(pkey)
            
              const serializedTx = tx.serialize()
              const raw = '0x' + serializedTx.toString('hex')
              web3.eth.sendSignedTransaction(raw, (err, txHash) => {

				console.log("err :", err,  "txHash ", txHash);
                  return "bet placed successfully"
              })
        }
    })

}


async function endGame(_gameId, _playerOne, _playerOneChoice, _playerOneRandomness, _playerTwo, _playerTwoChoice, _playerTwoRandomness  ) {

		console.log(" 						**	endGame	**						");
		console.log(_gameId, _playerOne, _playerOneChoice, _playerOneRandomness, _playerTwo, _playerTwoChoice, _playerTwoRandomness );
        var message;
        web3.eth.getTransactionCount(_playerOne, (err, txCount) => {

        var _gasPrice = web3.eth.gasPrice;
		var _gasLimit = web3.eth.getBlock("latest").gasLimit;
		console.log(_gasPrice,_gasLimit );
        const txObject = {
              
                nonce:    web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(800000), 
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
				to:rockAddr,
				data: rockContract.methods.judgeWinner(_gameId, _playerOne, _playerOneChoice, _playerOneRandomness, _playerTwo, _playerTwoChoice, _playerTwoRandomness).encodeABI() 
            
        }

        const tx = new Tx(txObject)
		console.log("tx");

        const pkey = Buffer.from(process.env.playerOneKey,'hex')
		console.log("pk");
        tx.sign(pkey)
		console.log("tx.sign");
		const serializedTx = tx.serialize()
		console.log("serialized");
		const raw = '0x' + serializedTx.toString('hex')
		console.log("raw");
        var obj =  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
				 console.log("err ", err);
				 console.log("txHash ", txHash);
                  if(txHash != null) {
                         
                    message ='game ended successfully'; 
                  } else {

                    message ='Issue in ending game'; 
                  }

                return message;
              
              }).events 

        })//web3
    
}


async function loadMetaMask() {

    if (typeof web3 !== 'undefined'){
                    
        console.log('MetaMask is installed')
        web3.eth.getAccounts(function(err, accounts){
            myAccountAddress = accounts[0];
            console.log(myAccountAddress);
        }) //get accounts
    } 
    else{
        console.log('MetaMask is not installed')
    }

}




