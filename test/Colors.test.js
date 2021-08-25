const { assert } = require('chai')

//const ColorMarketplace = artifacts.require('./ColorMarketplace')
const Color = artifacts.require('./Color')


require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts) => {
  let token
  let market

  beforeEach( async () => {
    token = await Color.deployed()
    //market = await ColorMarketplace.new(token.address)
    //await token.setMarketplace(market.address)
  })

  describe('deployment', async () => {
      it('deploys successfully', async () => {
        const address = token.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
        const name = await token.name()
        assert.equal(name, 'Color')
      })

      it('has a symbol', async () => {
        const symbol = await token.symbol()
        assert.equal(symbol, 'COLORS')
      })
  })

  // describe('minting', async () => {

  //   it('creates a new token', async () => {
  //     const result = await token.mint('#EC058E')

  //     const event = result.logs[0].args
  //     const tokenId = event.tokenId.toNumber()
  //     const totalSupply = await token.totalSupply()
  //     const item = await token.Items(tokenId)
  //     const owner = await token.ownerOf(tokenId)
  //     const approvedAddress = await token.getApproved(tokenId)

  //     //success
  //     assert.equal(tokenId, totalSupply, 'id is correct')
  //     assert.equal(item.color, '#EC058E', 'color is correct')
  //     assert.equal(item.creator, owner, 'creator is correct')
  //     assert.equal(approvedAddress, market.address, 'approved address is correct')
  //     assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
  //     assert.equal(event.to, accounts[0], 'to is correct')

  //     //failure: cannot mint the same token
  //     await token.mint('#EC058E').should.be.rejected
  //   })
  // })

  // describe('indexing', async () => {
  //   it('lists colors', async () => {
  //     //mint 3 more tokens
  //     await token.mint('#5386E4')
  //     await token.mint('#FFFFFF')
  //     await token.mint('#000000')

  //     const totalSupply = await token.totalSupply()
  //     let item
  //     let result = []

  //     for (var i=1; i <= totalSupply; i++){
  //       item = await token.Items(i)
  //       result.push(item.color)
  //     }

  //     let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
  //     assert.equal(result.join(','), expected.join(','))
  //   })
  // })

  // describe('selling', async () => {

  //   it('put for sale', async () => {
  //     const token = await contract.mint('#810034')
  //     const tokenId = token.logs[0].args.tokenId.toNumber()
  //     let price = 20
  //     await contract.allowBuy(tokenId, price)
  //     let priceToken = await contract.tokenIdToPrice(tokenId)

  //     assert.equal(priceToken.toNumber(), price, 'price is correct')
  //   })

  //   it('remove from sale', async () => {
  //     const lastTokenId = await contract.totalSupply()
  //     await contract.disallowBuy(lastTokenId)
  //     let priceToken = await contract.tokenIdToPrice(lastTokenId)

  //     assert.equal(priceToken.toNumber(), 0, 'price is correct')
  //   })

  //   it('buy', async () => {

  //   })
  // })
})