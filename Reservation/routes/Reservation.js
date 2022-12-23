const express = require ('express')
const {UpdateTicket, getReservations, getAllReservations, buyTicket, getReservationWithDegree} =require( "../controller/Reservation.js")

const router = express.Router();

router.get('/',getAllReservations)
router.get('/:MatchNumber',getReservations)
router.get('/:MatchNumber/:Category', getReservationWithDegree);
router.post('/',buyTicket);
router.patch('/',UpdateTicket);

module.exports = router;
/*
reservation: get(/ticekts/${matchNumber})
         get((/ticekts/${TicketID})
         get(tickets)
         patch(/ticekts) : request body will contain ticket ID and status and buyer 
         post(/tickets) */