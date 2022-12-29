import { Itinerary } from '../../../models/models';

interface AircraftCardProps {
    itinerary: Itinerary;
    selectItinerary: (itinerary: Itinerary) => void;
    isSelected: boolean;
}

const AircraftCard = ({ selectItinerary, isSelected, itinerary }: AircraftCardProps) => {
    return (
        <div className={ (isSelected ? 'aircraft-card selected' : 'aircraft-card') }
             data-testid={`aircraft-card-${itinerary.aircraft.ident}`}
             onClick={ () => selectItinerary(itinerary) }>
            <div className="aircraft-name">{ itinerary.aircraft.type } - { itinerary.aircraft.economySeats }</div>
            <div className="aircraft-usage" data-testid="aircraft-usage">Aircraft Usage: <b className={ (itinerary.getAircraftUsage() <= 20 ? 'underused' : '') }>{ `${ itinerary.getAircraftUsage().toFixed(0) }%` }</b></div>
        </div>
    )
};

export default AircraftCard;