# RockPaperScissorGameInSolidity


It uses OpenZeppelin Truffle Upgrades to upgrade the contract.

To deploy contract : npx truffle migrate 

Flow :
Remix IDE screenshots:


 

Initiate game:


 

Smart contract execution [Remix IDE]

Deploying smart contract:
 

Starting game by generating the gameid:

 



Placing bet:
Player 1 addr   0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

 
 


Player 2 addr :   0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
 

 

End game:
When we end game from UI, ‘judgeWinner’ gets called.

 
 


View result:
When we clock on ‘View result’ game from UI, ‘judgeWinner’ gets called.
 


UI Screenshots:

 


Player one initiated game by generating game id
 


Player one placing bet :

 




Console log
 

Player 2 placing bet

 

Console log

 

End game:

 

Console log
 

View result :

 

Console log [No log statements were put in method, but no error got logged.]

 



In case of Tie

 


Contract deployment on testnet:
















![image](https://user-images.githubusercontent.com/47940538/124917874-f9815280-e011-11eb-9552-646749199041.png)
