import express from 'express'
import{getMatches,getMatch,addMatches,updateMatch} from "../controller/matches.js"

const router = express.Router();

router.get('/',getMatches)
router.get('/:MatchNumber',getMatch)
router.post('/',addMatches)
router.patch('/:MatchNumber',updateMatch)
/*
patch for each update (scores,teams,location,tickets)
 */
export default router;