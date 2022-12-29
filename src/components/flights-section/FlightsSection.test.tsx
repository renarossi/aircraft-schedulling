import { render, waitFor } from '@testing-library/react';
import useAxios from 'axios-hooks';
jest.mock('axios-hooks');

import { FlightsSection } from './index';
import { mockedFlights } from './_mocks/flights-mocks';

describe('FlightsSection', () => {
    test('Render Loading State', () => {
        // @ts-ignore
        useAxios.mockReturnValue([{ loading: true, error: null}]);
        const renderComponent = () => (render(<FlightsSection handleSelectedFlight={ () => {
        } }/>));
        const { getByText } = renderComponent();

        const loadingText = getByText('Loading Flights...');
        expect(loadingText).toBeInTheDocument();
    });

    test('Render Error State', () => {
        // @ts-ignore
        useAxios.mockReturnValue([{error: 'Some Error'}]);
        const renderComponent = () => (render(<FlightsSection handleSelectedFlight={ () => {
        } }/>));
        const { getByText } = renderComponent();

        const errorText = getByText('There was an error loading the Available Flights... Please Try again later');
        expect(errorText).toBeInTheDocument();
    });

    test('Load Flights List', () => {
        // @ts-ignore
        useAxios.mockReturnValue([{data: mockedFlights}]);
        const renderComponent = () => (render(<FlightsSection handleSelectedFlight={ () => {
        } }/>));
        const { getByTestId } = renderComponent();

        const previousPageBtn = getByTestId('previous-page-btn');
        expect(previousPageBtn).toHaveClass('disabled');

        const pageCounter = getByTestId('page-counter');
        expect(pageCounter).toHaveTextContent('1');
    });

    test('Select Flights', () => {
        // @ts-ignore
        useAxios.mockReturnValue([{data: mockedFlights}]);
        const renderComponent = () => (render(<FlightsSection handleSelectedFlight={ () => {
        } }/>));
        const { getByTestId, getByText } = renderComponent();

        const firstFlight = getByTestId('flight-card-AS1001');
        firstFlight.click();

        waitFor(() => {
            const secondFlight = getByTestId('flight-card-AS1002');
            secondFlight.click();
        });

        const thirdFlight = getByTestId('flight-card-AS1027');
        thirdFlight.click();

        waitFor(() => {
            const fourthFlight = getByTestId('flight-card-AS1028');
            fourthFlight.click();
        });

        waitFor(() => {
            const fifthFlight = getByTestId('flight-card-AS1081');
            fifthFlight.click();
        });

        waitFor(() => {
            const noMoreFlights = getByText('There are no Flights possible for this Aircraft.');
            expect(noMoreFlights).toBeInTheDocument();
        });
    });
});