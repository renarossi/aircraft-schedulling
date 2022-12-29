import { render, within } from '@testing-library/react';

import { RotationSection } from './index';
import { MockedEmptyItinerary, MockedItinerary } from './_mocks/timeline-mocks';

describe('RotationSection', () => {
   test('Render No Aircraft Selected State', () => {
       const renderComponent = () => (render(<RotationSection handleFlightDelete={() => {}} />));
       const { getByText } = renderComponent();

       const noAircraftText = getByText('No Aircraft selected. Please select an Aircraft on the left.');
       expect(noAircraftText).toBeInTheDocument();
   });

   test('Render No Flight Selected State', () => {
       const renderComponent = () => (render(<RotationSection handleFlightDelete={() => {}} itinerary={MockedEmptyItinerary} />));
       const { getByText } = renderComponent();

       const noFlightsText = getByText('No Flights selected. Please select a Flight on the right.');
       expect(noFlightsText).toBeInTheDocument();
   });

   test('Render Itinerary', () => {
      const renderComponent = () => (render(<RotationSection handleFlightDelete={() => {}} itinerary={MockedItinerary} />));
      const { getByTestId } = renderComponent();

      const rotationSection = getByTestId('rotation-section');
      expect(rotationSection.children.length).toBe(4); // 3 Flights + Timeline Element

       const firstFlight = within(rotationSection).getByTestId('flight-card-AS1027');
       expect(firstFlight).toBeInTheDocument();

       const secondFlight = within(rotationSection).getByTestId('flight-card-AS1028');
       expect(secondFlight).toBeInTheDocument();

       const thirdFlight = within(rotationSection).getByTestId('flight-card-AS1133');
       expect(thirdFlight).toBeInTheDocument();
   });
});