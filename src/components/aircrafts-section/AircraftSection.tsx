import { AxiosError } from 'axios';

// import AircraftCard from './aircraft-card/AircraftCard';
import { Itinerary } from '../../models/models';
import AircraftCard from './aircraft-card/AircraftCard';

interface AircraftSectionProps {
    itineraries?: Itinerary[];
    aircraftsError?: AxiosError | null;
}

const AircraftSection = ({ itineraries, aircraftsError }: AircraftSectionProps) => {
    return (
        <div className="aircrafts-wrapper">
            <div className="panel-header">Aircrafts</div>
            <div className="content">
                { aircraftsError && (<p className="instructions">There was an error loading the Aircrafts... Please Try again later</p>)}
                { !itineraries && (<p className="instructions">Loading Aircrafts...</p>) }
                { itineraries && itineraries.map((itinerary: Itinerary) => <AircraftCard key={itinerary.aircraft.ident} itinerary={itinerary} selectItinerary={(selectedItinerary) => console.log(selectedItinerary)} isSelected={false} />)}
            </div>
        </div>
    )
};

export default AircraftSection;