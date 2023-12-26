const imageController = require('./image.controller');
const router = require("express").Router();
router.get('/crawl-images',imageController.crawlImages);
module.exports = router;