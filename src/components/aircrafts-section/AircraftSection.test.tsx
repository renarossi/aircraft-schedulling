import { render, within } from '@testing-library/react';

import AircraftSection from './AircraftSection';
import { mockedItineraries } from './_mocks/aircrafts-mocks';

describe('AircraftSection', () => {
    test('Render Loading State', () => {
        const renderComponent = () => (render(<AircraftSection
            setItinerary={ () => {
            } }/>));
        const { getByText } = renderComponent();
        const loadingText = getByText('Loading Aircrafts...');

        expect(loadingText).toBeInTheDocument();
    });

    test('Render Aircrafts List', () => {
        const renderComponent = () => (render(<AircraftSection setItinerary={ () => {
        } } itineraries={ mockedItineraries }/>))
        const { getByTestId } = renderComponent();

        const aircraftOne = getByTestId('aircraft-card-AS1001');
        expect(aircraftOne).toBeInTheDocument();

        const aircrafOnetUsage = within(aircraftOne).getByTestId('aircraft-usage');
        expect(aircrafOnetUsage).toHaveTextContent('Aircraft Usage: 30%');

        const aircraftTwo = getByTestId('aircraft-card-AS1027');
        expect(aircraftTwo).toBeInTheDocument();

        const aircrafTwotUsage = within(aircraftTwo).getByTestId('aircraft-usage');
        expect(aircrafTwotUsage).toHaveTextContent('Aircraft Usage: 0%');
    });

    test('Render Error State', () => {
        const renderComponent = () => (render(<AircraftSection
            setItinerary={ () => {
            } } aircraftsError={ { error: 'Some error' } }/>));
        const { getByText } = renderComponent();
        const errorText = getByText('There was an error loading the Aircrafts... Please Try again later');

        expect(errorText).toBeInTheDocument();
    });
});