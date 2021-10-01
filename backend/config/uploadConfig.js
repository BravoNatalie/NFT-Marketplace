const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imgs/')
  },
  filename: (request, file, callback) => {
    const fileExtension = file.originalname.split('.')[1];

    const newNameFile = require('crypto').randomBytes(16).toString('hex');

    callback(null, `${newNameFile}.${fileExtension}`)
  }
});

const upload = multer({ storage });
module.exports = upload;
