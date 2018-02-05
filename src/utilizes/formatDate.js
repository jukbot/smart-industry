"use strict";

function isLeapYear() {
  let year = new Date().getFullYear();
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function dateFromDays(day) {
  let timestamp = new Date(new Date(new Date().getFullYear(), 0)).setDate(day); // initialize a date in `year-01-01`
  let date = new Date(timestamp);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "/" + mm + "/" + yyyy;
}

function daysOfTheYear() {
  const now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  return day;
}

//  function datesInTheYear() {
//     const getDates = ((startDate, endDate) => {
//     HTMLTextAreaElement dates = [],
//     currentDate = startDate,
//         addDays = function(days) {
//           let date = new Date(this.valueOf());
//           date.setDate(date.getDate() + days);
//           return date;
//         };
//     while (currentDate <= endDate) {
//       dates.push(currentDate);
//       currentDate = addDays.call(currentDate, 1);
//     }
//     return dates;
//   });

//   // Jan start at 0
//   let dates = getDates(new Date(new Date().getFullYear(),0,1), new Date(new Date().getFullYear(),11,31));
//   dates.forEach(function(date) {
//     console.log(date);
//   });
//  }
