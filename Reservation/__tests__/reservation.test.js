import supertest from 'supertest';
import app from '../index.js';
import request from 'supertest'

const allReservationsStub = [{"_id":"63b77a639aad3be332c0a69f","serialNumber":"16ba6c71-3df5-4429-8c72-da50a1641246","Category":1,"Buyer":{"Name":"omar Mohamed","Email":"omaoar@gmail.com","Country":"\"Egypt\"",
"_id":"63b77a639aad3be332c0a6a0","Phone":"+201135924213","nationalFormat":"0113 592 4213","internationalFormat":"+20 113 592 4213","countryCode":"EG"},"MatchNumber":2,"quantity":1,"price":75,"__v":0},
{"_id":"63b77fc804c06d825f5e8158","serialNumber":"a644ecb2-3a0d-406a-adc3-67c4c0c6ea43","Category":2,"price":125,"Buyer":{"Name":"omar","Email":"ramul_2012@gmail.com","Country":"Egypt",
"_id":"63b77fc804c06d825f5e8159","Phone":"+201133924213","nationalFormat":"0113 392 4213","internationalFormat":"+20 113 392 4213","countryCode":"EG"},"MatchNumber":2,"quantity":2,"__v":0},
{"_id":"63b870550f17199a4b595c4f","serialNumber":"7878eaa4-19fb-4506-9337-7acb119000d4","Category":2,"price":125,"Buyer":{"Name":"omar","Email":"raymul2012@gmail.com","Country":"Egypt",
"_id":"63b870550f17199a4b595c50","Phone":"+201005520390","nationalFormat":"0100 552 0390","internationalFormat":"+20 100 552 0390","countryCode":"EG"},"MatchNumber":2,"quantity":2,"__v":0},
{"_id":"63b889c2c58e49add4e4db4a","serialNumber":"dcb644f5-015d-43fe-bab3-5fb7c1bbc6cd","Category":2,"price":125,"Buyer":{"Name":"omar el barbary","Email":"bigb@gmail.com","Country":"Egypt",
"_id":"63b889c2c58e49add4e4db4b","Phone":"+201111111111","nationalFormat":"0111 111 1111","internationalFormat":"+20 111 111 1111","countryCode":"EG"},"MatchNumber":1,"quantity":2,"__v":0},
{"_id":"63b89ba68b1978a0c78905ac","serialNumber":"301dd328-09f7-47f6-b7c9-d445761be8c6","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb2@gmail.com","Country":"Egypt",
"_id":"63b89ba68b1978a0c78905ad","Phone":"+201111111112","nationalFormat":"0111 111 1112","internationalFormat":"+20 111 111 1112","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b89bfc8b1978a0c78905af","serialNumber":"b41332a8-11cd-407e-8735-de9ee9579b4c","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb3@gmail.com","Country":"Egypt",
"_id":"63b89bfc8b1978a0c78905b0","Phone":"+201111111113","nationalFormat":"0111 111 1113","internationalFormat":"+20 111 111 1113","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b89c7e8b1978a0c78905b2","serialNumber":"4eca9e47-0e14-438d-a4be-6b6222ca63d9","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb4@gmail.com","Country":"Egypt",
"_id":"63b89c7e8b1978a0c78905b3","Phone":"+201111111114","nationalFormat":"0111 111 1114","internationalFormat":"+20 111 111 1114","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b89dac83e6bb381425e4d6","serialNumber":"2a861a0d-6a26-433e-9872-7deb4bc68e5f","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb5@gmail.com","Country":"Egypt",
"_id":"63b89dac83e6bb381425e4d7","Phone":"+201111111115","nationalFormat":"0111 111 1115","internationalFormat":"+20 111 111 1115","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b89e9131ea609158d32084","serialNumber":"8ce4ac9d-07db-410b-a157-7c3d6ee698ba","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb6@gmail.com","Country":"Egypt",
"_id":"63b89e9131ea609158d32085","Phone":"+201111111116","nationalFormat":"0111 111 1116","internationalFormat":"+20 111 111 1116","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b89f1132f64a2151aab912","serialNumber":"5ad1525f-341b-4751-a137-ce12754deb65","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb7@gmail.com","Country":"Egypt",
"_id":"63b89f1132f64a2151aab913","Phone":"+201111111117","nationalFormat":"0111 111 1117","internationalFormat":"+20 111 111 1117","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b89fc73f8d4546e80f0f53","serialNumber":"e8791337-00e3-4b4c-9990-9bf7855d36d3","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb8@gmail.com","Country":"Egypt",
"_id":"63b89fc73f8d4546e80f0f54","Phone":"+201111111118","nationalFormat":"0111 111 1118","internationalFormat":"+20 111 111 1118","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b8a06bc21d207a529333b4","serialNumber":"cff742d5-870e-48f8-accc-e437a2c36ed1","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb9@gmail.com","Country":"Egypt",
"_id":"63b8a06bc21d207a529333b5","Phone":"+201111111119","nationalFormat":"0111 111 1119","internationalFormat":"+20 111 111 1119","countryCode":"EG"},"MatchNumber":38,"quantity":2,"__v":0},
{"_id":"63b8b32843d6c749270db01f","serialNumber":"2a5d4e18-939f-4010-8ebc-4604cc4b7643","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb14@gmail.com","Country":"Egypt",
"_id":"63b8b32843d6c749270db020","Phone":"+201234567890","nationalFormat":"0123 456 7890","internationalFormat":"+20 123 456 7890","countryCode":"EG"},"MatchNumber":1,"quantity":2,"__v":0},
{"_id":"63b8b48943d6c749270db022","serialNumber":"bfa221c2-c845-4be6-b755-04a334ffe34a","Category":3,"price":195,"Buyer":{"Name":"sbace","Email":"s@gmail.com","Country":"Egypt",
"_id":"63b8b48943d6c749270db023","Phone":"+201000829753","nationalFormat":"0100 082 9753","internationalFormat":"+20 100 082 9753","countryCode":"EG"},"MatchNumber":1,"quantity":2,"__v":0}]


describe("GET api/reservation", () => {
    it("Should return all reservations with status code 200", async () => {
        request(app).get('/api/reservation/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, allReservationsStub);
    })
})



const reservationStub = [{"_id":"63b889c2c58e49add4e4db4a","serialNumber":"dcb644f5-015d-43fe-bab3-5fb7c1bbc6cd","Category":2,"price":125,"Buyer":{"Name":"omar el barbary","Email":"bigb@gmail.com","Country":"Egypt","_id":"63b889c2c58e49add4e4db4b","Phone":"+201111111111","nationalFormat":"0111 111 1111","internationalFormat":"+20 111 111 1111","countryCode":"EG"},"MatchNumber":1,"quantity":2,"__v":0},{"_id":"63b8b32843d6c749270db01f","serialNumber":"2a5d4e18-939f-4010-8ebc-4604cc4b7643","Category":3,"price":195,"Buyer":{"Name":"barbaron","Email":"bigb14@gmail.com","Country":"Egypt","_id":"63b8b32843d6c749270db020","Phone":"+201234567890","nationalFormat":"0123 456 7890","internationalFormat":"+20 123 456 7890","countryCode":"EG"},"MatchNumber":1,"quantity":2,"__v":0},{"_id":"63b8b48943d6c749270db022","serialNumber":"bfa221c2-c845-4be6-b755-04a334ffe34a","Category":3,"price":195,"Buyer":{"Name":"sbace","Email":"s@gmail.com","Country":"Egypt","_id":"63b8b48943d6c749270db023","Phone":"+201000829753","nationalFormat":"0100 082 9753","internationalFormat":"+20 100 082 9753","countryCode":"EG"},"MatchNumber":1,"quantity":2,"__v":0},{"_id":"63b8d335a916628e6b534eac","serialNumber":"36e544ea-263c-4b7d-92df-8d34df75a474","Category":1,"price":75,"Buyer":{"Name":"ram","Email":"ram3@gmail.com","Country":"Egypt","_id":"63b8d335a916628e6b534ead","Phone":"+201033398950","nationalFormat":"0103 339 8950","internationalFormat":"+20 103 339 8950","countryCode":"EG"},"MatchNumber":1,"quantity":2,"__v":0}]


describe("GET api/reservation", () => {
    it("Should return all reservations for a specific match with status code 200", async () => {
        request(app).get('/api/reservation/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, reservationStub);
    })
})




const reservationsWithCategoryStub = {"_id": "63b77a639aad3be332c0a69f", "serialNumber": "16ba6c71-3df5-4429-8c72-da50a1641246",  "Category": 1,  "Buyer": {         "Name": "omar Mohamed",         "Email": "omaoar@gmail.com",         "Country": "Egypt",         "_id": "63b77a639aad3be332c0a6a0",         "Phone": "+201135924213",         "nationalFormat": "0113 592 4213",         "internationalFormat": "+20 113 592 4213",         "countryCode": "EG"     },     "MatchNumber": 2,     "quantity": 1,     "price": 75,     "__v": 0 }


describe("GET api/reservation/:MatchNumber/:Category", () => {
    it("Should return all reservations for a specific match and category with status code 200", async () => {
        request(app).get('/api/reservation/2/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, reservationsWithCategoryStub);
    })
})