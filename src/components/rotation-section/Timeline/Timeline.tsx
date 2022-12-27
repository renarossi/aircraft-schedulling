import { Block, Flight } from '../../../models/models';

interface TimelineProps {
    flights?: Flight[];
    timeBlocks: Block[];
}

const Timeline = ({ flights, timeBlocks }: TimelineProps) => {
    return (
        <div className="timeline-wrapper">
            <div className="timeline">
                <div className="line">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </div>
            <div className="timeline-blocks">
                {flights && (
                    <>
                        <div style={{ width: '1.38%' }} className="turnaround" />
                        {/*{timeBlocks.map((block: Block, index) => (<div key={index} style={{ width: `${block.width}%`}} className={block.type} /> ))}*/}
                        <div style={{ width: '1.38%' }} className="turnaround" />
                    </>
                )}
            </div>
        </div>
    )
};

export default Timeline;