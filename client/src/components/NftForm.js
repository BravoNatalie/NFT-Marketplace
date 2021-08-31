import React, { useState } from "react";
import { useSelector } from "react-redux";
import Web3 from 'web3'; //Web3.utils.toWei('1', 'ether');
import css from "../containers/style/layout.css";

import { api } from "../services/api";

const NftForm = () => {
  const account = useSelector((state) => state.allNft.account);
  const artTokenContract = useSelector(
    (state) => state.allNft.artTokenContract
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  function handleInputChange(event) {
    let { name, value } = event.target;
    if(name === 'image'){
      value = event.target.files[0];
    }
    setFormData({ ...formData, [name]: value });
  }

  async function createNFT(event) {
    event.preventDefault();
    const { name, description, image } = formData;

    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("img", image);

    try {
      const totalSupply = await artTokenContract.methods.totalSupply().call();
      data.append("tokenId", Number(totalSupply) + 1);
     
      const response = await api.post("/tokens", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      console.log(response);

      mint(response.data.message)
    } catch (error) {
      console.log(error);
      // error.response.data
    }
  }

  async function mint(tokenMetadataURL) {
    try {
      const receipt = await artTokenContract.methods
        .mint(tokenMetadataURL)
        .send({ from: account });
      console.log(receipt);
      console.log(receipt.events.Transfer.returnValues.tokenId);
      // setItems(items => [...items, {
      //   tokenId: receipt.events.Transfer.returnValues.tokenId,
      //   creator: accounts[0],
      //   owner: accounts[0],
      //   uri: tokenMetadataURL,
      //   isForSale: false,
      //   saleId: null,
      //   price: 0,
      //   isSold: null
      // }]);
    } catch (error) {
      console.error("Error, minting: ", error);
      alert("Error while minting!");
    }
  }

  return (
    <form onSubmit={createNFT}>
      <div className="ui container">
        <div className="ui form">
          <br></br>
          <br></br>
          <h2 className="ui dividing header">Criar colecionável</h2>
          <div className="eight wide field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="ui form">
            <div className="eight wide field">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                name="description"
                placeholder="Descrição"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>

          <div className="ui form">
            <div className="two wide field">
              <label htmlFor="name">Preço</label>
              <input type="text" name="price" placeholder="Preço"></input>
            </div>
          </div>
        </div>

        <div>
          <label className="sendNft">Enviar NFT </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
          <div></div>
          <button className="ui submit button" type="submit">
            Criar
          </button>
        </div>
      </div>
    </form>
  );
};

export default NftForm;
