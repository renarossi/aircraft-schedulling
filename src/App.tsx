import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useAxios from 'axios-hooks';

import './App.scss';
import { Aircraft, Flight, Itinerary } from './models/models';
import { AircraftSection } from './components/aircrafts-section';
import { FlightsSection } from './components/flights-section';


function App() {
    const tomorrow = moment().add(1, 'days').format('Do MMMM YYYY');
    const [{ data: aircrafts, error: aircraftsError }] = useAxios(
        'http://localhost:3001/aircrafts',
    );

    const [fullItinerary, setFullItinerary] = useState<Itinerary[] | undefined>([]);
    const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | undefined>();

    const insertFlightInItinerary = (flight: Flight) => {
        console.log('insertFlightInItinerary', flight);
        // setSelectedItinerary((prevState) => {
        //     prevState?.flights.push(flight);
        //     return prevState
        // });
        //
        // setFullItinerary((prevState) => {
        //     const porra = [...prevState ?? [], selectedItinerary];
        //     console.log(porra);
        //     return prevState;
        // });
    }

    useEffect(() => {
        if (aircrafts) {
            const fullItinerary = aircrafts.reduce((acc: Itinerary[], current: Aircraft) => [...acc, new Itinerary(current)], []);
            setFullItinerary(fullItinerary);
        }
    }, [aircrafts]);

    return (
        <div className="App">
            <div className="content-wrapper">
                <div className="itinerary-header">{ tomorrow }</div>
                <div className="panels-wrapper">
                    <AircraftSection itineraries={ fullItinerary } aircraftsError={ aircraftsError }
                                     setItinerary={ (selectedItinerary: Itinerary) => setSelectedItinerary(selectedItinerary) }/>
                    <FlightsSection flights={selectedItinerary?.flights} handleSelectedFlight={(flight: Flight) => insertFlightInItinerary(flight)} />
                </div>
            </div>
        </div>
    );
}

export default App;