const mongoose = require("mongoose")
const { Schema } = mongoose;

const messageSchema = new Schema({
    category: {
        type: Number,
        min: 1, max: 3
    },
    state: {
        type: String,
    },
    price: {
        type: Number
    },
    MatchNumber:{
        type:Number
    },
    quantity:{
        type:Number,
        min:1
        ,max:2
    }
});

// ticketSchema.pre('save',function(next){
//  switch(this.Category){
//     case 1: this.price = 75
//     break;
//     case 2: this.price = 125
//     break;
//     case 3: this. price = 195
//     break;
//  }
//  next();
// })

const message = mongoose.model('Analytics',messageSchema,'Analytics');

module.exports = message;

