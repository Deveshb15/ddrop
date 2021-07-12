//Import Contractconst DStorage = artifacts.require("DStorage");
const DDrop = artifacts.require("DDrop");

module.exports = function(deployer) {
	//Deploy Contract
	deployer.deploy(DDrop);
};
