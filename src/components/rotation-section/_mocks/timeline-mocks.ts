export const MockedEmptyItinerary = {
    "aircraft": {
        "ident": "AS1001",
        "type": "A320",
        "economySeats": 100,
        "base": "EGKK"
    },
    "flights": [],
    "getAircraftUsage": () => 0
};

export const MockedItineraryForTimeline = {
    "aircraft": {
        "ident": "AS1001",
        "type": "A320",
        "economySeats": 100,
        "base": "EGKK"
    },
    "flights": [
        {
            "ident": "AS1027",
            "departuretime": 35100,
            "arrivaltime": 40500,
            "readable_departure": "09:45",
            "readable_arrival": "11:15",
            "origin": "LFSB",
            "destination": "EDDH"
        },
        {
            "ident": "AS1028",
            "departuretime": 42300,
            "arrivaltime": 47400,
            "readable_departure": "11:45",
            "readable_arrival": "13:10",
            "origin": "EDDH",
            "destination": "LFSB"
        },
        {
            "ident": "AS1133",
            "departuretime": 54300,
            "arrivaltime": 63600,
            "readable_departure": "15:05",
            "readable_arrival": "17:40",
            "origin": "LFSB",
            "destination": "LPPR"
        }
    ],
    "getAircraftUsage": () => 24
};
