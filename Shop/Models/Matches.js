import mongoose from 'mongoose';
const { Schema } = mongoose;


const matchSchema = new Schema({
      MatchNumber: {type: Number
        ,required: true,
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
      StadiumCapacity: {
        type: Number,
        required: true,
        min: 0
      },
      HomeTeam: {
        type: String,
      },
      AwayTeam: {
       type:String
      },
      HomeTeamScore: {
        type: Number,
        min: 0
      },
      AwayTeamScore: {
        type: Number,
        min: 0
      },
      Tickets: {
        type: Number,
        min: 0,
        default : function() { 
          return this.StadiumCapacity;
      }
      }
    }
  );
const Matches = mongoose.model('Matches',matchSchema,'Shop');
export default Matches;