const messageModel = require('../model/message.js');

exports.postMessage = async (req, res) =>{
    const {matchNumber, category, price, state, quantity} = req.body
    try {
        const newMessage = new messageModel({'category':category, 'state': state, 'price': price,
        'MatchNumber': matchNumber, 'quantity': quantity})

        newMessage.save()
        res.status(201).send('Kafka message stored')
    } catch (error) {
        res.status(400).send('Kafka message is not saved')
    }
}

exports.countEachCategory = async (req,res)=>{
    try {
        const messages = await messageModel.find({state: 'TICKET_RESERVED'})
        let category1 = 0, category2=0, category3=0
        messages.map((message)=>{
            if(message.category === 1){
                category1 += message.quantity
            }
            else if(message.category === 2){
                category2 += message.quantity
            }
            else{
                category3 += message.quantity
            }
        })
        res.status(200).send({'category1': category1, 'category2': category2, 'category3': category3})
    } catch (error) {
        res.send(error)
    }
}

exports.countMatchesTickets = async (req,res)=>{
    try {
        let matchFreq = new Array(65).fill(0)
        //let roundFreq = newArray(8).fill(0)
        
        const matches = await messageModel.find({state: 'TICKET_RESERVED'})
        matches.map((match)=>{
            const matchNumber = match.MatchNumber
            //const round = match.round
            matchFreq[matchNumber] += match.quantity
        })
        let matchReservedTickets = []
        for(let i=0;i<65;i++){
            matchReservedTickets.push([i, matchFreq[i]])
        }
        matchReservedTickets.sort((a,b)=>{return b[1] - a[1]});
        res.status(200).send(matchReservedTickets)
    } catch (error) {
        res.send(error)
    }
}


exports.statePercentage = async (req, res)=>{
    try {
        const messages = await messageModel.find()
        let countReserved=0, countCancelled=0, countPending=0
        messages.map((message)=>{
            if(message.state === 'TICKET_RESERVED'){
                countReserved += message.quantity
            }
            else if(message.state === 'TICKET_PENDING'){
                countPending += message.quantity
            }
            else{
                countCancelled += message.quantity
            }
        })
        res.status(200).send({'countReserved': countReserved, 'countPending': countPending, 'countCancelled': countCancelled}) 
    } catch (error) {
        res.send(error.message)
    }
}
