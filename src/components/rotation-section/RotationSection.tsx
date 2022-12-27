import { FlightCard } from '../common';
import { Itinerary } from '../../models/models';

interface RotationSectionProps {
    itinerary?: Itinerary;
    handleFlightDelete: () => void;
}

const RotationSection = ({ itinerary, handleFlightDelete }: RotationSectionProps) => {
    return (
        <div className="rotation-wrapper">
            <div className="panel-header">
                {/*Rotation { itinerary && `${itinerary.aircraft.type} - ${itinerary.aircraft.economySeats}`}*/ }
                Rotation
            </div>
            <div className="content">
                { !itinerary && (
                    <p className="instructions">No Aircraft selected. Please select an Aircraft on the left.</p>) }
                { itinerary && !itinerary.flights.length && (
                    <p className="instructions">No Flights selected. Please select a Flight on the right.</p>) }
                { itinerary && itinerary.flights.map((flight, index) => <FlightCard key={ flight.ident }
                                                                                    showDeleteIcon={ (index === itinerary.flights.length - 1) }
                                                                                    flight={ flight }
                                                                                    deleteFlight={ () => handleFlightDelete() }/>) }
                {/*<Timeline timeBlocks={timeBlocks} flights={itinerary?.flights} />*/ }
            </div>
        </div>
    )
};

export default RotationSection;