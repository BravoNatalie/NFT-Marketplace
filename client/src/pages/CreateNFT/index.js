import React, { useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Web3 from "web3";

import { useStyles } from "./styles.js";

import DropZone from "../../components/DropZone";

import { api } from "../../services/api";




const CreateNFT = () => {
  const classes = useStyles();
  const history = useHistory();

  const account = useSelector((state) => state.allNft.account);
  const artTokenContract = useSelector(
    (state) => state.allNft.artTokenContract
  );

  const [selectedFile, setSelectedFile] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [college,setcollege] = useState("");
  const handleChange = (event) => {
    setcollege(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [flag, setflag] = React.useState(true);
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setflag(true);
    setOpen(false);
  };

  const agree_handleClose = () => {
    setflag(false);
    setOpen(false);
  };
  useEffect(() => {

  }, [setflag]);

  useEffect(() => {

  }, [setcollege]);

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {

    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  function handleInputChange(event) {
    let { name, value } = event.target;
    // if(name === 'image'){
    //   value = event.target.files[0];
    // }
    setFormData({ ...formData, [name]: value });
  }

  async function createNFT(event) {
    event.preventDefault();
    const { title, description,price} = formData;

    console.log("title: " + title);
    const data = new FormData();

    data.append("name", title);
    data.append("description", description);
    data.append("price", price);
    // data.append("author", author);
    // data.append("college", college);

    if(selectedFile){
      data.append('img', selectedFile);
      console.log("slectedFile: ", selectedFile);
    }

    try {
      const totalSupply = await artTokenContract.methods.totalSupply().call();
      data.append("tokenId", Number(totalSupply) + 1);

      const response = await api.post("/tokens", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      console.log("CreateNFT------------response",response);


      await mint(response.data.message);
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
      history.push('/');
    } catch (error) {
      console.error("Error, minting: ", error);
      alert("Error while minting!");
    }
  }

  return (
    <div className={classes.pageCreateNft}>
      <form onSubmit={createNFT}>
        <div className={classes.formHeader}>
          <h1>Create collectible</h1>
          <Link to="/">
            <CancelOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={classes.content}>
          <div className={classes.dropzone}>
            <DropZone onFileUploaded={setSelectedFile} />
          </div>
          <fieldset>
            <TextField
              label="标题"
              name="title"
              variant="filled"
              required
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="描述"
              name="description"
              variant="filled"
              required
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-controlled-open-select-label">所属学院</InputLabel>
              <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={college}
                  onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>工商管理学院</MenuItem>
                <MenuItem value={2}>财务金融学院</MenuItem>
                <MenuItem value={3}>商务经济学院</MenuItem>
                <MenuItem value={4}>酒店管理学院</MenuItem>
                <MenuItem value={5}>商务外语学院</MenuItem>
                <MenuItem value={6}>艺术设计学院</MenuItem>
                <MenuItem value={7}>商务信息学院</MenuItem>
                <MenuItem value={8}>文法学院</MenuItem>
                <MenuItem value={9}>马克思主义学院</MenuItem>
                <MenuItem value={10}>上海洛桑酒店管理学院</MenuItem>
                <MenuItem value={11}>现代流通国家级实验教学示范中心</MenuItem>
                <MenuItem value={12}>国际教育学院、商务部国际商务官员研修基地（上海）</MenuItem>
              </Select>

            </FormControl>
            <TextField
              label="价格"
              name="price"
              variant="filled"
              value={formData.price}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">￥</InputAdornment>,
              }}
              fullWidth
            />
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">平台使用规则</DialogTitle>
                  <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                      {[...new Array(1)]
                          .map(
                              () => `
                              请您仔细阅读以下条款，如果您对本协议的任何条款表示异议，您可以选择不创建NFT。
                              我们深知个人信息对您的重要性，您的信任对我们非常重要，我们将根据法律法规要求并参照行业最佳实践为您的个人信息安全提供充分保障。
                              您使用或继续使用我们的服务，即意味着同意我们按照本《NFT平台服务协议》（以下简称“本协议”）收集、使用、储存和分享您的相关信息。
                              您确认，在您开始注册或使用NFT服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力，
                              如您是自然人，您应当是具备相应民事行为能力的自然人（十六周岁以上的未成年人，以自己的劳动收入为主要生活来源的，
                              视为完全民事行为能力人）、法人或其他组织。若您不具有完全民事行为能力，例如您未满18周岁，
                              则请您在法定监护⼈（以下统称"监护人"）的陪同下阅读和判断是否同意本协议。
                              您点击确认或继续使⽤我们的服务即视为您已经取得监护⼈的必要同意。若您不具备前述主体资格或未取得监护⼈同意，
                              请勿使用我们的服务。
                              用户不得利用NFT平台服务制作、上载、复制、发布、传播或者转载如下内容：
                                  （1） 煽动民族仇恨、民族歧视，破坏民族团结的；
                                  （2） 破坏国家宗教政策，宣扬邪教和封建迷信的；
                                  （3） 散布谣言，扰乱社会秩序，破坏社会稳定的；
                                  （4） 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
                                  （5） 侮辱或者诽谤他人，侵害他人合法权益的；
                                  （6） 含有法律、行政法规禁止的其他内容的信息。`,
                          )
                          .join('\n')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      不同意
                    </Button>
                    <Button onClick={agree_handleClose} color="primary">
                      同意
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button variant="outlined" color="primary" onClick={handleClickOpen('paper')}>版权协议</Button>
                <Button variant="outlined" color="primary" type="submit" disabled={flag}>
                  Submit
                </Button>

            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default CreateNFT;
