import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { FlightCard } from '../common';
import { Flight } from '../../models/models';

enum PaginationDirection {
    left,
    right
}

interface FlightsSectionProps {
    handleSelectedFlight: (flight: Flight) => void;
    flights?: Flight[];
}

const FlightsSection = ({ handleSelectedFlight, flights }: FlightsSectionProps) => {
    const [{ data: rawListOfFlights, loading: loadingRawListOfFlights, error: rawListOfFlightsError }] = useAxios(
        'http://localhost:3001/flights'
    );
    const [paginatedFlights, setPaginatedFlights] = useState<Flight[][] | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(0);

    // Clientside pagination since offset and pagelimit are not working from the API
    const paginate = (rawFlights: Flight[]) => {
        const localCopy = [...rawFlights];
        const pages = [];
        const pageLimit = 5;

        for (let i = 0; i < rawFlights.length; i = i + pageLimit) {
            const page = localCopy.slice(i, i + pageLimit);
            pages.push(page);
        }
        setPaginatedFlights(pages);
        setCurrentPage(0);
    }

    const handlePagination = (direction: PaginationDirection) => {
        if (paginatedFlights) {
            if (direction === PaginationDirection.left) {
                if (currentPage !== 0) {
                    setCurrentPage(currentPage - 1);
                }
            }

            if (direction === PaginationDirection.right) {
                if (currentPage !== paginatedFlights.length - 1) {
                    setCurrentPage(currentPage + 1);
                }
            }
        }
    }

    useEffect(() => {
        if (rawListOfFlights) {
            paginate(rawListOfFlights);
        }
    }, [rawListOfFlights]);

    useEffect(() => {
        if (flights && flights?.length !== 0 && rawListOfFlights) {
            const filtered = rawListOfFlights.filter((flight: Flight) => (
                    flights.indexOf(flight) === -1) &&
                flights[flights.length - 1].destination === flight.origin &&
                flight.departuretime > flights[flights.length - 1].arrivaltime + 1200
            );
            paginate(filtered);
        } else if (flights && flights?.length === 0 && rawListOfFlights) {
            paginate(rawListOfFlights);
        }
    }, [handleSelectedFlight]);

    return (
        <div className="flights-wrapper">
            <div className="panel-header">Flights</div>
            <div className="content">
                { loadingRawListOfFlights && (<p className="instructions">Loading Flights...</p>) }
                { rawListOfFlightsError && (
                    <p className="instructions">There was an error loading the Available Flights... Please Try again
                        later</p>) }
                { paginatedFlights && paginatedFlights[currentPage] && paginatedFlights[currentPage].map((flight: Flight) =>
                    <FlightCard key={ flight.ident } flight={ flight }
                                selectFlight={ () => handleSelectedFlight(flight) }/>) }
                { paginatedFlights && !paginatedFlights[currentPage] && (
                    <p className="instructions">There are no Flights possible for this Aircraft.</p>) }
                { paginatedFlights && paginatedFlights[currentPage] && (
                    <div className="pagination">
                        <FontAwesomeIcon className={ (currentPage + 1 === 1 ? 'disabled' : '') } icon={ faCaretLeft }
                                         onClick={ () => handlePagination(PaginationDirection.left) }/>
                        { currentPage + 1 }
                        <FontAwesomeIcon className={ (currentPage + 1 === paginatedFlights.length ? 'disabled' : '') }
                                         icon={ faCaretRight }
                                         onClick={ () => handlePagination(PaginationDirection.right) }/>
                    </div>
                ) }
            </div>
        </div>
    )
};

export default FlightsSection;