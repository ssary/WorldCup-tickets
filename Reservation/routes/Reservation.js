const express = require ('express')
const {UpdateTicket, getReservations, getAllReservations, buyTicket, getReservationWithDegree,getReservationEmail,getReservationSSID} =require( "../controller/Reservation.js")

const router = express.Router();

router.get('/',getAllReservations)
router.get('/email/:email', getReservationEmail);
router.get('/ssid/:ssid', getReservationSSID);
router.get('/:MatchNumber',getReservations)
router.post('/',buyTicket);

module.exports = router;
/*
reservation: get(/ticekts/${matchNumber})
         get((/ticekts/${TicketID})
         get(tickets)
         patch(/ticekts) : request body will contain ticket ID and status and buyer 
         post(/tickets) */