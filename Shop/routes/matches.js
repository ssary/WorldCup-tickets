import express from 'express'
import{getMatches,getMatch,addMatches,updateMatch,UpdateMatchTickets,getRound} from "../controller/matches.js"

const router = express.Router();

router.get('/',getMatches)
router.get('/:matchNumber',getMatch)
router.get('/filterRound/:round',getRound)
router.post('/',addMatches)
router.put('/update/:matchNumber',updateMatch)
router.patch('/',UpdateMatchTickets)
export default router;