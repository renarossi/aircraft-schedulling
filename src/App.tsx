import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useAxios from 'axios-hooks';

import './App.scss';
import { Aircraft, Flight, Itinerary } from './models/models';
import { AircraftSection } from './components/aircrafts-section';
import { FlightsSection } from './components/flights-section';
import { RotationSection } from './components/rotation-section';


function App() {
    const tomorrow = moment().add(1, 'days').format('Do MMMM YYYY');
    const [{ data: aircrafts, error: aircraftsError }] = useAxios(
        'https://ec304ac5-ce38-44c1-bcf9-2a5b1a5b09a1.mock.pstmn.io/aircrafts',
    );

    const [fullItinerary, setFullItinerary] = useState<Itinerary[] | undefined>([]);
    const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | undefined>();

    const handleFullItinerary = () => {
        const newFullItinerary = [...fullItinerary ?? []];
        const findIndexOfItinerary = newFullItinerary.findIndex((itinerary: Itinerary) => itinerary.aircraft.ident === selectedItinerary?.aircraft.ident);
        if (selectedItinerary instanceof Itinerary) {
            newFullItinerary[findIndexOfItinerary] = selectedItinerary;
        }
        setFullItinerary(newFullItinerary);
    }

    const insertFlightInItinerary = (flight: Flight) => {
        setSelectedItinerary((prevState) => {
            const newState = prevState;
            newState?.flights.push(flight);
            return newState
        });

        handleFullItinerary();
    }

    const deleteFlightFromItinerary = () => {
        setSelectedItinerary((prevState) => {
            const newState = prevState;
            newState?.flights.pop();
            return newState;
        });

        handleFullItinerary();
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
                    <RotationSection itinerary={ selectedItinerary }
                                     handleFlightDelete={ () => deleteFlightFromItinerary() }/>
                    <FlightsSection flights={ selectedItinerary?.flights }
                                    handleSelectedFlight={ (flight: Flight) => insertFlightInItinerary(flight) }/>
                </div>
            </div>
        </div>
    );
}

export default App;