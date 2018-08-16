/* eslint no-invalid-this: "error" */
/* eslint-env es6 */
// @ts-check

/**
 * Return boolean
 * @function
 * @return {boolean} - The title of the book.
 */
function isLeapYear () {
  let year = new Date().getFullYear()
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}

/**
 * Get date format from day of the year.
 * @function
 * @param {number} day
 * @return {string}
 */
function dateFromDays (day) {
  let timestamp = new Date(new Date(new Date().getFullYear(), 0)).setDate(day) // initialize a date in `year-01-01`
  return dateFromTimeStamp(timestamp)
}

/**
 * Get date format from timestamp in millisec.
 * @function
 * @param {number} timestamp
 * @return {string}
 */
function dateFromTimeStamp (timestamp) {
  let date = new Date(timestamp)
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  let yyyy = date.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return yyyy + '-' + mm + '-' + dd
}

/**
 * Get day of the year
 * @function
 * @return {number}
 */
function daysOfTheYear () {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  return day
}

/**
 *
 * @function
 * @param {number} timestamp -
 * @return {string}
 */
function datesInThisYear () {
  const getDates = (startDate, endDate) => {
    let dates = []
    let currentDate = startDate
    let addDays = function (days) {
      let date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  // Jan start at 0
  let dates = getDates(
    new Date(new Date().getFullYear(), 0, 1),
    new Date(new Date().getFullYear(), 11, 31)
  )
  return dates
}
