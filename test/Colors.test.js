const { assert } = require('chai')


const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts) => {
  let contract

  before( async () => {
    contract = await Color.deployed()
  })

  describe('deployment', async () => {
      it('deploys successfully', async () => {
        const address = contract.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
        const name = await contract.name()
        assert.equal(name, 'Color')
      })

      it('has a symbol', async () => {
        const symbol = await contract.symbol()
        assert.equal(symbol, 'COLORS')
      })
  })

  describe('minting', async () => {

    it('creates a new token', async () => {
      const result = await contract.mint('#EC058E')
      const totalSupply = await contract.totalSupply()

      //success
      assert.equal(totalSupply, 1)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), totalSupply, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')

      //failure: cannot mint the same token
      await contract.mint('#EC058E').should.be.rejected
    })
  })

  describe('indexing', async () => {
    it('lists colors', async () => {
      //mint 3 more tokens
      await contract.mint('#5386E4')
      await contract.mint('#FFFFFF')
      await contract.mint('#000000')

      const totalSupply = await contract.totalSupply()
      let color
      let result = []

      for (var i=1; i <= totalSupply; i++){
        color = await contract.colors(i - 1)
        result.push(color)
      }

      let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
      assert.equal(result.join(','), expected.join(','))
    })
  })

  describe('selling', async () => {

    it('put for sale', async () => {
      const token = await contract.mint('#810034')
      const tokenId = token.logs[0].args.tokenId.toNumber()
      let price = 20
      await contract.allowBuy(tokenId, price)
      let priceToken = await contract.tokenIdToPrice(tokenId)

      assert.equal(priceToken.toNumber(), price, 'price is correct')
    })

    it('remove from sale', async () => {
      const lastTokenId = await contract.totalSupply()
      await contract.disallowBuy(lastTokenId)
      let priceToken = await contract.tokenIdToPrice(lastTokenId)

      assert.equal(priceToken.toNumber(), 0, 'price is correct')
    })

    it('buy', async () => {

    })
  })
})