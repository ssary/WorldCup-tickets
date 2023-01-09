import app from '../app.js';
import request from 'supertest'
import { serverconnection, closeConnection } from '../index.js';
import Matches from '../Models/Matches.js';
import { json } from 'body-parser';
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



const matchesStub = [{"availability":{"category1":{"available":0,"pending":295.79999999999995,"price":75},"category2":{"available":17,"pending":126,"price":125},"category3":{"available":20,"pending":30,"price":195}},"_id":"63a754a2ca2e3b50c777004e","matchNumber":1,"roundNumber":1,"dateUtc":"2022-11-20T16:00:00.000Z","location":"Al Bayt Stadium","homeTeam":"Qatar","awayTeam":"Ecuador","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":19,"pending":0,"price":75},"category2":{"available":18,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770050","matchNumber":2,"roundNumber":1,"dateUtc":"2022-11-21T16:00:00.000Z","location":"Al Thumama Stadium","homeTeam":"Senegal","awayTeam":"Netherlands","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":19,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777004f","matchNumber":3,"roundNumber":1,"dateUtc":"2022-11-21T13:00:00.000Z","location":"Khalifa International Stadium","homeTeam":"England","awayTeam":"Iran","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":19,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770051","matchNumber":4,"roundNumber":1,"dateUtc":"2022-11-21T19:00:00.000Z","location":"Ahmad Bin Ali Stadium","homeTeam":"USA","awayTeam":"Wales","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770055","matchNumber":5,"roundNumber":1,"dateUtc":"2022-11-22T19:00:00.000Z","location":"Al Janoub Stadium","homeTeam":"France","awayTeam":"Australia","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":18,"pending":-2,"price":75},"category2":{"available":19,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770053","matchNumber":6,"roundNumber":1,"dateUtc":"2022-11-22T13:00:00.000Z","location":"Education City Stadium","homeTeam":"Denmark","awayTeam":"Tunisia","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770054","matchNumber":7,"roundNumber":1,"dateUtc":"2022-11-22T16:00:00.000Z","location":"Stadium 974","homeTeam":"Mexico","awayTeam":"Poland","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":18,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770052","matchNumber":8,"roundNumber":1,"dateUtc":"2022-11-22T10:00:00.000Z","location":"Lusail Stadium","homeTeam":"Argentina","awayTeam":"Saudi Arabia","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770059","matchNumber":9,"roundNumber":1,"dateUtc":"2022-11-23T19:00:00.000Z","location":"Ahmad Bin Ali Stadium","homeTeam":"Belgium","awayTeam":"Canada","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":16,"pending":-4,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770058","matchNumber":10,"roundNumber":1,"dateUtc":"2022-11-23T16:00:00.000Z","location":"Al Thumama Stadium","homeTeam":"Spain","awayTeam":"Costa Rica","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":18,"pending":-2,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":3,"pending":-4,"price":195}},"_id":"63a754a2ca2e3b50c7770057","matchNumber":11,"roundNumber":1,"dateUtc":"2022-11-23T13:00:00.000Z","location":"Khalifa International Stadium","homeTeam":"Germany","awayTeam":"Japan","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":15,"pending":6,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":18,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770056","matchNumber":12,"roundNumber":1,"dateUtc":"2022-11-23T10:00:00.000Z","location":"Al Bayt Stadium","homeTeam":"Morocco","awayTeam":"Croatia","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777005a","matchNumber":13,"roundNumber":1,"dateUtc":"2022-11-24T10:00:00.000Z","location":"Al Janoub Stadium","homeTeam":"Switzerland","awayTeam":"Cameroon","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":19,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777005b","matchNumber":14,"roundNumber":1,"dateUtc":"2022-11-24T13:00:00.000Z","location":"Education City Stadium","homeTeam":"Uruguay","awayTeam":"Korea Republic","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777005c","matchNumber":15,"roundNumber":1,"dateUtc":"2022-11-24T16:00:00.000Z","location":"Stadium 974","homeTeam":"Portugal","awayTeam":"Ghana","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":18,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777005d","matchNumber":16,"roundNumber":1,"dateUtc":"2022-11-24T19:00:00.000Z","location":"Lusail Stadium","homeTeam":"Brazil","awayTeam":"Serbia","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777005e","matchNumber":17,"roundNumber":2,"dateUtc":"2022-11-25T10:00:00.000Z","location":"Ahmad Bin Ali Stadium","homeTeam":"Wales","awayTeam":"Iran","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777005f","matchNumber":18,"roundNumber":2,"dateUtc":"2022-11-25T13:00:00.000Z","location":"Al Thumama Stadium","homeTeam":"Qatar","awayTeam":"Senegal","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770060","matchNumber":19,"roundNumber":2,"dateUtc":"2022-11-25T16:00:00.000Z","location":"Khalifa International Stadium","homeTeam":"Netherlands","awayTeam":"Ecuador","homeTeamScore":0,"awayTeamScore":0,"__v":0},{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":18,"pending":0,"price":195}},"_id":"63b31b2b48785fbbf251391a","matchNumber":20,"roundNumber":2,"dateUtc":"2022-11-25T19:00:00.000Z","location":"Al Bayt Stadium","homeTeam":"England","awayTeam":"USA","homeTeamScore":0,"awayTeamScore":0,"__v":0},{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770062","matchNumber":21,"roundNumber":2,"dateUtc":"2022-11-26T10:00:00.000Z","location":"Al Janoub Stadium","homeTeam":"Tunisia","awayTeam":"Australia","homeTeamScore":0,"awayTeamScore":0,"__v":0},{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770063","matchNumber":22,"roundNumber":2,"dateUtc":"2022-11-26T13:00:00.000Z","location":"Education City Stadium","homeTeam":"Poland","awayTeam":"Saudi Arabia","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":0,"pending":20,"price":75},"category2":{"available":0,"pending":20,"price":125},"category3":{"available":0,"pending":20,"price":195}},"_id":"63a754a2ca2e3b50c7770064","matchNumber":23,"roundNumber":2,"dateUtc":"2022-11-26T16:00:00.000Z","location":"Stadium 974","homeTeam":"France","awayTeam":"Denmark","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770065","matchNumber":24,"roundNumber":2,"dateUtc":"2022-11-26T19:00:00.000Z","location":"Lusail Stadium","homeTeam":"Argentina","awayTeam":"Mexico","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770066","matchNumber":25,"roundNumber":2,"dateUtc":"2022-11-27T10:00:00.000Z","location":"Ahmad Bin Ali Stadium","homeTeam":"Japan","awayTeam":"Costa Rica","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770067","matchNumber":26,"roundNumber":2,"dateUtc":"2022-11-27T13:00:00.000Z","location":"Al Thumama Stadium","homeTeam":"Belgium","awayTeam":"Morocco","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":18,"pending":0,"price":75},"category2":{"available":15,"pending":-2,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770068","matchNumber":27,"roundNumber":2,"dateUtc":"2022-11-27T16:00:00.000Z","location":"Khalifa International Stadium","homeTeam":"Croatia","awayTeam":"Canada","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c7770069","matchNumber":28,"roundNumber":2,"dateUtc":"2022-11-27T19:00:00.000Z","location":"Al Bayt Stadium","homeTeam":"Spain","awayTeam":"Germany","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":18,"pending":-2,"price":195}},"_id":"63a754a2ca2e3b50c777006a","matchNumber":29,"roundNumber":2,"dateUtc":"2022-11-28T10:00:00.000Z","location":"Al Janoub Stadium","homeTeam":"Cameroon","awayTeam":"Serbia","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a2ca2e3b50c777006b","matchNumber":30,"roundNumber":2,"dateUtc":"2022-11-28T13:00:00.000Z","location":"Education City Stadium","homeTeam":"Korea Republic","awayTeam":"Ghana","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777006c","matchNumber":31,"roundNumber":2,"dateUtc":"2022-11-28T16:00:00.000Z","location":"Stadium 974","homeTeam":"Brazil","awayTeam":"Switzerland","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":18,"pending":-2,"price":75},"category2":{"available":20,"pending":2,"price":125},"category3":{"available":20,"pending":3,"price":195}},"_id":"63a754a3ca2e3b50c777006d","matchNumber":32,"roundNumber":2,"dateUtc":"2022-11-28T19:00:00.000Z","location":"Lusail Stadium","homeTeam":"Portugal","awayTeam":"Uruguay","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770070","matchNumber":33,"roundNumber":3,"dateUtc":"2022-11-29T19:00:00.000Z","location":"Ahmad Bin Ali Stadium","homeTeam":"Wales","awayTeam":"England","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770071","matchNumber":34,"roundNumber":3,"dateUtc":"2022-11-29T19:00:00.000Z","location":"Al Thumama Stadium","homeTeam":"Iran","awayTeam":"USA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777006e","matchNumber":35,"roundNumber":3,"dateUtc":"2022-11-29T15:00:00.000Z","location":"Khalifa International Stadium","homeTeam":"Ecuador","awayTeam":"Senegal","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777006f","matchNumber":36,"roundNumber":3,"dateUtc":"2022-11-29T15:00:00.000Z","location":"Al Bayt Stadium","homeTeam":"Netherlands","awayTeam":"Qatar","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770072","matchNumber":37,"roundNumber":3,"dateUtc":"2022-11-30T15:00:00.000Z","location":"Al Janoub Stadium","homeTeam":"Australia","awayTeam":"Denmark","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":19,"pending":0,"price":75},"category2":{"available":18,"pending":0,"price":125},"category3":{"available":16,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770073","matchNumber":38,"roundNumber":3,"dateUtc":"2022-11-30T15:00:00.000Z","location":"Education City Stadium","homeTeam":"Tunisia","awayTeam":"France","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770074","matchNumber":39,"roundNumber":3,"dateUtc":"2022-11-30T19:00:00.000Z","location":"Stadium 974","homeTeam":"Poland","awayTeam":"Argentina","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770075","matchNumber":40,"roundNumber":3,"dateUtc":"2022-11-30T19:00:00.000Z","location":"Lusail Stadium","homeTeam":"Saudi Arabia","awayTeam":"Mexico","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770076","matchNumber":41,"roundNumber":3,"dateUtc":"2022-12-01T15:00:00.000Z","location":"Ahmad Bin Ali Stadium","homeTeam":"Croatia","awayTeam":"Belgium","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":19,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770077","matchNumber":42,"roundNumber":3,"dateUtc":"2022-12-01T15:00:00.000Z","location":"Al Thumama Stadium","homeTeam":"Canada","awayTeam":"Morocco","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770078","matchNumber":43,"roundNumber":3,"dateUtc":"2022-12-01T19:00:00.000Z","location":"Khalifa International Stadium","homeTeam":"Japan","awayTeam":"Spain","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770079","matchNumber":44,"roundNumber":3,"dateUtc":"2022-12-01T19:00:00.000Z","location":"Al Bayt Stadium","homeTeam":"Costa Rica","awayTeam":"Germany","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":-32,"pending":-10,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777007a","matchNumber":45,"roundNumber":3,"dateUtc":"2022-12-02T15:00:00.000Z","location":"Al Janoub Stadium","homeTeam":"Ghana","awayTeam":"Uruguay","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777007b","matchNumber":46,"roundNumber":3,"dateUtc":"2022-12-02T15:00:00.000Z","location":"Education City Stadium","homeTeam":"Korea Republic","awayTeam":"Portugal","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777007c","matchNumber":47,"roundNumber":3,"dateUtc":"2022-12-02T19:00:00.000Z","location":"Stadium 974","homeTeam":"Serbia","awayTeam":"Switzerland","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":12,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777007d","matchNumber":48,"roundNumber":3,"dateUtc":"2022-12-02T19:00:00.000Z","location":"Lusail Stadium","homeTeam":"Cameroon","awayTeam":"Brazil","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":14,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777007e","matchNumber":49,"roundNumber":4,"dateUtc":"2022-12-03T15:00:00.000Z","location":"TBA","homeTeam":"1A","awayTeam":"2B","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":18,"pending":0,"price":75},"category2":{"available":18,"pending":2,"price":125},"category3":{"available":19,"pending":-1,"price":195}},"_id":"63a754a3ca2e3b50c777007f","matchNumber":50,"roundNumber":4,"dateUtc":"2022-12-03T19:00:00.000Z","location":"TBA","homeTeam":"1C","awayTeam":"2D","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770081","matchNumber":51,"roundNumber":4,"dateUtc":"2022-12-04T19:00:00.000Z","location":"TBA","homeTeam":"1B","awayTeam":"2A","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770080","matchNumber":52,"roundNumber":4,"dateUtc":"2022-12-04T15:00:00.000Z","location":"TBA","homeTeam":"1D","awayTeam":"2C","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770082","matchNumber":53,"roundNumber":4,"dateUtc":"2022-12-05T15:00:00.000Z","location":"TBA","homeTeam":"1E","awayTeam":"2F","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770083","matchNumber":54,"roundNumber":4,"dateUtc":"2022-12-05T19:00:00.000Z","location":"TBA","homeTeam":"1G","awayTeam":"2H","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":18,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770084","matchNumber":55,"roundNumber":4,"dateUtc":"2022-12-06T15:00:00.000Z","location":"TBA","homeTeam":"1F","awayTeam":"2E","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":-1,"price":195}},"_id":"63a754a3ca2e3b50c7770085","matchNumber":56,"roundNumber":4,"dateUtc":"2022-12-06T19:00:00.000Z","location":"TBA","homeTeam":"1H","awayTeam":"2G","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":2,"price":75},"category2":{"available":18,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770087","matchNumber":57,"roundNumber":5,"dateUtc":"2022-12-09T19:00:00.000Z","location":"TBA","homeTeam":"TBA","awayTeam":"TBA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770086","matchNumber":58,"roundNumber":5,"dateUtc":"2022-12-09T15:00:00.000Z","location":"TBA","homeTeam":"TBA","awayTeam":"TBA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":8,"pending":-4,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770089","matchNumber":59,"roundNumber":5,"dateUtc":"2022-12-10T19:00:00.000Z","location":"TBA","homeTeam":"TBA","awayTeam":"TBA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c7770088","matchNumber":60,"roundNumber":5,"dateUtc":"2022-12-10T15:00:00.000Z","location":"TBA","homeTeam":"TBA","awayTeam":"TBA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777008a","matchNumber":61,"roundNumber":6,"dateUtc":"2022-12-13T19:00:00.000Z","location":"TBA","homeTeam":"TBA","awayTeam":"TBA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777008b","matchNumber":62,"roundNumber":6,"dateUtc":"2022-12-14T19:00:00.000Z","location":"TBA","homeTeam":"TBA","awayTeam":"TBA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":0,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63a754a3ca2e3b50c777008c","matchNumber":63,"roundNumber":7,"dateUtc":"2022-12-17T15:00:00.000Z","location":"TBA","homeTeam":"TBA","awayTeam":"TBA","homeTeamScore":0,"awayTeamScore":0,"__v":0},
{"availability":{"category1":{"available":20,"pending":2,"price":75},"category2":{"available":20,"pending":0,"price":125},"category3":{"available":20,"pending":0,"price":195}},"_id":"63b455c2e9e4f71e8ff9547f","matchNumber":64,"roundNumber":7,"dateUtc":"2022-11-25T19:00:00.000Z","location":"Al Bayt stadium","homeTeam":"Argentina","awayTeam":"France","homeTeamScore":0,"awayTeamScore":0,"__v":0}]


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

const filterRoundStub = [
    {
        "availability": {
            "category1": {
                "available": 20,
                "pending": 0,
                "price": 75
            },
            "category2": {
                "available": 20,
                "pending": 0,
                "price": 125
            },
            "category3": {
                "available": 18,
                "pending": 35,
                "price": 195
            }
        },
        "_id": "63a754a3ca2e3b50c777008a",
        "matchNumber": 61,
        "roundNumber": 6,
        "dateUtc": "2022-12-13T19:00:00.000Z",
        "location": "TBA",
        "homeTeam": "TBA",
        "awayTeam": "TBA",
        "homeTeamScore": 0,
        "awayTeamScore": 0,
        "__v": 0
    },
    {
        "availability": {
            "category1": {
                "available": 20,
                "pending": 0,
                "price": 75
            },
            "category2": {
                "available": 20,
                "pending": 0,
                "price": 125
            },
            "category3": {
                "available": 20,
                "pending": 5,
                "price": 195
            }
        },
        "_id": "63a754a3ca2e3b50c777008b",
        "matchNumber": 62,
        "roundNumber": 6,
        "dateUtc": "2022-12-14T19:00:00.000Z",
        "location": "TBA",
        "homeTeam": "TBA",
        "awayTeam": "TBA",
        "homeTeamScore": 0,
        "awayTeamScore": 0,
        "__v": 0
    }
]

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
const newMatchStub = 
    {
        "availability": {
            "category1": {
                "available": 20,
                "pending": 0,
                "price": 75
            },
            "category2": {
                "available": 20,
                "pending": 0,
                "price": 125
            },
            "category3": {
                "available": 20,
                "pending": 0,
                "price": 195
            }
        },
        "matchNumber": 73,
        "roundNumber": 2,
        "dateUtc": "2022-11-27T19:00:00.000Z",
        "location": "Al Bayt Stadium",
        "homeTeam": "TBA",
        "awayTeam": "TBA",
        "homeTeamScore": 0,
        "awayTeamScore": 0
    }

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
const newTicketstub={
    "availability": {
        "category1": {
            "available": 18,
            "pending": 0,
            "price": 75
        },
        "category2": {
            "available": 20,
            "pending": 2,
            "price": 125
        },
        "category3": {
            "available": 20,
            "pending": 0,
            "price": 195
        }
    },
    "_id": "63b9494b578df497292b61c8",
    "matchNumber": 43,
    "roundNumber": 3,
    "dateUtc": "2022-12-01T19:00:00.000Z",
    "location": "Khalifa International Stadium",
    "homeTeam": "Japan",
    "awayTeam": "Spain",
    "homeTeamScore": 0,
    "awayTeamScore": 0,
    "__v": 0
};
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
