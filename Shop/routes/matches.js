import express from 'express'
import{getMatches,getMatch,addMatches,updateMatch, ReserveMatchTickets,HoldMatchTickets, UpdateMatchTickets} from "../controller/matches.js"

const router = express.Router();

router.get('/',getMatches)
router.get('/:MatchNumber',getMatch)
router.post('/',addMatches)
router.put('/update/:MatchNumber',updateMatch)
router.put('/Reserve',ReserveMatchTickets)
router.put('/Pending',HoldMatchTickets)
router.patch('/',UpdateMatchTickets)
export default router;