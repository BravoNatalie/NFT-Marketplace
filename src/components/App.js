import React, { Component } from 'react';
import Web3 from 'web3';

import Color from '../abis/Color.json'
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3(this.props.dispatch)
  }

  async loadWeb3(dispatch) {
    window.addEventListener('load', async () => {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
       if (window.ethereum) {
         const web3 = new Web3(window.ethereum)
         try {
           // Request account access if needed
           await window.ethereum.enable()
           // Acccounts now exposed
           await this.loadBlockchainData(web3)
         } catch (error) {
           console.alert("User denied account access. ", error);
         }
       }
       // Legacy dapp browsers...
       else if (window.web3) {
         // Use Mist/MetaMask's provider.
         const web3 = window.web3
         console.log('Injected web3 detected.')
         await this.loadBlockchainData(web3)
       }
       // Non-dapp browsers...
       else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
       }
     });
   }

   async loadBlockchainData(web3){
    const accounts = await web3.eth.getAccounts()

    if(typeof accounts[0] === "undefined"){
      window.alert("Please login with Metamask!")
    } else{
      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({account: accounts[0], balance, web3})
    }

    const networkID = await web3.eth.net.getId()
    try{
      const abi = Color.abi
      const networkData = Color.networks[networkID]
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      const totalSupply = await contract.methods.totalSupply().call()

      this.setState({contract, totalSupply})
      
      for (var tokenId=1; tokenId <= totalSupply; tokenId++){
        console.log(tokenId)
        let color = await contract.methods.colors(tokenId-1).call()
        let owner = await contract.methods.ownerOf(tokenId).call()
        let price = await contract.methods.tokenIdToPrice(tokenId-1).call()
        
        this.setState({
          colors: [...this.state.colors, {
            hex: color,
            owner,
            price: price.toNumber()
          }]
        })
      }
     
    } catch(e){
      console.log("Error", e)
      window.alert("Contracts not deployed to the current network " + networkID.toString())
    }
  }

  mint = (color) => {
    this.state.contract.methods.mint(color)
      .send({from: this.state.account})
      .once('receipt', (receipt) => {
        this.setState({
          colors: [...this.state.colors, color]
        })
      })
  }

  buy = (id) => {
    //this.state.contract.methods.buy(id).send({from: this.state.account})
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            href="https://github.com/bravonatalie"
            rel="noopener noreferrer"
          >
            Color token
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Color Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const color = this.color.value
                  this.mint(color)
                }}>
                  <input 
                    type="text"
                    className="form-control mb-1"
                    placeholder="e.g. #FFFFFF"
                    ref={(input) => {this.color = input}}
                  />
                  <input 
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="MINT"
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            {this.state.colors.map((color, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: color.hex}}></div>
                  <div>{color.hex}</div>
                  <div>Owner: ...{color.owner.slice(-4)}</div>
                  <div>{color.price} ETH</div>
                  <div><button onClick={() => {} }>Buy</button></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
