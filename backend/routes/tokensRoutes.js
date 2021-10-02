const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const upload = require('../config/uploadConfig');

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
  app.post('/tokens', upload.single('img'), (req, res) => {
    const { filename } = req.file;
    const { tokenId, name, description } = req.body;

    // const tokenId = uuidv4();

    tokens[tokenId] = {
      name,
      description,
      image: req.protocol + '://' + req.get('host') + "/images/" + filename
    };

    fs.writeFileSync(dbFile, JSON.stringify(tokens));

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + tokenId;

    res.status(201).json({ message: fullUrl });
  });
};

module.exports = tokensRoutes;

