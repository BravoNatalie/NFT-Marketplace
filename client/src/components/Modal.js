import React, { useState } from "react";
import { Button, Header, Modal, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { api } from "../services/api";

function Modall() {
  const [open, setOpen] = React.useState(false);

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
    if (name === "image") {
      value = event.target.files[0];
    }
    setFormData({ ...formData, [name]: value });
  }

  async function createNFT(event) {
    event.preventDefault();
    const { name, description, image } = formData;
    console.log("name: " + name);
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

      mint(response.data.message);
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
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Adicionar NFT</Button>}
    >
    {/* <form onSubmit={createNFT}> */}
      <Modal.Header>Adicione um NFT</Modal.Header>
      <Modal.Content image>
        <Image
          size="medium"
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          wrapped
        />
        <Modal.Description>
          <Header>Default Image</Header>
          <p>
            Crie um NFT denominando um nome, uma description, um price e
            carregue seu arquivo
          </p>
          
            <div className="ui container">
              <div className="ui form">
                <div className="eight wide field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    onChange={handleInputChange}
                  ></input>
                </div>

                <div className="ui form">
                  <div className="eight wide field">
                    <input
                      type="text"
                      name="description"
                      placeholder="Descrição"
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>

                {/* <div className="ui form">
                  <div className="two wide field">
                    <label htmlFor="name">Preço</label>
                    <input type="text" name="price" placeholder="Preço"></input>
                  </div>
                </div> */}
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
              </div>
            </div>
         
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          content="Criar"
          labelPosition="right"
          icon="checkmark"
          onClick={(event) => {setOpen(false); createNFT(event);}}
          positive
          type="submit"
        />
      </Modal.Actions>
      {/* </form> */}
    </Modal>
  );
}

export default Modall;
