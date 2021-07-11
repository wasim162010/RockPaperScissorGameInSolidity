/*

    THIS IS AN ONGOING WORK AND IS YET TO E COMPLETED. 


*/

const { assert } = require('chai');

const RockPaperScissors = artifacts.require('RockPaperScissors');

contract('RockPaperScissors', (accounts) =>{
    var p1RandomnessGenerator = 1234;
    var p2RandomnessGenerator = 12345;

    var player1 = accounts[1];
    console.log("player1 ", player1);
    var player2 = accounts[2];
    console.log("player2 ", player2);
    var gameID ;
    var instance ;
    var p1Bet = web3.utils.toWei('20000', 'wei');
    var p2Bet = web3.utils.toWei('15000', "wei");

    it('should deploy contract properly', async() => {

        instance = await RockPaperScissors.deployed();
        console.log(instance.address);
        assert.notEqual(instance.address !== '');
        

    });

    it('should create unique game id', async() => {

        gameID = await instance.newGameID.call({from:player1});
        console.log(gameID);
        assert.notEqual(gameID !== '');

    });

    it('Scenario 1', async() => {
        
        instance.initiateGame(0, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet }); //p1 is rock
        instance.initiateGame(1, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); // p2 is paper
        
        await instance.judgeWinner(gameID, player1, 0, p1RandomnessGenerator, player2, 1, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log(winnerAddr);
        
        assert(instance.balance !== '');


    });

    it('Scenario 2', async() => {
        
        instance.initiateGame(0, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  //p1 is rock 0
        instance.initiateGame(2, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); // p2 is scissor 2
        
        await instance.judgeWinner(gameID, player1, 0, p1RandomnessGenerator, player2, 2, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log(winnerAddr);
      
        assert(instance.balance !== '');
    });

    it('Scenario 3', async() => {
        
        instance.initiateGame(1, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  //p1 is rock 1
        instance.initiateGame(2, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); // p2 is scissor 2
        
        await instance.judgeWinner(gameID, player1, 1, p1RandomnessGenerator, player2, 2, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log(winnerAddr);
        
        assert(instance.balance !== '');
    });


    it('Scenario 4', async() => {
        
        instance.initiateGame(1, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  //p1 is rock 1
        instance.initiateGame(1, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); // p2 is scissor 1
        
        await instance.judgeWinner(gameID, player1, 1, p1RandomnessGenerator, player2, 1, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log(winnerAddr);
        
        assert(instance.balance !== '');
    });


    it('Scenario 4', async() => {
        
        instance.initiateGame(1, p1RandomnessGenerator, gameID,{from: player1, value: p1Bet });  //p1 is rock 1
        instance.initiateGame(1, p2RandomnessGenerator, gameID, {from: player2, value: p2Bet }); // p2 is scissor 1
        
        await instance.judgeWinner(gameID, player1, 1, p1RandomnessGenerator, player2, 1, p2RandomnessGenerator, {from: player1});
        
        var winnerAddr = await instance.getWinnerDetails.call(gameID, {from: player1});
        console.log(winnerAddr);
        
        assert(instance.balance !== '');
    });

});
