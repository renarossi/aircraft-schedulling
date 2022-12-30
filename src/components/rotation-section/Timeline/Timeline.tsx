import { Block, BlockType, Flight, Itinerary } from '../../../models/models';

interface TimelineProps {
    itinerary?: Itinerary;
}

const Timeline = ({ itinerary }: TimelineProps) => {
    const renderBlocks = (timeBlocks: Block[]) => {
        return timeBlocks.map((block: Block, index) => <div key={ index } data-testid={`${block.type}`} style={ { width: `${ block.width }%` } }
                                                            className={ block.type }/>)
    }

    const calculateBlocks = (flights?: Flight[]) => {
        const timeBlocks: Block[] = [];

        let remaining = 84000;

        const calculatePercentage = (time: number) => {
            remaining = remaining - time;
            return time / 86400 * 100;
        };

        const constructBlock = (time: number, type: BlockType) => {
            return new Block(
                calculatePercentage(time),
                type
            );
        };

        if (flights && flights.length === 0) {
            timeBlocks.push(
                constructBlock(84000, BlockType.Idle)
            );
        } else if (flights && flights.length !== 0) {
            for (let i = 0; i < flights.length; i++) {
                // Time to First Flight
                if (i === 0) {
                    timeBlocks.push(
                        constructBlock(flights[i].departuretime, BlockType.Idle)
                    );
                } else {
                    // Time between previous Flight and Actual Flight
                    const previousFlightTime = flights[i].departuretime - flights[i - 1].arrivaltime;
                    timeBlocks.push(
                        constructBlock(previousFlightTime, BlockType.Idle)
                    );
                }

                // Actual Flight
                const actualFlightTime = flights[i].arrivaltime - flights[i].departuretime;
                timeBlocks.push(
                    constructBlock(actualFlightTime, BlockType.Scheduled)
                );

                // Turnaround Time
                timeBlocks.push(
                    constructBlock(1200, BlockType.Turnaround)
                )
            }

            // Remaining Time Block
            timeBlocks.push(
                constructBlock(remaining, BlockType.Idle)
            )
        }
        return renderBlocks(timeBlocks);
    }

    return (
        <div className="timeline-wrapper">
            <div className="timeline">
                <div className="line">
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                </div>
            </div>
            <div className="timeline-blocks" data-testid="timeline-blocks">
                { itinerary && (
                    <>
                        <div style={ { width: '1.38%' } } className="turnaround"/>
                        { calculateBlocks(itinerary.flights) }
                        <div style={ { width: '1.38%' } } className="turnaround"/>
                    </>
                ) }
            </div>
        </div>
    )
};

export default Timeline;