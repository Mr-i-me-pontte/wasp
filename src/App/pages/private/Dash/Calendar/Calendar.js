// const eventsData = [
//     {
//         title: 'Event 1',
//         date: new Date(2023, 6, 15), // July 15, 2023
//     },
//     {
//         title: 'Event 2',
//         date: new Date(2023, 6, 20), // July 20, 2023
//     },
//     // Add more events as needed
// ];
// const MyCalendar = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//
//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//     };
//
//     const tileContent = ({ date }) => {
//         const eventDates = eventsData.map((event) => event.date);
//         return eventDates.some((eventDate) => isSameDay(eventDate, date)) ? (
//             <div className="event-marker">•</div>
//         ) : null;
//     };
//
//     return (
//         <div>
//             <h1>My Calendar</h1>
//             <Calendar
//                 onChange={handleDateChange}
//                 value={selectedDate}
//                 tileContent={tileContent}
//             />
//         </div>
//     );
// };
// const tileContent = ({ date }) => {
//     const eventDates = eventsData.map((event) => event.date);
//     const hasEvent = eventDates.some((eventDate) => isSameDay(eventDate, date));
//
//     return hasEvent ? (
//         <div className="event-marker" onClick={() => handleEventClick(date)}>
//             •
//         </div>
//     ) : null;
// };
