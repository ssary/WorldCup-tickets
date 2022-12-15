import mongoose from 'mongoose';
const { Schema } = mongoose;

const BuyerSchema = new Schema({
    Name: String,
    Email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        sparse: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    Phone: {
        type: String,
        index: true,
        unique: true,
        sparse: true,
        required: 'Phone is required',
        match: [/^01[0125][0-9]{8}$/gm, 'fill a valid phone number'
        ]
    }
});

const ticketSchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    Category: {
        type: Number,
        min: [1, 'must be greater than or equal 1, got {VALUE}'],
        max: [3, 'must be less than or equal 3, got {VALUE}']
    },
    price: Number,
    status: {
        type: String,
        enum:{
            values: ["AVAILABLE",
            "EXPIRED",
            "RESERVED"],
            message: '{VALUE} is not supported'
        },
        default: 'AVAILABLE',
        
    },
    buyer: {BuyerSchema},
    MatchNumber: Number
});
export const Tickets = mongoose.model('Tickets', ticketSchema);
export const Buyer = mongoose.model('Buyer',BuyerSchema);
