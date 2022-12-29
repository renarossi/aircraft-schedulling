import { render, within } from '@testing-library/react';

import Timeline from './Timeline';
import { MockedEmptyItinerary, MockedItineraryForTimeline } from '../_mocks/timeline-mocks';

describe('Timeline', () => {
    test('Render no blocks', () => {
        const renderComponent = () => (render(<Timeline/>));
        const { getByTestId } = renderComponent();

        const timelineBlocks = getByTestId('timeline-blocks');
        expect(timelineBlocks).toBeEmptyDOMElement();
    });

    test('Render Mandatory Turnaround', () => {
        const renderComponent = () => (render(<Timeline itinerary={ MockedEmptyItinerary }/>));
        const { getByTestId } = renderComponent();

        const timelineBlocks = getByTestId('timeline-blocks');
        expect(timelineBlocks.children.length).toBe(3);

        const idleBlock = within(timelineBlocks).getByTestId('idle');
        expect(idleBlock).toBeInTheDocument();

    });

    test('Render All Itinerary Blocks', () => {
        const renderComponent = () => (render(<Timeline itinerary={ MockedItineraryForTimeline }/>));
        const { getByTestId, queryAllByTestId } = renderComponent();

        const timelineBlocks = getByTestId('timeline-blocks');
        expect(timelineBlocks.children.length).toBe(12);

        const idleBlocks = within(timelineBlocks).queryAllByTestId('idle');
        expect(idleBlocks.length).toBe(4);

        const scheduledBlocks = within(timelineBlocks).queryAllByTestId('scheduled');
        expect(scheduledBlocks.length).toBe(3);

        const turnAroundBlocks = within(timelineBlocks).queryAllByTestId('turnaround');
        expect(turnAroundBlocks.length).toBe(3);
    });
});