// import React from 'react';
// import Calendar from 'rsuite/Calendar';


// const CalendarWithEvents = ({ dateOfJoining, lastRentPaid }) => {
//   const isMonthEnd = (date) => {
//     const nextDay = new Date(date);
//     nextDay.setDate(date.getDate() + 1);
//     return nextDay.getMonth() !== date.getMonth();
//   };

//   const getRentDueDate = (date) => {
//     const dueDate = new Date(date);
//     dueDate.setMonth(dueDate.getMonth() + 1);
//     dueDate.setDate(dateOfJoining.getDate());
//     return dueDate;
//   };

//   const isRentOverdue = (date) => {
//     const today = new Date();
//     const rentDueDate = getRentDueDate(lastRentPaid);
//     return date >= rentDueDate && date <= today;
//   };

//   function renderCell(date) {
//     const isEnd = isMonthEnd(date);
//     const isOverdue = isRentOverdue(date);
//     const rentDueDate = getRentDueDate(lastRentPaid);

//     let cellStyle = {};
//     if (isEnd) {
//       cellStyle.backgroundColor = '#ffe6b3'; // Light yellow for month-end
//     }
//     if (isOverdue) {
//       cellStyle.backgroundColor = '#ffcccc'; // Light red for overdue
//     }

//     let cellContent = [];

//     if (date.getTime() === rentDueDate.getTime()) {
//       cellContent.push(
//         <div key="rent-due" style={{ color: 'red', fontWeight: 'bold' }}>
//           Rent Due
//         </div>
//       );
//     }

//     if (isEnd) {
//       cellContent.push(
//         <div key="month-end" style={{ color: 'blue', fontWeight: 'bold' }}>
//           Month End
//         </div>
//       );
//     }

//     return (
//       <div style={cellStyle}>
//         {cellContent}
//       </div>
//     );
//   }

//   return <Calendar bordered renderCell={renderCell} />;
// };

// export default CalendarWithEvents;



function CalendarWithEvents() {
  return (
    <div>CalendarWithEvents</div>
  )
}

export default CalendarWithEvents