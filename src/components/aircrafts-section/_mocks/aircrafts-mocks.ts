export const mockedItineraries = [
    {
        "aircraft": {
            "ident": "AS1001",
            "type": "A320",
            "economySeats": 100,
            "base": "EGKK"
        },
        "flights": [
            {
                "ident": "AS1001",
                "departuretime": 21600,
                "arrivaltime": 26100,
                "readable_departure": "06:00",
                "readable_arrival": "07:15",
                "origin": "LFSB",
                "destination": "LFMN"
            },
            {
                "ident": "AS1002",
                "departuretime": 27900,
                "arrivaltime": 32100,
                "readable_departure": "07:45",
                "readable_arrival": "08:55",
                "origin": "LFMN",
                "destination": "LFSB"
            },
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
                "ident": "AS1081",
                "departuretime": 49800,
                "arrivaltime": 55800,
                "readable_departure": "13:50",
                "readable_arrival": "15:30",
                "origin": "LFSB",
                "destination": "LEBL"
            }
        ],
        "getAircraftUsage": () => 30
    },
    {
        "aircraft": {
            "ident": "AS1002",
            "type": "A320",
            "economySeats": 186,
            "base": "EGKK"
        },
        "flights": [],
        "getAircraftUsage": () => 0
    },
    {
        "aircraft": {
            "ident": "AS1025",
            "type": "A320",
            "economySeats": 168,
            "base": "EGKK"
        },
        "flights": [],
        "getAircraftUsage": () => 0
    },
    {
        "aircraft": {
            "ident": "AS1026",
            "type": "A320",
            "economySeats": 126,
            "base": "EGKK"
        },
        "flights": [],
        "getAircraftUsage": () => 0
    },
    {
        "aircraft": {
            "ident": "AS1027",
            "type": "A320",
            "economySeats": 186,
            "base": "EGKK"
        },
        "flights": [],
        "getAircraftUsage": () => 0
    },
    {
        "aircraft": {
            "ident": "AS1028",
            "type": "A320",
            "economySeats": 186,
            "base": "EGKK"
        },
        "flights": [],
        "getAircraftUsage": () => 0
    }
];