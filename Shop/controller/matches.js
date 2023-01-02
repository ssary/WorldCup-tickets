import axios from "axios";
import Matches from "../Models/Matches.js";

export const getMatches = async (req, res) => {
    try {
        const records = await Matches.find().sort({matchNumber: 1});
        res.status(200).json(records);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}
export const getRound = async (req, res) => {
    try {
        const {round} = req.body;
        if(round === 1){
            const records = await Matches.find({$or: [{roundNumber: 1 }, {roundNumber: 2 }, {roundNumber: 3 }]}).sort({matchNumber: 1});
            res.status(200).json(records);
        }else{
            const records = await Matches.find({roundNumber: round}).sort({matchNumber: 1});
            res.status(200).json(records);
        }
        
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
            const List = req.body;
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
export const ReserveMatchTickets = async (req, res) => {

        var {MatchNumber,category,quantity } = req.body
        try {
            await Matches.findOneAndUpdate({ "matchNumber": MatchNumber }, {

                $inc: {
                    [`availability.category${category}.count`]: quantity * -1
                }
            }, { new: true })
            var updatedMatch = await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, {
                $inc: {
                    [`pending.category${category}.count`]: quantity * -1
                }
            }, { new: true });
            res.status(200).json(updatedMatch);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    
    
       
}
export const HoldMatchTickets = async (req, res) => {
    
    var {MatchNumber,category,quantity } = req.body
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


export const UpdateMatchTickets = async (req, res) => {

        var {MatchNumber,category,quantity,action } = req.body
        if(action==='TICKET_RESERVED'){
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
        else if(action==='TICKET_PENDING'){
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
        else if(action==='TICKET_CANCELLED'){try {
            var updatedMatch = await Matches.findOneAndUpdate({ MatchNumber: MatchNumber }, {
                $inc: {
                    [`availability.category${category}.pending`]: quantity*-1
                }
            }, { new: true });
            res.status(200).json(updatedMatch);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
        }
    }

