import * as React from 'react';
import moment, { Moment } from 'moment';
import DayView, { DayViewProps } from '../DayView';

interface MonthViewProps {
    daysNames: string[];
    cMoment: Moment;
    selectDay: (selectedDay: number) => void;
    selectedDay: string;
    selectedMonth: string;
    selectedYear: string;
    sideLength: number;
}

const MonthView: React.SFC<MonthViewProps> = ({ daysNames, cMoment, selectDay, selectedDay, selectedMonth, selectedYear, sideLength }) => {
    const firstDay = getFirstDayOfMonth(cMoment);
    const offset = getHowManyBlankDays(daysNames, firstDay);
    const currentDay = moment().date()
    const currentMonth = moment().month();
    const currentYear = moment().year();

    const numberOfDays = cMoment.daysInMonth()

    const isCurrentMonthAndYear = cMoment.month() === currentMonth &&
        cMoment.year() === currentYear

    const selectedMonthAndYear = String(cMoment.format('MM')) === selectedMonth &&
        String(cMoment.format('YYYY')) === selectedYear
    const days = createDays(numberOfDays, offset);
    return (
        <div style={{ width: 7 * (sideLength+1), display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' }}>
            {
                days.map((day, index) =>
                    <DayView
                        sideLength={sideLength}
                        key={String(day) + index}
                        isToday={day === currentDay && isCurrentMonthAndYear}
                        isSelectedDay={day === Number(selectedDay) && selectedMonthAndYear}
                        day={day}
                        onSelectDay={selectDay} />
                )
            }
        </div>
    )
};

function createDays(numberOfDays: number, offset: number) {
    const days = [];
    for (let i = 0; i < offset; i++) {
        days.push('')
    }
    for (let i = 0; i < numberOfDays; i++) {
        days.push(i + 1);
    }
    if(numberOfDays + offset>35){

    }
    return days;
}

function getFirstDayOfMonth(moment: Moment) {
    const startOfMonth = moment.startOf('month').format('ddd');
    return startOfMonth
}

function getHowManyBlankDays(daysNames: string[], firstDay: string) {
    return daysNames.indexOf(firstDay);
}

export default MonthView;