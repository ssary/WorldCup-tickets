import app from '../app.js';
import request from 'supertest'
import { serverconnection, closeConnection } from '../index.js';
import Matches from '../Models/Matches.js';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import {Mockgoose}  from 'mockgoose';
import { matchStub,matchesStub,filterRoundStub, newMatchStub, newTicketstub } from './stubs.js';
const mockgoose = new Mockgoose(mongoose);

// restart connection to the database before each test
// beforeEach(() => {
//     serverconnection();
// })

// afterEach(()=>{
//     closeConnection();
// })
// afterEach(() => {
//     mongoose.connection.close();
// })

// beforeEach(()=>{
//     jest.clearAllMocks();
//     jest.resetAllMocks();
// });
// 
/*
beforeAll(async () => {
    await mockgoose.prepareStorage();
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mockgoose.mongodHelper.mongoBin.childProcess.kill();
  });*/
const SHOP_BASE_URL = 'https://world-cup-shop-microservice.vercel.app/api/matches';

describe('GET /api/matches/:matchNumber', () => {
    it('should return 200 OK and the match with matchNumber', async () => {
        let matchSample = await Matches.findOne({matchNumber: 28})
        return request(SHOP_BASE_URL).get('/28')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        // .expect(function(res){
        //     expect(res.body).toMatchObject(matchSample);
        // });
        .expect(function(res) {
            expect(res.body.matchNumber).toEqual(matchSample.matchNumber);
            expect(res.body.roundNumber).toEqual(matchSample.roundNumber);
            expect(res.body.location).toEqual(matchSample.location);
            expect(res.body.homeTeam).toEqual(matchSample.homeTeam);
            expect(res.body.awayTeam).toEqual(matchSample.awayTeam);
            expect(res.body.homeTeamScore).toEqual(matchSample.homeTeamScore);
            expect(res.body.awayTeamScore).toEqual(matchSample.awayTeamScore);
            expect(res.body.availability.category1).toEqual(matchSample.availability.category1);
            expect(res.body.availability.category2).toEqual(matchSample.availability.category2);
            expect(res.body.availability.category3).toEqual(matchSample.availability.category3);
        });
    });

    it('should return 404 Not Found if matchNumber does not exist', async () => {
        return request(SHOP_BASE_URL).get('/90')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
});





describe("GET api/matches", () => {
    it("Should return all matches with status code 200", async () => {
        /*const { body, statusCode } = await supertest(app).get('/api/matches')
        expect(statusCode).toBe(200);
        expect(body).toBe(matchesStub);*/
        return request(SHOP_BASE_URL).get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
            expect(res.body).toMatchObject(matchesStub);
        });
    })
})


/*
describe('GET /api/matches/filterRound', () => {
    it('Should get matches by round', () => {
      request(app)
        .get(/api/matches/filterRound/${1})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, filterRoundStub)
    });
});

*/
describe('Filter the matches on roundNumber', () => {
    describe('given a valid roundNumber', ()=>{
        it('Should return all matches in the given round', () => {
        return request(SHOP_BASE_URL)
          .post('/filterRound')
          .send({round: 6})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function(res){
              expect(res.body).toMatchObject(filterRoundStub);
          });
      });})
    
    describe('If a given roundNumber is (invalid) not in interval [1,7]', ()=>{
        it('should return 400 bad request', () => {
            return request(SHOP_BASE_URL)
              .post('/filterRound')
              .send({round: 10})
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(400)
          });
    })
});
/*
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
        else{
        const newMatch = new Matches(match);
        await newMatch.save();
        res.status(200).json(match);
    }}
    catch (e) {
        res.status(400).json({ message: e.message })
    }
}
*/

describe('Adding new Match to the shop database', ()=>{
    describe('given a new match that doesn\'t exist in the DB', ()=>{
    it('should add a match given the right parameters',async ()=>{
        let newMatch = new Matches(newMatchStub)
        
        await newMatch.save();
        
        const matchNumber = newMatch.matchNumber
        
        return request(SHOP_BASE_URL)
        .get(`/${matchNumber}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
            expect(res.body).toMatchObject(newMatch);
        });
    })
})
    describe('given bad parameters', () => {
        
        it('Should return status 400', async()=>{
            const newMatch = new Matches(newMatchStub)
            //await newMatch.save()
            return request(SHOP_BASE_URL)
            .post('/')
            .send(newMatch)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
      })
    })
    
})
const ticketpayload = {matchNumber:43,category:2,quantity:2,action:"TICKET_PENDING"}
describe('updating Match to the shop database', ()=>{
    describe('given a new event the in tickets on shop consumer', ()=>{
    it('change the availability depending on action',async ()=>{
        return request(SHOP_BASE_URL)
        .patch()
        .send(ticketpayload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
            expect(res.body).toMatchObject(newTicketstub);
        });
    })
});
});





describe('POST /users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Foo' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: expect.any(String), name: 'Foo' });
  });
});