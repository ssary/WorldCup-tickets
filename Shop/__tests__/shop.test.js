import app from '../app.js';
import request from 'supertest'
import { serverconnection, closeConnection } from '../index.js';
import Matches from '../Models/Matches.js';
import { json } from 'body-parser';
import axios from 'axios'
import updateStub from './updateStub.json'
import filterStub from './filterStub.json'
import matchStub from './matchStub.api.stub.json'
import matchesStub from './matchesStub.api.stub.json';
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

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

const SHOP_BASE_URL = 'https://world-cup-shop-microservice.vercel.app/api/matches';

describe('GET /api/matches/:matchNumber', () => {
    it('should return 200 OK and the match with matchNumber', async () => {
        axios.get.mockResolvedValueOnce(matchStub)
        const matchSample = await axios.get(`${SHOP_BASE_URL}/28`)
        //let matchSample = await Matches.findOne({matchNumber: 28})
        console.log(matchSample.data);
        return request(SHOP_BASE_URL).get('/28')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res) {
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
        axios.get.mockResolvedValueOnce(matchesStub)
        const matches = await axios.get(`${SHOP_BASE_URL}`)
        return request(SHOP_BASE_URL).get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res) {
                expect(res.body[0]).toMatchObject(matches.data[0]);
            });
    })
})


describe('Filter the matches on roundNumber', () => {
    describe('given a valid roundNumber', () => {
        it('Should return all matches in the given round', async () => {
            axios.get.mockResolvedValueOnce(filterStub)
            const filter = await axios.get(`${SHOP_BASE_URL}/5`)
            /*const { body, statusCode } = await supertest(app).get('/api/matches')
            expect(statusCode).toBe(200);
            expect(body).toBe(matchesStub);*/
            return request(SHOP_BASE_URL).get('/filterRound/5')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    expect(res.body).toMatchObject(filter.data);
                });
        });
    })

    describe('If a given roundNumber is (invalid) not in interval [1,7]', () => {
        it('should return 400 bad request', () => {
            return request(SHOP_BASE_URL)
                .get('/filterRound/8')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
        });
    })
});

const ticketpayload = { matchNumber: 43, category: 2, quantity: 1, action: "TICKET_PENDING" }
describe('updating Match to the shop database', () => {
    describe('given a new event the in tickets on shop consumer', () => {
        it('change the availability depending on action', async () => {
            axios.patch.mockResolvedValueOnce(updateStub)
            const updatedMatch = await axios.patch(`${SHOP_BASE_URL}/`, ticketpayload)
            return request(SHOP_BASE_URL)
                .patch('/')
                .send(ticketpayload)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    expect(res.body).toMatchObject(updatedMatch.data);
                });
        })
    });
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

describe('Adding new Match to the shop database', () => {
    describe('given a new match is received from masterlist', () => {
        it('should add a match given the right parameters', async () => {
            let newMatch = new Matches(newMatchStub)

            await newMatch.save();

            const matchNumber = newMatch.matchNumber

            return request(SHOP_BASE_URL)
                .get(`/${matchNumber}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    expect(res.body).toMatchObject(newMatch);
                });
        })
    });
    describe('given bad parameters', () => {

        it('Should return status 400', async () => {
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

});

jest.setTimeout(50000)