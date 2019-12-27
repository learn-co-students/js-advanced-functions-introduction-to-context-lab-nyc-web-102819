// Your code here
function createEmployeeRecord(punchcard) {
    let record = {
        firstName: punchcard[0], 
        familyName: punchcard[1], 
        title: punchcard[2], 
        payPerHour: punchcard[3], 
        timeInEvents: [], 
        timeOutEvents: []
    };
    return record;
}

function createEmployeeRecords(punchcardArrays) {
    return punchcardArrays.map(punchcard => createEmployeeRecord(punchcard));
}

function createTimeInEvent(employeeObj, datetime) {
    let [date, hour] = datetime.split(' ');
    employeeObj.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour)
    });
    return employeeObj;
};

function createTimeOutEvent(employeeObj, datetime) {
    let [date, hour] = datetime.split(' ');
    employeeObj.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour)
    });
    return employeeObj;
};

function hoursWorkedOnDate(employeeObj, date) {
    let punchIn = employeeObj.timeInEvents.find(punchcard => punchcard.date === date);
    let punchOut = employeeObj.timeOutEvents.find(punchcard => punchcard.date === date);
    return (punchOut.hour - punchIn.hour) / 100;
};

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
};

function allWagesFor(employeeObj) {
    let payDates = employeeObj.timeOutEvents.map(punchcards => punchcards.date);
    let totalWages = payDates.reduce((acc, date) => acc + wagesEarnedOnDate(employeeObj, date), 0);
    return totalWages;
};

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employeeObj => employeeObj.firstName === firstName);
};

function calculatePayroll(srcArray) {
    // iterate through each srcArray employee object
    // run allWages for each employee object
    let payroll = srcArray.map(employees => allWagesFor(employees));
    // reduce allWages to generate total payroll
    let totalPayroll = payroll.reduce((acc, amount) => acc + amount, 0);
    return totalPayroll;
};