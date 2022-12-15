import axios from "axios";
import {Tickets, Buyer} from '../model/ticket.js'
export const getAllTickets = async (req, res) => {
    try {
        const records = await Tickets.find();
        res.status(200).json(records);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export const getTicketWithDegree = async (req, res) =>{
    if(!req.params.MatchNumber){
        return res.status(400).json({message: 'Enter a MatchNumber please!'})
    }
    if(!req.params.Degree){
        return res.status(400).json({message: 'Enter the desired degree (1, 2, 3) please!'})
    }
    try{
        const {MatchNumber, Degree} = req.params
        const ticket = Tickets.findOne({'MatchNumber': MatchNumber, 'Category': Degree, 'status':'AVAILABLE'})
        res.status(200).json(ticket)
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
}

export const buyTicketWithDegree = async (req, res)=>{
    if(!req.params.MatchNumber){
        return res.status(400).json({message: 'Enter a MatchNumber please!'})
    }
    if(!req.params.degree){
        return res.status(400).json({message: 'Enter the desired degree (0,1,2) please!'})
    }
    
    try{
        const ticket = getTicketWithDegree(req, res)
        req.body.SerialNumber = ticket.serialNumber
        assignTicket(req, res);
        res.status(200).json({
            message: 'Bought successfully',
            ticket: ticket
        })
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
    
}

export const ExpireTicket = async (req, res) => {
    let {SerialNumber} = req.params;
    if(!SerialNumber)
        return res.status(400).json({message: 'Enter a serialNumber'})
    
    try {
        const ticket = await Tickets.findOneAndUpdate({ SerialNumber: SerialNumber }, { status: "EXPIRED" }, {new: true});
        res.status(200).json(ticket);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export const assignTicket = async (req, res) => {
    const {SerialNumber} = req.params
    const {name ,email , phone} = req.body;
    if(!SerialNumber){
        return res.status(400).json({message: 'Enter a serialNumber'})}
    if(!name){
        return res.status(400).json({message: 'Enter a name'});}
    if(!email){
        return res.status(400).json({message: 'Enter an email'});}
    if(!phone){
        return res.status(400).json({message: 'Enter a phone'});}
    
    
    try {
        const buyer = new Buyer();
        buyer.Email = email
        buyer.Name = name
        buyer.Phone = phone
        await buyer.save()

        await Tickets.findOneAndUpdate({ SerialNumber: SerialNumber }, { status: "RESERVED" }, {buyer: buyer});
        // decrease match tickets available
        await axios.patch('http://localhost:5001/api/matches/', {
            'buy': true,
            'MatchNumber': req.body.MatchNumber
    })
        res.status(200).json({message: 'assigned successfully'});
    }
    catch (e) {
        res.status(400).json({ message: e.message });

    }
}

export const returnTicket = async (req, res) => {
    let { SerialNumber} = req.params;
    // increase match tickets available
    await axios.patch('http://localhost:5001/api/matches/', {
            'buy': false,
            'MatchNumber': req.body.MatchNumber
    })
    try {
        await Tickets.findOneAndUpdate({ SerialNumber: SerialNumber }, { status: "AVAILABLE" }, {buyer: null});
        res.status(200);
    }
    catch (e) {
        res.status(400).json({ message: e.message });

    }
}
