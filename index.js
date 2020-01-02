// Your code here
function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord)
}

function createTimeInEvent(record, timeIn) {
  let timeInEvent = parseTime(timeIn, 'TimeIn')
  let newRecord = updateRecord(record, timeInEvent, 'timeInEvents')

  return newRecord
}

function createTimeOutEvent(record, timeOut) {
  let timeOutEvent = parseTime(timeOut, 'TimeOut')
  let newRecord = updateRecord(record, timeOutEvent, 'timeOutEvents')

  return newRecord
}

function parseTime(time, type) {
  let timeArr = time.split(' ')
  let date = timeArr[0]
  let hour = parseInt(timeArr[1])

  return { type, date, hour }
}

function updateRecord(record, timeEvent, eventType) {
  record[eventType].push(timeEvent)

  return record
}

function hoursWorkedOnDate(record, date) {
  let timeInEvent = record.timeInEvents.find(event => event.date === date)
  let timeOutEvent = record.timeOutEvents.find(event => event.date === date)
  
  return (timeOutEvent.hour - timeInEvent.hour)/100
}

function wagesEarnedOnDate(record, date) {
  let hours = hoursWorkedOnDate(record, date)

  return hours * record.payPerHour
}

function allWagesFor(record) {
  let reducer = function(totalWages, event) {
    let dailyWages = wagesEarnedOnDate(record, event.date)

    return totalWages + dailyWages
  }

  return record.timeInEvents.reduce(reducer, 0)
}

function calculatePayroll(records) {
  let reducer = function(totalWages, record) {
    let employeeWages = allWagesFor(record)

    return totalWages + employeeWages
  }
  
  return records.reduce(reducer, 0)
}

function findEmployeeByFirstName(records, name) {
  return records.find(record => record.firstName === name )
}