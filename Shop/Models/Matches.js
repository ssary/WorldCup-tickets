import mongoose from 'mongoose';
const { Schema } = mongoose;


const matchSchema = new Schema({
  MatchNumber: {
    type: Number
    , required: true,
    unique: true
  },
  RoundNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  DateUtc: {
    type: Date,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  HomeTeam: {
    type: String,
  },
  AwayTeam: {
    type: String
  },
  HomeTeamScore: {
    type: Number,
    min: 0,
    default: 0
  },
  AwayTeamScore: {
    type: Number,
    min: 0,
    default: 0
  },
  availability: {
    category1: {
      count: { type: Number },
      price: { type: Number, default: 75 }
    },
    category2: {
      count: { type: Number },
      price: { type: Number, default: 125 }
    }, category3: {
      count: { type: Number },
      price: { type: Number, default: 195 }
    }

  }
}

);
const Matches = mongoose.model('Matches', matchSchema, 'Shop');
export default Matches;