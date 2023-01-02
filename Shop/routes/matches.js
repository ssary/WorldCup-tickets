import express from 'express'
import{getMatches,getMatch,addMatches,updateMatch, UpdateMatchTickets} from "../controller/matches.js"

const router = express.Router();

router.get('/',getMatches)
router.get('/:MatchNumber',getMatch)
router.post('/',addMatches)
router.put('/update/:MatchNumber',updateMatch)
router.patch('/',UpdateMatchTickets)
export default router;