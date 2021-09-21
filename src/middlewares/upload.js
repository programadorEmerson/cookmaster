const path = require('path');
const multer = require('multer');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'uploads');

const memoryStorage = multer.memoryStorage();
const originalNameStorage = multer.diskStorage({
  destination: UPLOADS_FOLDER,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ dest: UPLOADS_FOLDER });
const memoryUpload = multer({ storage: memoryStorage });
const originalNameUpload = multer({ storage: originalNameStorage });

module.exports = {
  upload,
  memoryUpload,
  originalNameUpload,
};