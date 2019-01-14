import * as React from 'react';

export interface DayViewProps {
    day: React.ReactText;
    isToday: boolean;
    onSelectDay: (day: number) => void;
    isSelectedDay: boolean;
    sideLength: number;
}

const DayView: React.SFC<DayViewProps> = ({ day, isToday, onSelectDay, isSelectedDay, sideLength }) => {
    
    return <div style={{
        width: sideLength,
        height: sideLength,
        fontWeight: isToday ? 'bold' : undefined,
        borderWidth: isToday ? '1px' : undefined,
        backgroundColor: isToday ? 'grey' : undefined,
        borderRadius: sideLength/2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: isSelectedDay? 'underline': undefined
    }}
        onClick={() => { day && onSelectDay(Number(day)) }} >
        <span>
            {day}
        </span>
    </div>
};

export default DayView;