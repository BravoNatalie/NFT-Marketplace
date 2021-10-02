<h1 align=center>
<img src="https://res.cloudinary.com/nataliebravo/image/upload/v1630406853/NFT/banner_npzzzz.png" />
</h1>

<div align="center">
  
![License](https://img.shields.io/badge/license-MIT-737CA1?style=flat-square) 
![Node_Badge](https://img.shields.io/badge/node-14.16.1-green?style=flat-square)
![Npm_Badge](https://img.shields.io/badge/npm-6.14.12-yellow?style=flat-square)
![React Badge](https://img.shields.io/badge/React-17.0.2-45b8d8?style=flat-square)
![Solidity_Badge](https://img.shields.io/badge/Solidity-%5E8.0.0-363636?style=flat-square)
![Truffle](https://img.shields.io/badge/Truffle-5.3.14-F0E8E0?style=flat-square)
[![Made by NatalieBravo](https://img.shields.io/badge/made%20by-NatalieBravo-blueviolet?style=flat-square)](https://www.linkedin.com/in/nataliebravo/)
</div>

# Summary

- [About](#about)
- [Preview](#preview)
- [Architecture and Client-side Flow](#architecture)
- [Built with](#technologies)
- [How to Use](#how-to-use)
- [TODO](#todo)
- [License](#license)

<a id='about'/>

## :information_source: About

Galerie is a NFT Marketplace that enables the creation, sale, and purchase of digital art as NFTs.


<a id='preview'/>

## :framed_picture: Preview

Check out how it looks:

<p align="center">
 <img alt="Homepage print"   src="https://res.cloudinary.com/nataliebravo/image/upload/v1630412771/NFT/galerie-homepage_kznhvx.png" >
<p />

<a id='architecture' />

## :information_source: Architecture and Client-side Flow

<p align="center">
  <img alt="Client-Flow"src="https://res.cloudinary.com/nataliebravo/image/upload/v1626701427/NFT/client-side-flow_iqhq9a.png">
<p />

<p align="center">
  <img alt="Architecture"src="https://res.cloudinary.com/nataliebravo/image/upload/v1626701440/NFT/arquitechure_hunzuw.png">
<p />


<a id='technologies'/>

## :gear: Built With

This project was developed with the following technologies:

#### **Frontend** <sub><sup>React + JavaScript</sup></sub>
  - [React](https://pt-br.reactjs.org/)
  - [Axios](https://github.com/axios/axios)
  - [Redux](https://redux.js.org/)
  - [Web3.js](https://web3js.readthedocs.io/en/v1.3.4/)
  - [Material UI](https://material-ui.com/pt/)

#### **Backend** <sub><sup>Express</sup></sub>
  - [Express](https://expressjs.com/pt-br/)
 
#### **Blockchain and Smart Contracts** <sub><sup>Solidity</sup></sub>
  - [Solidity](https://docs.soliditylang.org/)
  - [Truffle](https://www.trufflesuite.com/)
  - [Ganache](https://www.trufflesuite.com/ganache)


<a id='how-to-use'/>

## :joystick: How to Use

### Requirements

To run the application you'll need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
* [Truffle](https://www.trufflesuite.com/)
* [Ganache](https://www.trufflesuite.com/ganache)
* Clone the repository:
  * ```$ git clone https://github.com/BravoNatalie/NFT-Marketplace.git ```


Now go to project folder and run:


```bash
$ cd NFT-Marketplace

# install the dependencies
$ yarn

# run ganache
$ ganache-cli

# deploy de contracts on the blockchain
$ truffle migrate

# run the client-side
$ cd client
$ yarn
$ yarn start

# run the backend
$ cd backend
$ yarn
$ yarn start
```

<a id='todo'/>

## :page_with_curl: TODO

There are some things to be done in the project:
  - State persistence;
  - Revise front-end call to the buy and sell functions on the blockchain;
  - Error handling;
  - NFT cards to reflect the true information of price coming from the blockchain.

<a id='license'/>

## :page_with_curl: License

This project is under the **MIT license**. See the [LICENSE](https://github.com/BravoNatalie/NFT-Marketplace/blob/master/LICENSE) for more information.


## :mailbox_with_mail: Get in touch!

<p align="center">
<a href="https://www.linkedin.com/in/nataliebravo/" target="_blank" >
  <img alt="Linkedin - Natalie Bravo" src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin">
</a>
<a href="mailto:natalie.bravo@ice.ufjf.br" target="_blank" >
  <img alt="Email - Natalie Bravo" src="https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail">
</a> 
<br/>
  Made with :coffee: and ❤️ by <b>Natalie Bravo</b>.
<p/>
