import express from 'express'
import { getAllTickets, getTicketWithDegree,buyTicketWithDegree, ExpireTicket, assignTicket, returnTicket} from '../controller/tickets.js'
const router = express.Router()

router.get('/', getAllTickets);
router.get('/:MatchNumber/:Degree', getTicketWithDegree);
router.get('/buy/:MatchNumber/:Degree', buyTicketWithDegree);
router.patch('Expire/:SerialNumber', ExpireTicket);
router.patch('assign/:SerialNumber', assignTicket);
router.patch('return/:SerialNumber', returnTicket);
export default router