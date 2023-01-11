import app from '../app.js';
import request from 'supertest'
import { serverconnection, closeConnection } from '../index.js';
import Matches from '../Models/Matches.js';
import { json } from 'body-parser';
import { getMatch } from '../controller/matches.js';

import axios from 'axios'

import matchStub from './matchStub.api.stub.json'
jest.mock('axios')
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

beforeEach(()=>{
    jest.clearAllMocks();
    jest.resetAllMocks();
});
// const matchStub = {
//     matchNumber: 28,
//     roundNumber: 2,
//     dateUtc: "2022-11-27T19:00:00.000Z",
//     location: "Al Bayt Stadium",
//     homeTeam: "Spain",
//     awayTeam: "Germany",
//     homeTeamScore: 0,
//     awayTeamScore: 0,
//     availability: {
//         category1: {
//             available: 20,
//             pending: 0,
//             price: 75
//         },
//         category2: {
//             available: 20,
//             pending: 0,
//             price: 125
//         },
//         category3: {
//             available: 20,
//             pending: 0,
//             price: 195}
// }
// };
const SHOP_BASE_URL = 'https://world-cup-shop-microservice.vercel.app/api/matches';

describe.only('GET /api/matches/:matchNumber', () => {
    it.only('should return 200 OK and the match with matchNumber', async () => {
        axios.get.mockResolvedValueOnce(matchStub)
        const matchSample = await axios.get(`${SHOP_BASE_URL}/28`)
        //let matchSample = await Matches.findOne({matchNumber: 28})
        console.log(matchSample.data);
        return request(SHOP_BASE_URL).get('/27')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
            expect(res.body.matchNumber).toEqual(matchSample.data.matchNumber);
            expect(res.body.roundNumber).toEqual(matchSample.data.roundNumber);
            expect(res.body.location).toEqual(matchSample.data.location);
            expect(res.body.homeTeam).toEqual(matchSample.data.homeTeam);
            expect(res.body.awayTeam).toEqual(matchSample.data.awayTeam);
            expect(res.body.homeTeamScore).toEqual(matchSample.data.homeTeamScore);
            expect(res.body.awayTeamScore).toEqual(matchSample.data.awayTeamScore);
            expect(res.body.availability.category1).toEqual(matchSample.data.availability.category1);
            expect(res.body.availability.category2).toEqual(matchSample.data.availability.category2);
            expect(res.body.availability.category3).toEqual(matchSample.data.availability.category3);
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