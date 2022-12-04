const Matches = require("../models/Matches");
const router = require("express").Router()

/**
 * - shop 
  - get(/matches/${matchNumber})
  - post(/matches)
  - patch(/matches)  
 */

  
//get all matches 
router.get("/", async (req, res) => {
  try{
    const matches = await Matches.find();
    res.status(200).json(matches)
  }catch(err){
    res.status(500).json(err)
  }
})



//get a match by it's number 
router.get("/match", async (req, res) => {
  try {
    const match = await Matches.find({ MatchNumber: req.body.MatchNumber });
    res.status(200).json(match);
  }catch(err){
    res.status(500).json(err)
  }
})



//post a match
router.post("/", async(req, res) => {
  const newMatch = new Matches(req.body);

  try {
    const savedMatch = await newMatch.save();
    res.status(200).json(savedMatch);
  } catch (err) {
    res.status(500).json(err);
  }
})



//patch == update a match 
router.put("/:id", async(req, res)=> {
  try {
    const updatedMatch = await Matches.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    res.status(200).json(updatedMatch)
  }catch(err){
    res.status(500).json(err)
  }
})



module.exports = router;
