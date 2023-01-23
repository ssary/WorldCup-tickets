const express = require ('express')
const {UpdateTicket, getReservations, getAllReservations, buyTicket, getReservationWithDegree,getReservationEmail,getReservationSSID} =require( "../controller/Reservation.js")

const router = express.Router();

router.get('/',getAllReservations)
router.get('/:MatchNumber',getReservations)
//router.get('/:MatchNumber/:Category', getReservationWithDegree);
router.get('/email/:email', getReservationEmail);
router.get('/ssid/:ssid', getReservationSSID);
router.post('/',buyTicket);
router.patch('/',UpdateTicket);


module.exports = router;
