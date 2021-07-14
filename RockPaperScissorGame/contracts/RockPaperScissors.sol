pragma solidity 0.5.16;

contract RockPaperScissors {


    uint8 constant ROCK = 0;
    uint8 constant PAPER = 1;
    uint8 constant SCISSORS = 2;
   
    struct GameData {
       
       address payable playerOneAddress;
       bytes32 playerOneChoice;
       uint playerOneBetAmount;
      
       address payable playerTwoAddress;
       bytes32 playerTwoChoice;
       uint playerTwoBetAmount;

     //  uint expiryTime;

       uint startDate ;
       uint endDate;

       address payable winner;


    }

    mapping (bytes32 => GameData) gameIDToGame;

    event BetPlaced(bytes32 gameID, address playerAddr, uint betAmt, uint choice);

    event GameEnded(bytes32 gameID, string gameResult, address winnerAddr);
  
    event rewardedWinner(bytes32 gameID, uint256 amount, address winnerAddr);
    
    event gameExpired(bytes32 gameID, uint256 amount);

    constructor() public {

    }

/*
to generate the unique game id
*/
    function newGameID()   
        public view
        returns (bytes32 _hashGameID)
    {
        return keccak256(abi.encodePacked(msg.sender));
    }
    
    
/*
to start the game by choosing the option and sending ethers as a bet amount
*/
    function initiateGame(uint _choice, uint playerRandomness, bytes32 gameID) payable public returns(bytes32) {
       
        bytes32 _gameId =gameID; 
        
        require (_choice >= 0); 
        require (_choice <= 2); 
    
        if(address(gameIDToGame[_gameId].playerOneAddress) != address(0)) { //player 1 has placed his bet , so player 2 will put his bet

          
            if(now > gameIDToGame[_gameId].endDate) { //it has exceeded expiry time
            
                handleGameExpiry(gameID);

            } else {
            
                gameIDToGame[_gameId].playerTwoAddress = msg.sender;
                gameIDToGame[_gameId].playerTwoChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
                gameIDToGame[_gameId].playerTwoBetAmount = msg.value;
                
            }
            emit BetPlaced(gameID, msg.sender, msg.value, _choice);
        } else {//player 1 will place his bet
    
                gameIDToGame[_gameId].playerOneAddress = msg.sender;
                gameIDToGame[_gameId].playerOneChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
                gameIDToGame[_gameId].playerOneBetAmount = msg.value;
                gameIDToGame[_gameId].startDate = now; 
                gameIDToGame[_gameId].endDate = now + 1 days; 
            emit BetPlaced(gameID, msg.sender, msg.value, _choice);
        }
            
            return _gameId;
    }


/*
to find out the winner of a game and  reward winner.
*/
    function judgeWinner(
            bytes32 _gameId,
            address payable playerOne,
            uint _playerOneChoice,
            uint playerOneRandomness, // CHANGED - Randomness added which prevents the other user from correctly guessing the move of the other player
            address payable playerTwo,
            uint _playerTwoChoice,
            uint playerTwoRandomness
            ) public returns(string memory)
        {
                string memory winningParty;
                require (_gameId != 0,"game id shouldnt be zero");

                if (_playerOneChoice == _playerTwoChoice) {
                    
                    winningParty ="Tie";
                    gameIDToGame[_gameId].winner = address(0);
                    handleTie(playerOne, playerTwo, _gameId ); 

                } else if ((_playerOneChoice == ROCK && _playerTwoChoice == SCISSORS) //p1 Rock wins over scissors (because rock smashes scissors)
                        || (_playerOneChoice == SCISSORS && _playerTwoChoice == PAPER) //p1 Scissors wins over paper (because scissors cut paper)
                        || (_playerOneChoice == PAPER && _playerTwoChoice == ROCK)) //p1 Paper wins over rock (because paper covers rock)
                { // p1 won
                   
                    winningParty = "playerOne";
                    gameIDToGame[_gameId].winner = playerOne;
                    rewardWinner(playerOne, _gameId);

                } 
                else if ((_playerTwoChoice == ROCK && _playerOneChoice == SCISSORS) //p2 Rock wins over scissors (because rock smashes scissors)
                        || (_playerTwoChoice == SCISSORS && _playerOneChoice == PAPER) //p2 Scissors wins over paper (because scissors cut paper)
                        || (_playerTwoChoice == PAPER && _playerOneChoice == ROCK)) //p2 Paper wins over rock (because paper covers rock)
                { // p2 won

                    winningParty = "playerTwo";
                    gameIDToGame[_gameId].winner = playerTwo;
                    rewardWinner(playerTwo, _gameId);

                }
                
                emit GameEnded(_gameId, winningParty, gameIDToGame[_gameId].winner);
                return winningParty;
}

/*
to transfer the winning amount to the winner's account.
*/ 
function rewardWinner(address  winnerAddress, bytes32 _gameId) private returns(bool){

        uint256 contBal = address(this).balance;

        if(gameIDToGame[_gameId].playerOneAddress == gameIDToGame[_gameId].winner) {
            
             uint256 winnerBetAmt = gameIDToGame[_gameId].playerOneBetAmount ;
             
             if((winnerBetAmt * 2) <= contBal) {
                 uint256 amtToTransfer = winnerBetAmt * 2;
                 address(gameIDToGame[_gameId].winner).transfer(amtToTransfer);
                 emit rewardedWinner(_gameId, winnerBetAmt , gameIDToGame[_gameId].winner);
             } else {
    // if this current bakance of contract is not enough to pay thw twice of the winner's bet amount, then at least amount left 
    // post deduction of other's bet amount from contract balance will be transferred.
                 uint256 amtToTransfer = contBal - gameIDToGame[_gameId].playerTwoBetAmount;
                 address(gameIDToGame[_gameId].winner).transfer(amtToTransfer);
             }
           return true;
                
        } else if(gameIDToGame[_gameId].playerTwoAddress == gameIDToGame[_gameId].winner) {
            
            uint256 winnerBetAmt = gameIDToGame[_gameId].playerTwoBetAmount ;
            
            if((winnerBetAmt * 2) <= contBal) {
                 uint256 amtToTransfer = winnerBetAmt * 2;
                 address(gameIDToGame[_gameId].winner).transfer(amtToTransfer);
                 emit rewardedWinner(_gameId, winnerBetAmt , gameIDToGame[_gameId].winner);
             } else {
    // if this current bakance of contract is not enough to pay thw twice of the winner's bet amount, then at least amount left 
    // post deduction of other's bet amount from contract balance will be transferred.
                 uint256 amtToTransfer = contBal - gameIDToGame[_gameId].playerOneBetAmount;
                 address(gameIDToGame[_gameId].winner).transfer(amtToTransfer);
             }
            return true;
        } 
        return false;
    
}

/*
to fetch the winner corresponding to the game id.
*/
function getWinnerDetails(bytes32 gameID) public view returns(address){

    return gameIDToGame[gameID].winner;

}


/*
to transfer back the amt that was transferred as a bet amount back to the player one address.
*/
function handleGameExpiry(bytes32 _gameId) private returns(bool){
        
         address(gameIDToGame[_gameId].playerOneAddress).transfer(gameIDToGame[_gameId].playerOneBetAmount);
         emit gameExpired( _gameId, gameIDToGame[_gameId].playerOneBetAmount);
    }

/*
to handle the tie.
*/
function handleTie(address playerOne, address playerTwo, bytes32 _gameId) private { 
  
    address payable _payableOneAddress = address(uint160(playerOne));
    address payable _payableTwoAddress = address(uint160(playerTwo));
    
    _payableOneAddress.transfer(gameIDToGame[_gameId].playerOneBetAmount);
    
    _payableTwoAddress.transfer(gameIDToGame[_gameId].playerTwoBetAmount);
   
}






}



