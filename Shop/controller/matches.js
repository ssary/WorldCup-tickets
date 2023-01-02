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
        const Match = await Matches.findOne({ matchNumber: MatchNumber })
        res.status(200).json(Match)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}
export const addMatches = async (req, res) => {

    try {
        const match = req.body;
        let exists = await Matches.exists({ matchNumber: match.matchNumber });
        if (exists) {
            const updatedMatch = await Matches.findOneAndUpdate({ matchNumber: match.matchNumber }, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedMatch)
        }
        console.log(match)
        const newMatch = new Matches(match);
        await newMatch.save();
        res.status(200).json(match);
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
}


export const updateMatch = async (req, res) => {
    const MatchNumber = req.params.MatchNumber
    try {
        const updatedMatch = await Matches.findOneAndUpdate({ matchNumber: MatchNumber }, {
            $set: req.body,
        }, { new: true });

        res.status(200).json(updatedMatch)
    } catch (err) {
        res.status(400).json(err)
    }


}
export const UpdateMatchTickets = async (req, res) => {

    var { MatchNumber, category, quantity, action } = req.body
    if (action === 'TICKET_RESERVED') {
        try {
            var updatedMatch = await Matches.findOneAndUpdate({ "matchNumber": MatchNumber }, {

                $inc: {
                    [`availability.category${category}.available`]: quantity * -1,
                    [`availability.category${category}.pending`]: quantity * -1
                }
            }, { new: true });
            res.status(200).json(updatedMatch);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
    else if (action === 'TICKET_PENDING') {
        try {
            var updatedMatch = await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, {
                $inc: {
                    [`availability.category${category}.pending`]: quantity
                }
            }, { new: true });
            res.status(200).json(updatedMatch);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
    else if (action === 'TICKET_CANCELLED') {
        try {
            var updatedMatch = await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, {
                $inc: {
                    [`availability.category${category}.pending`]: quantity * -1
                }
            }, { new: true });
            res.status(200).json(updatedMatch);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
}




