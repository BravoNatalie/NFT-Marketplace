const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const upload = require('../config/uploadConfig');
const { addToIpfs } = require('../providers/moralis');
const { toolsInstance } = require('../utils/tools');

const tokensRoutes = (app) => {
  // VARIABLES
  const dbFile = path.resolve(__dirname, 'db.json');
  const db = fs.readFileSync(dbFile, 'utf8');
  // const db = require('./db.json');
  const tokens = JSON.parse(db);

  // INDEX
  app.get('/tokens/:tokenID', (req, res) => {
    const { tokenID } = req.params;

    res.status(200).json(tokens[tokenID]);
  });

  // CREATE
  app.post('/tokens', upload.single('img'), async (req, res) => {
    const { filename, path } = req.file;
    const { tokenId, name, description } = req.body;
    
    // const tokenId = uuidv4();

    let fileHash = (await addToIpfs({
      path: `image.${toolsInstance.extractFileType(filename)}`,
      content: fs.readFileSync(`./${path}`, { encoding: 'base64' })
    }))[0].path;

    tokens[tokenId] = {
      name,
      description,
      image: fileHash
    };

    fs.writeFileSync(dbFile, JSON.stringify(tokens));

    var fullUrl = fileHash;

    res.status(201).json({ message: fullUrl });
  });
};

module.exports = tokensRoutes;

