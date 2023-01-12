const request = require('supertest')
const app = require('../index')
const axios = require('axios')
const mockReservationStub = require('./reservationsStub.json');
const mockEmailandSSIDreservation = require('./reservationEmailandIDStub.json')
const mockReservationForMatch = require('./reservationsForMatch.json')
const mockConfirmation = require('./mockConfirmation.json')
jest.mock('axios')

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

const RESERVATION_BASE_URL = 'https://world-cup-reservation-microservice.vercel.app/api/reservation';

describe("GET api/reservation", () => {
    it("Should return all reservations with status code 200", async () => {
        axios.get.mockResolvedValueOnce(mockReservationStub)
        const reservations = await axios.get(`${RESERVATION_BASE_URL}`)

        return request(RESERVATION_BASE_URL).get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res) {
                expect(res.body[0]).toMatchObject(reservations.data[0]);
            });
    });
});






describe("GET api/reservation", () => {
    it("Should return all reservations for a specific match with status code 200", async () => {
        axios.get.mockResolvedValueOnce(mockReservationForMatch)
        const reservation = await axios.get(`${RESERVATION_BASE_URL}/3`)
        return request(RESERVATION_BASE_URL).get('/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res) {
                expect(res.body).toMatchObject(reservation.data);
            });
    })
    it('should return empty array if no reservations exist', async () => {
        return request(RESERVATION_BASE_URL).get('/65')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect([]);
    });
});


describe("GET api/reservation/ssid/:ssid", () => {
    it("Should return reservations for a serialNumber with status code 200", async () => {
        axios.get.mockResolvedValueOnce(mockEmailandSSIDreservation)
        const ssidReservation = await axios.get(`${RESERVATION_BASE_URL}/ssid/0179acdf-6c5b-4ebc-86b7-41bf0985a6d3`)
        return request(RESERVATION_BASE_URL).get('/ssid/0179acdf-6c5b-4ebc-86b7-41bf0985a6d3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res) {
                expect(res.body).toMatchObject(ssidReservation.data);
            });
            
    })
    it('should return null if reservation does not exist', async () => {
        return request(RESERVATION_BASE_URL).get('/ssid/wrongssid')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(null);
    });
});
describe("GET api/reservation/email/:email", () => {
    it("Should return reservations for an email with status code 200", async () => {
        axios.get.mockResolvedValueOnce(mockEmailandSSIDreservation)
        const emailReservation = await axios.get(`${RESERVATION_BASE_URL}/email/mario@gmail.com`)
        return request(RESERVATION_BASE_URL).get('/email/mario@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res) {
                expect(res.body).toMatchObject(emailReservation.data);
            });
    });
    it('should return null if email does not exist', async () => {
        return request(RESERVATION_BASE_URL).get('/email/wrong@email.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(null);
    });
});
describe("POST api/reservation/", () => {
    it("Should return a new reservations with status code 200", async () => {
        //axios.post.mockResolvedValueOnce(mockConfirmation)
        axios.post.mockImplementationOnce(() => Promise.resolve(mockConfirmation));
        const response = await axios.post(`${RESERVATION_BASE_URL}/`, {
            "email": "desoukya@gmail.com",
            "matchNumber": 1,
            "tickets": {
                "category": 1,
                "quantity": 2,
                "price": 75
            },
            "card": {
                "number": "4242424242424242",
                "expirationMonth": 12,
                "expirationYear": 2024,
                "cvc": "123"
            }
        });

        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(response.body).toEqual(mockConfirmation.data);
    })
});


jest.setTimeout(50000)