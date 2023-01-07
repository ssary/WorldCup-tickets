import mongoose from 'mongoose';
const { Schema } = mongoose;


const matchSchema = new Schema({
  matchNumber: {
    type: Number
    , required: true,
    unique: true
  },
  roundNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  dateUtc: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  homeTeam: {
    type: String,
  },
  awayTeam: {
    type: String
  },
  homeTeamScore: {
    type: Number,
    min: 0,
    default: 0
  },
  awayTeamScore: {
    type: Number,
    min: 0,
    default: 0
  },
  availability: {
    category1: {

      available: { type: Number },
      pending: { type: Number, default: 0 },
      price: { type: Number, default: 75 }
    },
    category2: {
      available: { type: Number },
      pending: { type: Number, default: 0 },
      price: { type: Number, default: 125 }
    }, category3: {
      available: { type: Number },
      pending: { type: Number, default: 0 },
      price: { type: Number, default: 195 }
    }

  }
}

);
const Matches = mongoose.model('Matches', matchSchema, 'Matches');
export default Matches;