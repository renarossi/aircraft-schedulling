import { AxiosError } from 'axios';

import { Itinerary } from '../../models/models';
import AircraftCard from './aircraft-card/AircraftCard';
import { useState } from 'react';

interface AircraftSectionProps {
    itineraries?: Itinerary[];
    aircraftsError?: AxiosError | null;
    setItinerary: (selectedItinerary: Itinerary) => void;
}

const AircraftSection = ({ itineraries, aircraftsError, setItinerary }: AircraftSectionProps) => {
    const [selectedItinerary, setSelecteItinerary] = useState<Itinerary | undefined>();

    const handleItinerarySelection = (selectedItinerary: Itinerary) => {
        setSelecteItinerary(selectedItinerary);
        setItinerary(selectedItinerary);
    }

    return (
        <div className="aircrafts-wrapper">
            <div className="panel-header">Aircrafts</div>
            <div className="content">
                { aircraftsError && (
                    <p className="instructions">There was an error loading the Aircrafts... Please Try again
                        later</p>) }
                { !itineraries && (<p className="instructions">Loading Aircrafts...</p>) }
                { itineraries && itineraries.map((itinerary: Itinerary) => <AircraftCard
                    key={ itinerary.aircraft.ident } itinerary={ itinerary }
                    selectItinerary={ (selectedItinerary) => handleItinerarySelection(selectedItinerary) }
                    isSelected={ (selectedItinerary?.aircraft.ident === itinerary.aircraft.ident) }/>) }
            </div>
        </div>
    )
};

export default AircraftSection;