const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')
const ColorMarketplace = artifacts.require('./ColorMarketplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ColorMarketplace', (accounts) => {
  let colorMarketplace, token

  beforeEach( async () => {
    token = await Color.new()
    colorMarketplace = await ColorMarketplace.new(token.address)
  })

  describe('testing')

})