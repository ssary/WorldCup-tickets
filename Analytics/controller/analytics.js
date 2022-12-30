const messageModel = require('../model/message.js')

const postMessage = async (req, res) =>{
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

