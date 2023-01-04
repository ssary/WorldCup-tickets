import express from 'express'
import{getMatches,getMatch,addMatches,updateMatch, UpdateMatchTickets} from "../controller/matches.js"

const router = express.Router();

router.get('/',getMatches)
router.get('/:matchNumber',getMatch)
router.post('/',addMatches)
router.put('/update/:matchNumber',updateMatch)
router.patch('/',UpdateMatchTickets)
export default router;