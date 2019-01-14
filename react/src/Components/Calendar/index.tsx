import * as React from 'react';
import moment, { Moment } from 'moment';
import DaysTopView from '../DaysTopView';
import MonthView from '../MonthView';

const EnglishDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const sideLength = 60;

export interface CalendarProps {
    showYearNumber?: boolean;
    showMonthName?: boolean;
    showNavigateMonths?: boolean;
    showSelectedDayInfo?: boolean
}

interface CalendarState {
    cMoment: Moment;
    selectedDay: string;
    selectedMonth: string;
    selectedYear: string;
}

export default class Calendar extends React.PureComponent<CalendarProps, CalendarState> {
    static defaultProps = {
        showYearNumber: true,
        showMonthName: true,
        showNavigateMonths: true,
        showSelectedDayInfo: true
    }

    state = {
        cMoment: moment().locale('en'),
        selectedDay: moment().locale('en').format('DD'),
        selectedMonth: moment().locale('en').format('MM'),
        selectedYear: moment().locale('en').format('YYYY'),
    }

    increaseMonth = () => {
        const { cMoment } = this.state;
        const modifiedMoment = moment(cMoment);
        this.setState({ cMoment: modifiedMoment.add(1, 'M') });
    }

    decreaseMonth = () => {
        const { cMoment } = this.state;
        const modifiedMoment = moment(cMoment);
        this.setState({ cMoment: modifiedMoment.add(-1, 'M') });
    }

    selectDay = (selectedDay: number) => {
        this.setState({
            selectedDay: String(selectedDay),
            selectedMonth: this.state.cMoment.locale('en').format('MM'),
            selectedYear: this.state.cMoment.locale('en').format('YYYY'),
        });
    }

    render() {
        const { showMonthName, showNavigateMonths, showSelectedDayInfo, showYearNumber } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                {showYearNumber && <YearNumber
                    cMoment={this.state.cMoment}
                />}
                {showMonthName && <MonthName
                    cMoment={this.state.cMoment}
                />}
                <DaysTopView
                    sideLength={sideLength}
                    daysNames={EnglishDaysNames}
                />
                <MonthView
                    sideLength={sideLength}
                    selectDay={this.selectDay}
                    selectedDay={this.state.selectedDay}
                    selectedMonth={this.state.selectedMonth}
                    selectedYear={this.state.selectedYear}
                    cMoment={this.state.cMoment}
                    daysNames={EnglishDaysNames}
                />
                {showNavigateMonths && <NavigateMonths
                    increaseMonth={this.increaseMonth}
                    decreaseMonth={this.decreaseMonth}
                />}
                {showSelectedDayInfo && <SelectedDayInfo
                    selectedDay={this.state.selectedDay}
                    selectedMonth={this.state.selectedMonth}
                    selectedYear={this.state.selectedYear} />}
            </div>

        );
    }
}

const SelectedDayInfo = ({ selectedDay, selectedMonth, selectedYear }: { selectedDay: string, selectedMonth: string, selectedYear: string }) => {
    return (
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
            {`${selectedDay}/${selectedMonth}/${selectedYear}`}
        </div>
    )
}

const MonthName = ({ cMoment }: { cMoment: Moment }) => {
    return <div style={{ textAlign: 'center' }}> {EnglishDaysNames[Number(cMoment.format('M')) - 1]} </div>
}

const YearNumber = ({ cMoment }: { cMoment: Moment }) => {
    return <div style={{ textAlign: 'center' }}> {cMoment.year()} </div>
}

const NavigateMonths = ({ increaseMonth, decreaseMonth }: { increaseMonth: () => void, decreaseMonth: () => void }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: 50, justifyContent: 'space-between', alignSelf: 'center', marginBottom: 20 }}>
            <div onClick={decreaseMonth}>&lt;</div>
            <div onClick={increaseMonth}>&gt;</div>
        </div>
    )
}