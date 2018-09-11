const suite = require('token-test-suite');
const MyToken = artifacts.require('CraiderToken');

contract('MyToken', function (accounts) {
	let options = {
		// accounts to test with, accounts[0] being the contract owner
		accounts: accounts,

		// factory method to create new token contract
		create: async function () {
			return await MyToken.new();
		},

		// factory callbacks to mint the tokens
		// use "transfer" instead of "mint" for non-mintable tokens
		mint: async function (token, to, amount) {
			return await token.transfer(to, amount, { from: accounts[0] });
		},

		// optional:
		// also test the increaseApproval/decreaseApproval methods (not part of the ERC-20 standard)
		increaseDecreaseApproval: true,

		// token info to test
		name: 'Craider Token',
		symbol: 'RAID',
		decimals: 18,

		// initial state to test
		initialSupply: 150000000,
		initialBalances: [
			[accounts[0], 150000000]
		],
		initialAllowances: [
			[accounts[0], accounts[1], 0]
		]
	};

	suite(options);
});