
import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, names, adjectives } from 'unique-names-generator'
import {Tickets, Buyer} from "../model/ticket.js";
import e from 'express';
async function generateEgyptianNumber(){
    const prefixes = ['010', '011', '015', '012']
    const prefixidx = Math.floor(Math.random()*4)
    let prefix = prefixes[prefixidx]
    
    let i =0
    while(i < 8){
        const number = Math.floor(Math.random()*10).toString()
        prefix = prefix.concat(number)
        i++
    }
    return prefix;
}

const generateDummyTickets =  async function(){
const NUMBER_OF_TICKETS = 10
let i = 0
const stateArray = ['AVAILABLE', 'EXPIRED', 'RESERVED']
while(i < NUMBER_OF_TICKETS){
    const serialNumber = uuidv4()
    const category = Math.floor(Math.random()*3) + 1
    const idxState = Math.floor(Math.random()*3)
    const state = stateArray[idxState]
    const matchNumber = Math.floor(Math.random()*48) + 1

    let ticket = new Tickets()
    ticket.serialNumber = serialNumber
    ticket.Category = category
    ticket.MatchNumber = matchNumber
    ticket.status = state
    ticket.price = 100
    try{
        if(state === 'RESERVED'){
            let buyer = new Buyer();
            buyer.Name = uniqueNamesGenerator({
                dictionaries: [adjectives ,names]})
            const email = buyer.Name.concat('@gmail.com')
            buyer.Email = email
            const phone = await generateEgyptianNumber()
            buyer.Phone = phone
            await buyer.save()
            ticket.buyer = buyer
        }
        
        await ticket.save()
        i++;
    }
    catch(err){
        console.log(err);
    }
}
}

export default generateDummyTickets