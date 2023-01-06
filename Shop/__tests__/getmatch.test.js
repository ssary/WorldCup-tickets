const supertest = require('supertest');
const app = require('../app.js');
/*
{"_id":{"$oid":"63a754a2ca2e3b50c7770069"}
,"matchNumber":{"$numberInt":"28"}
,"roundNumber":{"$numberInt":"2"}
,"dateUtc":{"$date":{"$numberLong":"1669575600000"}}
,"location":"Al Bayt Stadium"
,"homeTeam":"Spain"
,"awayTeam":"Germany"
,"homeTeamScore":{"$numberInt":"0"}
,"awayTeamScore":{"$numberInt":"0"}
,"availability":{"category1":{"available":{"$numberInt":"20"},"pending":{"$numberInt":"0"},"price":{"$numberInt":"75"}}
,"category2":{"available":{"$numberInt":"20"},"pending":{"$numberInt":"0"},"price":{"$numberInt":"125"}}
,"category3":{"available":{"$numberInt":"20"},"pending":{"$numberInt":"0"},"price":{"$numberInt":"195"}}}
,"__v":{"$numberInt":"0"}}
*/
const matchStub = {
    matchNumber: 28,
    roundNumber: 2,
    dateUtc: new Date(1669575600000),
    location: "Al Bayt Stadium",
    homeTeam: "Spain",
    awayTeam: "Germany",
    homeTeamScore: 0,
    awayTeamScore: 0,
    availability: {
        category1: {
            available: 20,
            pending: 0,
            price: 75
        },
        category2: {
            available: 20,
            pending: 0,
            price: 125
        },
        category3: {
            available: 20,
            pending: 0,
            price: 195}
}
};

describe('GET /api/matches', () => {
    it('should return 200 OK and the match with matchNumber', async () => {
        return supertest(app).get(`/api/matches/28`).expect(200).expect('Content-Type', /json/).then(response => {
            expect(response.body).toEqual(expect.arrayContaining([matchStub]));

    });
    }
);
});

