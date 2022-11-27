from jsonschema import validate
import json
matchfile = open('/home/sary/cms-downloader/cms_downloads/Winter 2022/Software Project I/Matches.json')
ticketfile = open('/home/sary/cms-downloader/cms_downloads/Winter 2022/Software Project I/Tickets.json')
matchschema = json.load(matchfile)
ticketschema = json.load(ticketfile)



ticket = {
    "SerialNumber": "ticket1",
    "SeatNumber": 23,
    "Status": "AVAILABLE",
    "Price": 100,
    "MatchNumber": 1
}
match = {
    "MatchNumber": 1,
    "RoundNumber": 1,
    "DateUtc": "2022-11-20T16:00:00Z",
    "Location": "Al Bayt Stadium",
    "StadiumCapacity": 5,
    "HomeTeam": "Qatar",
    "AwayTeam": "Ecuador",
    "Group": "A",
    "HomeTeamScore": 0,
    "AwayTeamScore": 0,
    "tickets": [
      "ticket1"
    ]
  }
validate(instance=match, schema=matchschema)
validate(instance=ticket, schema=ticketschema)