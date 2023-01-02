const axios = require('axios');

const processPendingTicket = async (message) => {
  console.log('[processPendingTicket]',message)
 //await axios.patch("http://localhost:4000/api/matches/",{"MatchNumber":matchNumber,"category":tickets.category,"quantity":tickets.quantity,"action":action})
 //commented out because people keep sending messages
 //local host will change to vercel after deployment
  return Promise.resolve('[processPendingTicket]')
};

const processReservedTicket = async (message) => {
 //await axios.patch("http://localhost:4000/api/matches/",{"MatchNumber":matchNumber,"category":tickets.category,"quantity":tickets.quantity,"action":action})
 // commented out because people keep sending messages
 //local host will change to vercel after deployment
  console.log('[processReservedTicket]', message)
  return Promise.resolve('[processReservedTicket]')
};
const processCancelledTicket = async (message) => {
  //await axios.patch("http://localhost:4000/api/matches/",{"MatchNumber":matchNumber,"category":tickets.category,"quantity":tickets.quantity,"action":action})
  // commented out because people keep sending messages
  //local host will change to vercel after deployment
   console.log('[processCancelledTicket]', message)
   return Promise.resolve('[processCancelledTicket]')
 };
 
 const processSendMessage = async (message)=>{
  await axios.post("http://localhost:4002/Analytics", {"matchNumber": message.body.matchNumber, "category": message.body.tickets.category,
   "price": message.body.tickets.price, "state": message.meta.action, "quantity": message.body.tickets.quantity})

  console.log([processSendMessage], message);
  return Promise.resolve('[processSendMessage]')
 }


 const processMasterlist = async (message) => {
  console.log('[processMasterlist]', message)
  return Promise.resolve('[processMasterlist]')
};


module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
  processMasterlist
};
