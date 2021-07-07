// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract add {
 
    uint a ;


  
  function incr(bytes32 _val) public payable {
      address   addr = msg.sender;
      a= a +1;
     
    
  }

  function getVal() public returns(uint) {
      return a;
  }


  function initiateGame(uint _choice, uint playerRandomness, uint noOfHour, bytes32 gameID) payable public returns(bytes32) {
       
        bytes32 _gameId =gameID; 
        
       // require (_choice >= 0,"choice shouldbe greater then zero"); 
        //require (_choice <= 2, "choice should be less then or equal to two"); 
    
                // gameIDToGame[_gameId].playerOneAddress = msg.sender;
                // gameIDToGame[_gameId].playerOneChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
                // gameIDToGame[_gameId].playerOneBetAmount = msg.value;
    /*
        if(address(gameIDToGame[_gameId].playerOneAddress) == address(0)) { //player 1 has placed his bet , so player 2 will put his bet

                gameIDToGame[_gameId].playerOneAddress = msg.sender;
                gameIDToGame[_gameId].playerOneChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
                gameIDToGame[_gameId].playerOneBetAmount = msg.value;
           // require(now < gameIDToGame[_gameId].expiryTime, "Max waiting time has already passed");
            
            //
           // gameIDToGame[_gameId].playerTwoAddress = msg.sender;
        //    gameIDToGame[_gameId].playerTwoChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
          //  gameIDToGame[_gameId].playerTwoBetAmount = msg.value;
            
        } else {//player 1 will place his bet
        
          //  gameIDToGame[_gameId].playerOneAddress = msg.sender;
          //  gameIDToGame[_gameId].playerOneChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
          //  gameIDToGame[_gameId].playerOneBetAmount = msg.value;
          
           gameIDToGame[_gameId].playerTwoAddress = msg.sender;
           gameIDToGame[_gameId].playerTwoChoice = keccak256(abi.encodePacked(_choice, playerRandomness));
           gameIDToGame[_gameId].playerTwoBetAmount = msg.value;
        }
    */
        return _gameId;

    }


}
