const axios = require('axios');

const processSendMessage = async (message)=>{
  await axios.post("https://world-cup-analytics-microservice.vercel.app/Analytics", {"matchNumber": message.body.matchNumber, "category": message.body.tickets.category,
   "price": message.body.tickets.price, "state": message.meta.action, "quantity": message.body.tickets.quantity})

  console.log([processSendMessage], message);
  //return Promise.resolve('[processSendMessage]')
 }

const processPendingTicket = async (message) => {
  await axios.patch("https://world-cup-shop-microservice.vercel.app/api/matches",{"matchNumber":message.body.matchNumber,"category":message.body.tickets.category,"quantity":message.body.tickets.quantity,"action":message.meta.action});
  console.log('[processPendingTicket]',message)
  await processSendMessage(message)
  return Promise.resolve('[processPendingTicket]')
};

const processReservedTicket = async (message) => {
  await axios.patch("https://world-cup-shop-microservice.vercel.app/api/matches",{"matchNumber":message.body.matchNumber,"category":message.body.tickets.category,"quantity":message.body.tickets.quantity,"action":message.meta.action});
  await processSendMessage(message)
  console.log('[processReservedTicket]', message)
  return Promise.resolve('[processReservedTicket]')
};
const processCancelledTicket = async (message) => {
  await axios.patch("https://world-cup-shop-microservice.vercel.app/api/matches",{"matchNumber":message.body.matchNumber,"category":message.body.tickets.category,"quantity":message.body.tickets.quantity,"action":message.meta.action});
  await processSendMessage(message)
   console.log('[processCancelledTicket]', message)
   return Promise.resolve('[processCancelledTicket]')
 };

 const processMasterlist = async (message) => {

   await axios.post("https://world-cup-shop-microservice.vercel.app/api/matches/",{"matchNumber":message.matchNumber ,
    "roundNumber": message.roundNumber,
    "location": message.location,
    "dateUtc":message.dateUtc,
    "availability": message.availability,
    "homeTeam": message.homeTeam,
    "awayTeam": message.awayTeam
})
  console.log('[processMasterlist]', message)
  return Promise.resolve('[processMasterlist]')
};


module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
  processMasterlist
};
