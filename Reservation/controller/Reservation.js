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
const getReservationWithDegree = async (req, res) => {
    if (!req.params.MatchNumber) {
        return res.status(400).json({ message: 'Enter a MatchNumber please!' })
    }
    if (!req.params.Degree) {
        return res.status(400).json({ message: 'Enter the desired degree (1, 2, 3) please!' })
    }
    try {
        const { MatchNumber, Category } = req.params
        const ticket = Reservation.findOne({ 'MatchNumber': MatchNumber, 'Category': Category })
        res.status(200).json(ticket)
    }
    catch (e) {
        res.status(404).json({ message: e.message })
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
const UpdateTicket = async (req, res) => {
    let { serialNumber} = req.body;

    try {
        var update= await Reservation.findOneAndUpdate({ serialNumber: serialNumber }, {$set: req.body },{new:true});
        res.status(200).json(update)
    }
    catch (e) {
        res.status(400).json({ message: e.message });

    }
}
const DeleteTicket = async (req, res) => {
    let { serialNumber} = req.body;

    try {
       var reservation= await Reservation.findOneAndDelete({ serialNumber: serialNumber });
        res.status(200).json(reservation);
    }
    catch (e) {
        res.status(400).json({ message: e.message });

    }
}
const buyTicket = async (req, res) => {
    try {
        // validate payload before proceeding with reservations
        console.log(req.body.reservation)
        const validationError = validateTicketReservationDto(req.body.reservation);
        if (validationError) {
            return res.status(403).send(validationError.message);

        }
        // Send message indicating ticket is pending checkout
        // so shop consumers can process message and call
        // sp-shop-api to decrement available ticket count
        await sendKafkaMessage(messagesType.TICKET_PENDING, {
            meta: { action: messagesType.TICKET_PENDING },
            body: {
                matchNumber: req.body.reservation.matchNumber,
                tickets: req.body.reservation.tickets,
            }
        });
        console.log("pending sent")
        // Perform Stripe Payment Flow
        /*
      try {
        const token = await stripe.tokens.create({
          card: {
            number: req.body.card.number,
            exp_month: req.body.card.expirationMonth,
            exp_year: req.body.card.expirationYear,
            cvc: req.body.card.cvc,
          },
        });
        await stripe.charges.create({
          amount: req.body.tickets.quantity * req.body.tickets.price,
          currency: 'usd',
          source: token.id,
          description: 'FIFA World Cup Ticket Reservation',
        });
        await sendKafkaMessage(messagesType.TICKET_RESERVED, {
          meta: { action: messagesType.TICKET_RESERVED},
          body: { 
            matchNumber: req.body.matchNumber,
            tickets: req.body.tickets,
          }
        });
      } catch (stripeError) {
        // Send cancellation message indicating ticket sale failed
        await sendKafkaMessage(messagesType.TICKET_CANCELLED, {
          meta: { action: messagesType.TICKET_CANCELLED},
          body: { 
            matchNumber: req.body.matchNumber,
            tickets: req.body.tickets,
          }
        });
        return res.status(400).send(`could not process payment: ${stripeError.message}`);
      }
           */
        // TODO: Update master list to reflect reserved ticket sale
        
        var matchNumber = req.body.reservation.matchNumber
        var email = req.body.reservation.email
        var [{ quantity, category, price }] = req.body.reservation.tickets
        var { name, phone } = req.body
        var newTicket = new Reservation({ serialNumber: v4(), quantity: quantity, Category: category, price: price, MatchNumber: matchNumber, Buyer: { Email: email, Name: name, Phone: phone } })
        newTicket.save()


        // Send message indicating ticket sale is final
        await sendKafkaMessage(messagesType.TICKET_RESERVED, {
            meta: { action: messagesType.TICKET_RESERVED },
            body: {
                matchNumber: matchNumber,
                tickets: req.body.reservation.tickets,
            }
        });
        console.log("reservation sent")

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

  
module.exports = { UpdateTicket, getReservations, getAllReservations, buyTicket, getReservationWithDegree };