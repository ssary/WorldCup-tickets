const axios = require('axios');

const processPendingTicket = async (message) => {
  console.log('[processPendingTicket]',message)
 await axios.patch("https://world-cup-shop-microservice.vercel.app/api/matches",{"matchNumber":message.body.matchNumber,"category":message.body.tickets.category,"quantity":message.body.tickets.quantity,"action":message.meta.action});
 //commented out because people keep sending messages
 //local host will change to vercel after deployment
  return Promise.resolve('[processPendingTicket]')
};

const processReservedTicket = async (message) => {
  await axios.patch("https://world-cup-shop-microservice.vercel.app/api/matches",{"matchNumber":message.body.matchNumber,"category":message.body.tickets.category,"quantity":message.body.tickets.quantity,"action":message.meta.action});
 // commented out because people keep sending messages
 //local host will change to vercel after deployment
  console.log('[processReservedTicket]', message)
  return Promise.resolve('[processReservedTicket]')
};
const processCancelledTicket = async (message) => {
  await axios.patch("https://world-cup-shop-microservice.vercel.app/api/matches",{"matchNumber":message.body.matchNumber,"category":message.body.tickets.category,"quantity":message.body.tickets.quantity,"action":message.meta.action});
  // commented out because people keep sending messages
  //local host will change to vercel after deployment
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
