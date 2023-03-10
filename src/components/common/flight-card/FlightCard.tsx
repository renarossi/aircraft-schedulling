import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Arrow from './Arrow';
import { Flight } from '../../../models/models';

interface FlightCardProps {
    showDeleteIcon?: boolean;
    flight: Flight;
    selectFlight?: () => void;
    deleteFlight?: () => void;
}

const FlightCard = ({showDeleteIcon, flight, selectFlight, deleteFlight}: FlightCardProps) => {
    return (
        <div className="flight-card" data-testid={`flight-card-${flight.ident}`} onClick={() => {if (selectFlight) {selectFlight()}}}>
            <div className="flight-number">
                <b>Flight:</b>{flight.ident}
                {showDeleteIcon && (
                    <div className="delete" onClick={() => {if (deleteFlight) {deleteFlight()}}}><FontAwesomeIcon icon={faTrash} /></div>
                )}
            </div>
            <div className="departure">
                <div className="airport" data-testid="departure-airport">{flight.origin}</div>
                <div className="time" data-testid="departure-time">{flight.readable_departure}</div>
            </div>
            <Arrow />
            <div className="arrival">
                <div className="airport" data-testid="arrival-airport">{flight.destination}</div>
                <div className="time" data-testid="arrival-time">{flight.readable_arrival}</div>
            </div>
        </div>
    )
};

export default FlightCard;