pragma solidity 0.5.16;

contract RockPaperScissors {


    uint8 constant ROCK = 0;
    uint8 constant PAPER = 1;
    uint8 constant SCISSORS = 2;
   
    struct GameData {
       
       address playerOneAddress;
       bytes32 playerOneChoice;
       uint playerOneBetAmount;
      
       address playerTwoAddress;
       bytes32 playerTwoChoice;
       uint playerTwoBetAmount;

       uint expiryTime;

       uint startDate ;//new
       uint endDate;//1518220800 //new

       address winner;

       //uint diff = (endDate - startDate) / 60 / 60 / 24; 

    }

    mapping (bytes32 => GameData) gameIDToGame;
    enum Hand {NONE, Rock, Scissors, Paper}

    event BetPlaced(bytes32 gameID, address playerAddr, uint betAmt, uint choice);

    event GameEnded(bytes32 gameID, string gameResult, address winnerAddr);
  
    constructor() public {

    }

    function newGameID()   
        public view
        returns (bytes32 _hashGameID)
    {
        return keccak256(abi.encodePacked(msg.sender));
    }
    
    function initiateGame(uint _choice, uint playerRandomness, bytes32 gameID) payable public returns(bytes32) {
       
        bytes32 _gameId =gameID; 
        
        require (_choice >= 0); 
        require (_choice <= 2); 
    
        if(address(gameIDToGame[_gameId].playerOneAddress) == address(0)) { //player 1 has placed his bet , so player 2 will put his bet

          //  require(now < gameIDToGame[_gameId].expiryTime, "Max waiting time has already passed");
            
            gameIDToGame[_gameId].playerOneAddress = msg.sender;
            gameIDToGame[_gameId].playerOneChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
            gameIDToGame[_gameId].playerOneBetAmount = msg.value;
            
            gameIDToGame[_gameId].startDate = now; //new
            gameIDToGame[_gameId].endDate = now + 1 days; //new
           
        } else {//player 1 will place his bet

            uint diff = (gameIDToGame[_gameId].endDate - gameIDToGame[_gameId].startDate) / 60 / 60 / 24; // 40 days 
            require(diff<=1, "Expiry time has passed"); //new

            gameIDToGame[_gameId].playerTwoAddress = msg.sender;
            gameIDToGame[_gameId].playerTwoChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
            gameIDToGame[_gameId].playerTwoBetAmount = msg.value;
            
        }
        emit BetPlaced(gameID, msg.sender, msg.value, _choice);
        return _gameId;
    }


    function judgeWinner(
            bytes32 _gameId,
            address playerOne,
            uint _playerOneChoice,
            uint playerOneRandomness, // CHANGED - Randomness added which prevents the other user from correctly guessing the move of the other player
            address playerTwo,
            uint _playerTwoChoice,
            uint playerTwoRandomness) public returns(string memory)
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

    
    function rewardWinner(address  winnerAddress, bytes32 _gameId) private returns(bool){

        if(gameIDToGame[_gameId].playerOneAddress == winnerAddress) {
            
            require(address(this).balance >= (gameIDToGame[_gameId].playerOneBetAmount * 2), "Contract balance is not sufficient");
            address payable _payableWinnerAddress = address(uint160(winnerAddress));
            _payableWinnerAddress.transfer(gameIDToGame[_gameId].playerOneBetAmount * 2); //level 1
            return true;
                
        } else if(gameIDToGame[_gameId].playerOneAddress == winnerAddress) {
            
            require(address(this).balance >= (gameIDToGame[_gameId].playerTwoBetAmount * 2), "Contract balance is not sufficient");
            address payable _payableWinnerAddress = address(uint160(winnerAddress));
            _payableWinnerAddress.transfer(gameIDToGame[_gameId].playerTwoBetAmount * 2); //level 1
            return true;
        } 
        return false;
    
}

function getWinnerDetails(bytes32 gameID) public view returns(address){

    return gameIDToGame[gameID].winner;

}

function handleTie(address playerOne, address playerTwo, bytes32 _gameId) private { 
  
    address payable _payableOneAddress = address(uint160(playerOne));
    address payable _payableTwoAddress = address(uint160(playerTwo));
    
    _payableOneAddress.transfer(gameIDToGame[_gameId].playerOneBetAmount);
    
    _payableTwoAddress.transfer(gameIDToGame[_gameId].playerTwoBetAmount);
   
}



}



/*
1 InitiateGame() : create game id using msg.sender and now and return it . It will generate the 
2 Place the bet() : place your bet : by entering the player address, value(in wei) and bet. Store the bet in the ledger
    
3 Evaluate() : player 2 
*/



