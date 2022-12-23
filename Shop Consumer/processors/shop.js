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
 

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket
};
