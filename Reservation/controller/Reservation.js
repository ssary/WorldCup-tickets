const axios = require("axios");
const Reservation = require("../model/ticket.js");
const { v4 } = require('uuid');
const { sendKafkaMessage } = require('../connectors/kafka');
const { validateTicketReservationDto } = require('../validation/reservation');
const messagesType = require('../constants/messages');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllReservations = async (req, res) => {
    try {
        const records = await Reservation.find();
        res.status(200).json(records);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}
const getReservations = async (req, res) => {

    try {
        const MatchNumber = req.params.MatchNumber
        const Match = await Reservation.find({ MatchNumber: MatchNumber })
        res.status(200).json(Match)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}
const getReservationSSID = async (req,res)=>{
    try {
        const {ssid} = req.params
        const reservation = await Reservation.findOne({ serialNumber: ssid })
        res.status(200).json(reservation)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }


}
const getReservationEmail = async (req,res)=>{
    try {
        const {email} = req.params
        const reservation = await Reservation.findOne({ "Buyer.Email" : email })
        res.status(200).json(reservation)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }


}

const buyTicket = async (req, res) => {
    try {
        var reservation = req.body.reservation
        // validate payload before proceeding with reservations
        console.log(reservation)
        const validationError = validateTicketReservationDto(reservation);
        if (validationError) {
            return res.status(403).send(validationError.message);

        }
        // Send message indicating ticket is pending checkout
        // so shop consumers can process message and call
        // sp-shop-api to decrement available ticket count
        await sendKafkaMessage(messagesType.TICKET_PENDING, {
            meta: { action: messagesType.TICKET_PENDING },
            body: {
                matchNumber: reservation.matchNumber,
                tickets: reservation.tickets,
            }
        });
        console.log("pending sent")
        // Perform Stripe Payment Flow


        try {
            const token = await stripe.tokens.create({
                card: {
                    number: reservation.card.number,
                    exp_month: reservation.card.expirationMonth,
                    exp_year: reservation.card.expirationYear,
                    cvc: reservation.card.cvc,
                },
            });
            await stripe.charges.create({
                amount: reservation.tickets.quantity * reservation.tickets.price * 100,
                currency: 'usd',
                source: token.id,
                description: 'FIFA World Cup Ticket Reservation',
            });
            await sendKafkaMessage(messagesType.TICKET_RESERVED, {
                meta: { action: messagesType.TICKET_RESERVED },
                body: {
                    matchNumber: reservation.matchNumber,
                    tickets: reservation.tickets,
                }
            });
            console.log("reservation sent")
        } catch (stripeError) {
            // Send cancellation message indicating ticket sale failed
            await sendKafkaMessage(messagesType.TICKET_CANCELLED, {
                meta: { action: messagesType.TICKET_CANCELLED },
                body: {

                    matchNumber: reservation.matchNumber,
                    tickets: reservation.tickets,
                }
            });
            console.log("payment failed, ticket cancelled")
            return res.status(400).send(`could not process payment: ${stripeError.message}`);
        }
        var matchNumber = reservation.matchNumber
        var email = reservation.email
        var info = await axios.get("http://ip-api.com/json")
        console.log(info.data)
        var country = info.data.country
        var { quantity, category, price } = reservation.tickets
        var { name, phone } = req.body
        var newTicket = new Reservation({ serialNumber: v4(), quantity: quantity, Category: category, price: price, MatchNumber: matchNumber, Buyer: { Email: email, Name: name, Phone: phone,Country:country } })
        newTicket.save()



        // Return success response to client
        return res.json({
            message: 'Ticket Purchase Successful',
            ...newTicket,
        });


    }
    catch (e) {
        return res.status(400).send(e.message);
    }
}


module.exports = { getReservations, getAllReservations, buyTicket ,getReservationEmail,getReservationSSID};