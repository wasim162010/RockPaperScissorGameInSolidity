const add = artifacts.require("RockPaperScissors");

module.exports = function (deployer) {
  deployer.deploy(add);
};
