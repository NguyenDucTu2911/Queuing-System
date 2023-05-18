import React, { useState } from 'react';
import './Calendar.scss';

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const getDaysInMonth = (year: number, month: number) => {
            return new Date(year, month + 1, 0).getDate();
        };

        const getDayOfWeek = (year: number, month: number, day: number) => {
            return new Date(year, month, day).getDay();
        };

        const handleDayClick = (day: number) => {
            const clickedDate = new Date(year, month, day);
            handleDateChange(clickedDate);
        };

        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfWeek = getDayOfWeek(year, month, 1);
        const calendar: JSX.Element[] = [];

        // Render days of the week
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekDays = daysOfWeek.map((dayOfWeek) => (
            <div className="calendar-date" key={dayOfWeek}>
                <span className='days'>{dayOfWeek}</span>
            </div>
        ));

        // Render empty cells for the days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            calendar.push(<div className="calendar-day empty" key={`empty-${i}`} />);
        }

        // Render the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfWeek = getDayOfWeek(year, month, day);
            const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;
            const isCurrentDate =
                currentDate.getDate() === day && currentDate.getMonth() === month && currentDate.getFullYear() === year;
            const dayClassName = `calendar-day ${isSelected ? 'selected' : ''} ${isCurrentDate ? 'current-date' : ''}`;

            calendar.push(
                <div className={dayClassName} key={day} onClick={() => handleDayClick(day)}>
                    <span>{day}</span>
                </div>
            );
        }

        return [...weekDays, ...calendar];
    };

    const handleMonthChange = (amount: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + amount);
            return newDate;
        });
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button className="btn-prev" onClick={() => handleMonthChange(-1)}>
                    <i className="fa-solid fa-chevron-left" style={{ color: "#22511f" }} ></i>
                </button>
                <h2 className='calendar-body'> {`${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`}</h2>
                <button className="btn-next" onClick={() => handleMonthChange(1)}>
                    <i className="fa-solid fa-chevron-right" style={{ color: "#22511f" }}></i>
                </button>
            </div>
            <div className="calendar-grid">{renderCalendar()}</div>
        </div>
    );
};

export default Calendar;
