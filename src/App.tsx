import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useAxios from 'axios-hooks';

import './App.scss';
import { Aircraft, Itinerary } from './models/models';
import AircraftSection from './components/aircrafts-section/AircraftSection';


function App() {
    const tomorrow = moment().add(1, 'days').format('Do MMMM YYYY');
    const [{ data: aircrafts, error: aircraftsError }] = useAxios(
        'http://localhost:3001/aircrafts',
    );
    const [fullItinerary, setFullItinerary] = useState<Itinerary[] | undefined>([]);

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
                    <AircraftSection itineraries={fullItinerary} aircraftsError={aircraftsError} />
                </div>
            </div>
        </div>
    );
}

export default App;