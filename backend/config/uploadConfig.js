// Import libraries
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/')
  },
  filename: function (req, file, cb) {
    // Extract file extension
    const fileExtension = file.originalname.split('.')[1];

    // New random name
    const newNameFile = require('crypto')
      .randomBytes(16)
      .toString('hex');

    // Set new name:
    cb(null, `${newNameFile}.${fileExtension}`)
  }
});

const upload = multer({ storage });

module.exports = upload;
