var braintree = require('braintree');



var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'xypn3777sprp8pqb',
  publicKey: 'fp8wsvrf3wbv23bv',
  privateKey: 'd16c566657edb8bf93ad15c4422e7bbb'
});

module.exports = gateway;