const express = require ('express')
const {postMessage, countEachCategory, countMatchesTickets} = require('../controller/analytics.js')

const router = express.Router();

router.post('/', postMessage);
router.get('/countCategories', countEachCategory)
router.get('/countMatches', countMatchesTickets)

module.exports = router;