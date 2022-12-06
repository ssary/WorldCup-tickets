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
export const updateTeams = async (req, res) => {

    let { MatchNumber, HomeTeam, AwayTeam } = req.body;
    try {
        await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, { HomeTeam: HomeTeam }, { AwayTeam: AwayTeam });
        res.status(200);
    }
    catch (e) {
        res.status(404).json({ message: e.message });

    }

}
export const updateScores = async (req, res) => {

    let { MatchNumber, HomeTeamScore, AwayTeamScore } = req.body;
    try {
        await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, { HomeTeamScore: HomeTeamScore }, { AwayTeam: AwayTeamScore });
        res.status(200);
    }
    catch (e) {
        res.status(404).json({ message: e.message });

    }

}
export const updateLocation = async (req, res) => {

    let { MatchNumber, Location } = req.body;
    try {
        await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, { Location: Location });
        res.status(200);
    }
    catch (e) {
        res.status(404).json({ message: e.message });

    }

}
export const updateMatch = async (req, res) => {

    let { MatchNumber, buy } = req.body
    const increment = (buy?1:-1)
        try{
        await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, {
            $inc: {
                Tickets: increment
            }
        });
        res.status(200);
    }
    catch(e){
        res.status(404).json({message: e.message});
    }
 

}
