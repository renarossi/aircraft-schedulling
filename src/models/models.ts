export interface Flight {
    ident: string,
    departuretime: number,
    arrivaltime: number,
    readable_departure: string,
    readable_arrival: string,
    origin: string,
    destination: string
}

export interface Aircraft {
    ident: string,
    type: string,
    economySeats: number,
    base: string;
}

export class Itinerary {
    aircraft: Aircraft;
    flights: Flight[];

    constructor(aircraft: Aircraft) {
        this.aircraft = aircraft;
        this.flights = [];
    }

    getAircraftUsage(): string {
        console.log('getAircraftUsage Triggered');
        let overallUsage = 0;
        if (this.flights.length === 0) {
            return overallUsage.toString();
        } else {
            for (let i = 0; i < this.flights.length; i++) {
                overallUsage = overallUsage + this.flights[i].arrivaltime - this.flights[i].departuretime;
            }
            const percentage = (100 * overallUsage) / 84000; // Consider the 40 Minutes Ground rule over 00:00
            return percentage.toFixed(2);
        }
    }
}

export enum BlockType {
    Idle = 'idle',
    Scheduled = 'scheduled',
    Turnaround = 'turnaround'
}

export class Block {
    width: number;
    type: BlockType;

    constructor(width: number, type: BlockType) {
        this.width = width;
        this.type = type;
    }
}

