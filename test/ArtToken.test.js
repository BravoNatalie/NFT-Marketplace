const { assert } = require('chai')

const ArtToken = artifacts.require('./ArtToken')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ArtToken', (accounts) => {
  let artToken

  beforeEach( async () => {
    artToken = await ArtToken.deployed()
  })

  describe('deployment', async () => {
      it('deploys successfully', async () => {
        const address = artToken.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
        const name = await artToken.name()
        assert.equal(name, 'ArtToken')
      })

      it('has a symbol', async () => {
        const symbol = await artToken.symbol()
        assert.equal(symbol, 'ARTK')
      })
  })

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await artToken.mint('#EC058E')

      const event = result.logs[0].args
      const tokenId = event.tokenId.toNumber()
      const totalSupply = await artToken.totalSupply()
      const item = await artToken.Items(tokenId)
      const owner = await artToken.ownerOf(tokenId)
      const approvedAddress = await artToken.getApproved(tokenId)
      console.log(approvedAddress)

      //success
      assert.equal(tokenId, totalSupply, 'id is correct')
      assert.equal(item.uri, '#EC058E', 'color is correct')
      assert.equal(item.creator, owner, 'creator is correct')
      // assert.equal(approvedAddress, market.address, 'approved address is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')
    })
  })

  describe('indexing', async () => {
    it('lists colors', async () => {
      //mint 3 more tokens
      await artToken.mint('#5386E4')
      await artToken.mint('#FFFFFF')
      await artToken.mint('#000000')

      const totalSupply = await artToken.totalSupply()
      let item
      let result = []

      for (var i=1; i <= totalSupply; i++){
        item = await artToken.Items(i)
        result.push(item.uri)
      }

      let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
      assert.equal(result.join(','), expected.join(','))
    })
  })
})