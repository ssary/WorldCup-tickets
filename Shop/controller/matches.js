import axios from "axios";
import Matches from "../Models/Matches.js";

export const getMatches = async (req, res) => {
    try {
        const records = await Matches.find();
        res.status(200).json(records);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}
export const getMatch = async (req, res) => {

    try {
        const MatchNumber = req.params.MatchNumber
        const Match = await Matches.findOne({ MatchNumber: MatchNumber })
        res.status(200).json(Match)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}
export const addMatches = async (req, res) => {
    const many = req.body.many;
    if (many) {

        try {
            const List = req.body.matches;
            List.map(async function (item) {
                console.log(item)
                const newMatch = new Matches(item);
                await newMatch.save();
            })

            res.status(200).json(List);
        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }
    }


}
export const updateMatch = async (req, res) => {
    const MatchNumber = req.params.MatchNumber
    try {
        const updatedMatch = await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, {
            $set: req.body,
        },{new:true});

        res.status(200).json(updatedMatch)
    } catch (err) {
        res.status(400).json(err)
    }


}
export const updateMatchTickets = async (req, res) => {

    var { buy, MatchNumber } = req.body
    const increment = (buy ? -1 : 1)
    try {
        var updatedMatch = await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, {
            $inc: {
                Tickets: increment
            }
        },{new:true});
        if(updatedMatch.Tickets > updatedMatch.StadiumCapacity){
            await Matches.findOneAndUpdate({ MatchNumber: updatedMatch.MatchNumber},{Tickets:updatedMatch.StadiumCapacity})
            throw new Error("Maximum number of tickets reached");
        }
        res.status(200).json(updatedMatch);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }

}
