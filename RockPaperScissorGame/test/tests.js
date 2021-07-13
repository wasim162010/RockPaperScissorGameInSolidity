const { assert } = require('chai');

const RockPaperScissors = artifacts.require('RockPaperScissors');

contract('RockPaperScissors', (accounts) =>{
    var p1RandomnessGenerator = 1234;
    var p2RandomnessGenerator = 12345;

    var player1 = accounts[1];
    console.log("player1 ", player1);
    var player2 = accounts[2];
    console.log("player2 ", player2);
    
    var instance ;
    var p1Bet = web3.utils.toWei('20000', 'wei');
    var p2Bet = web3.utils.toWei('15000', "wei");

    it('should deploy contract properly', async() => {

        instance = await RockPaperScissors.deployed();
        assert.notEqual(instance.address !== '');
    });

    it('should create unique game id', async() => {

        var gameID  = await instance.newGameID.call({from:player1});
        assert.notEqual(gameID !== '');

    });

 
    it('player one select rock, player 2 selects paper.', async() => {
      
        var gameID  = await instance.newGameID.call({from:player1});

        var contractInstance = await RockPaperScissors.deployed();

        await instance.initiateGame(0, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  
        

        await instance.initiateGame(1, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); 
     
        await instance.judgeWinner(gameID, player1, 0, p1RandomnessGenerator, player2, 1, p2RandomnessGenerator, {from: player1});
      
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
      
        assert(winnerAddr == player2);


    });

      
    it('player one select paper, player 2 selects scissor.', async() => {
       var gameID  = await instance.newGameID.call({from:player1});
        var contractInstance = await RockPaperScissors.deployed();

        await instance.initiateGame(1, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet }); 
        let balance = await web3.eth.getBalance(instance.address);
        console.log('balance is ', balance);

        await instance.initiateGame(2, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); 
              
        await instance.judgeWinner(gameID, player1, 1, p1RandomnessGenerator, player2, 2, p2RandomnessGenerator, {from: player1});
       
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
       

        assert(winnerAddr == player2);
        
    });
   
 it('player one select paper, player 2 selects rock.', async() => { 
        var gameID  = await instance.newGameID.call({from:player1});
        var contractInstance = await RockPaperScissors.deployed();
          
        await instance.initiateGame(1, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  
      
        await instance.initiateGame(0, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); 
        
        await instance.judgeWinner(gameID, player1, 1, p1RandomnessGenerator, player2, 0, p2RandomnessGenerator, {from: player1});
       
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
        

        assert(winnerAddr == player1);
    });

     it('player one select rock, player 2 selects scissor.', async() => { 
       
        var gameID  = await instance.newGameID.call({from:player1});
        var contractInstance = await RockPaperScissors.deployed();
          
        await instance.initiateGame(0, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  
        
        await instance.initiateGame(2, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); 
         
        await instance.judgeWinner(gameID, player1, 0, p1RandomnessGenerator, player2, 2, p2RandomnessGenerator, {from: player1});
       
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
      

        assert(winnerAddr == player1);
    });


     it('player one select scissor, player 2 selects rock.', async() => { 
      
        var gameID  = await instance.newGameID.call({from:player1});
        var contractInstance = await RockPaperScissors.deployed();
          
        await instance.initiateGame(2, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  
  
        await instance.initiateGame(0, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet });

        await instance.judgeWinner(gameID, player1, 2, p1RandomnessGenerator, player2, 0, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
      

        assert(winnerAddr == player2);
    });


    it('player one select rock, player 2 selects rock.', async() => { 
     
        var gameID  = await instance.newGameID.call({from:player1});
        var contractInstance = await RockPaperScissors.deployed();
          
        await instance.initiateGame(0, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  
        
        await instance.initiateGame(0, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet });
           
        await instance.judgeWinner(gameID, player1, 0, p1RandomnessGenerator, player2, 0, p2RandomnessGenerator, {from: player1});
    
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
  
        assert(winnerAddr != player1);
        assert(winnerAddr != player2);
    });
    
    it('player one select paper, player 2 selects paper.', async() => { 
      
        var gameID  = await instance.newGameID.call({from:player1});
        var contractInstance = await RockPaperScissors.deployed();
          
        await instance.initiateGame(1, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet }); 
     
        await instance.initiateGame(1, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); 
        
        await instance.judgeWinner(gameID, player1, 1, p1RandomnessGenerator, player2, 1, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
        assert(winnerAddr != player1);
        assert(winnerAddr != player2);
    });

    it('player one select scissor, player 2 selects scissor.', async() => { 
      
        var gameID  = await instance.newGameID.call({from:player1});
        var contractInstance = await RockPaperScissors.deployed();
          
        await instance.initiateGame(2, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet }); 
     
        await instance.initiateGame(2, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); 
        
        await instance.judgeWinner(gameID, player1, 2, p1RandomnessGenerator, player2, 2, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log("winner is " , winnerAddr);
        assert(winnerAddr != player1);
        assert(winnerAddr != player2);
    });
    
    

});
