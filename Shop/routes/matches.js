import express from 'express'
import{getMatches,getMatch,addMatches,updateMatch, updateMatchTickets} from "../controller/matches.js"

const router = express.Router();

router.get('/',getMatches)
router.get('/:MatchNumber',getMatch)
router.post('/',addMatches)
router.put('/:MatchNumber',updateMatch)
router.put('/',updateMatchTickets)
/*
patch for each update (scores,teams,location,tickets)
 */
export default router;