# RockPaperScissorGameInSolidity



Flow :


1. Deploying smart contract.
 
2. Starting game by generating the gameid

3. Player 1 place bet.

4. Player 2 place bet 
 
5. End the game

6. View result.

 
 ![image](https://user-images.githubusercontent.com/47940538/124918216-6a286f00-e012-11eb-9f14-095e0040730c.png)

![image](https://user-images.githubusercontent.com/47940538/124918253-76acc780-e012-11eb-813e-f36ff9e86ed8.png)

![image](https://user-images.githubusercontent.com/47940538/124918274-7dd3d580-e012-11eb-9e59-3877304dab8d.png)

![image](https://user-images.githubusercontent.com/47940538/124918283-81fff300-e012-11eb-8ab5-ea573b148507.png)

![image](https://user-images.githubusercontent.com/47940538/124918299-86c4a700-e012-11eb-8827-0bf955ac58d1.png)

![image](https://user-images.githubusercontent.com/47940538/124918320-8d531e80-e012-11eb-959b-80967fdc2b6c.png)

![image](https://user-images.githubusercontent.com/47940538/124918338-904e0f00-e012-11eb-9ff3-83014e0faecc.png)

![image](https://user-images.githubusercontent.com/47940538/124918372-9512c300-e012-11eb-806e-2b7419428602.png)

![image](https://user-images.githubusercontent.com/47940538/124918385-980db380-e012-11eb-9202-6663b216277f.png)


UI Screenshots :
![image](https://user-images.githubusercontent.com/47940538/124918421-a3f97580-e012-11eb-9dc2-8335dc779acd.png)

![image](https://user-images.githubusercontent.com/47940538/124918433-a6f46600-e012-11eb-827b-5e3e6f0c9dc6.png)

![image](https://user-images.githubusercontent.com/47940538/124918446-a9ef5680-e012-11eb-9726-103844b8bbd5.png)

![image](https://user-images.githubusercontent.com/47940538/124918457-acea4700-e012-11eb-9281-8ce7fec447f1.png)

![image](https://user-images.githubusercontent.com/47940538/124918471-b07dce00-e012-11eb-9eda-94b0214c964a.png)

![image](https://user-images.githubusercontent.com/47940538/124918473-b2e02800-e012-11eb-9d89-44804848d192.png)

![image](https://user-images.githubusercontent.com/47940538/124918484-b5428200-e012-11eb-9215-2424a5f17fb1.png)

![image](https://user-images.githubusercontent.com/47940538/124918491-b7a4dc00-e012-11eb-94c5-bbd67f364fd3.png)

![image](https://user-images.githubusercontent.com/47940538/124918502-ba9fcc80-e012-11eb-9d44-f05e0becd595.png)

![image](https://user-images.githubusercontent.com/47940538/124918511-bd9abd00-e012-11eb-93da-0c4319a2dafc.png)

![image](https://user-images.githubusercontent.com/47940538/124918523-c095ad80-e012-11eb-9d85-cf6bdfdc487b.png)


Contract deployment on testnet[Ropsten]:

Deployed contract address :    0x18A8c8C3c86ff0C6DFA71CD2a4dD976FbFabb21D
![image](https://user-images.githubusercontent.com/47940538/124920755-4c103e00-e015-11eb-8328-b400e3eeb05b.png)

![image](https://user-images.githubusercontent.com/47940538/124920844-63e7c200-e015-11eb-91b3-ef74881e74e5.png)


Bug resolution:

I have found out a bug in the code and have made code changes. Secondly, in the previous code when the contract balance is not enough to twice the bet amount of the winner, then no transfer was happening. Post change, now the amount equal to the bet amount will be transferred to the winner in case the contract does not have the enough balance to reward twice the bet amount to the winner as a transfer.

Updated contract address [Ropsten] : 0x534d63d4b9e5cA173fF11326998ABea2517C0E11


 





![image](https://user-images.githubusercontent.com/47940538/125693583-f272dade-b542-4485-bedf-f242130b3c0a.png)





