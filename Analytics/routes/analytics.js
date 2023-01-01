const express = require ('express')
const {postMessage, countEachCategory, countMatchesTickets, statePercentage} = require('../controller/analytics.js')

const router = express.Router();

router.post('/', postMessage);
router.get('/countCategories', countEachCategory)
router.get('/countMatches', countMatchesTickets)
router.get('/percentage', statePercentage)

module.exports = router;