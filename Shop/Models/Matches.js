const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema({
  MatchNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  RoundNumber: {
    type: Number,
    required: true,
  },
  DateUtc: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  StadiumCapacity: {
    type: Number,
    required: true,
  },
  HomeTeam: {
    type: String,
    required: true,
  },
  AwayTeam: {
    type: String,
    required: true,
  },
  Group: {
    type: String,
    required: true,
  },
  HomeTeamScore: {
    type: Number,
    default: null,
  },
  AwayTeamScore: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("Matches", MatchesSchema);
