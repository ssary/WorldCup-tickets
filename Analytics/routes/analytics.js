const express = require ('express')
const {postMessage} = require('../controller/analytics.js')

const router = express.Router();

router.post('/', postMessage);

module.exports = router;