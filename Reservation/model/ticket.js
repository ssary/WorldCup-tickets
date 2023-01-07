const mongoose = require("mongoose")
var mongooseIntlPhoneNumber = require('mongoose-intl-phone-number');
const { Schema } = mongoose;

const BuyerSchema = new Schema({
    Name: String,
        Email: {
            type: String,
            trim: true,
            lowercase: true,
            index: true,
            sparse: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        Country:{type:String} 
});
BuyerSchema.plugin(mongooseIntlPhoneNumber,{
    hook:'validate',
    phoneNumberField:'Phone',
    nationalFormatField:'nationalFormat',
    internationalFormat:'internationalFormat',
    countryCodeField:'countryCode',
    });


const ticketSchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    Category: {
        type: Number,
        min: 1, max: 3
    },
    price: {
        type: Number
    },
    Buyer: BuyerSchema,
    MatchNumber:{
        type:Number
    },
    quantity:{
        type:Number,
        min:1
        ,max:2
    }

});



ticketSchema.pre('save',function(next){
 switch(this.Category){
    case 1: this.price = 75
    break;
    case 2: this.price = 125
    break;
    case 3: this. price = 195
    break;
 }
 next();
})

const Reservation = mongoose.model('Reservation',ticketSchema,'Reservation');

module.exports = Reservation;

