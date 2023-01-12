const express = require ('express')
const {getReservations, getAllReservations, buyTicket,getReservationEmail,getReservationSSID} =require( "../controller/Reservation.js")

const router = express.Router();

router.get('/',getAllReservations)
router.get('/email/:email', getReservationEmail);
router.get('/ssid/:ssid', getReservationSSID);
router.get('/:MatchNumber',getReservations)
router.post('/',buyTicket);

module.exports = router;