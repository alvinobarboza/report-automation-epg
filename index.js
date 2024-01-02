const { getToken } = require('./util/moTVCalls');
const {
    getActiveCustomersYplay,
    getActiveCustomersTIP,
    getActiveCustomersOOPS,
    getColombiaYplay,
} = require('./util/reportsEPG');
const writeToReport = require('./util/writeToFile');

Promise.all([
    getActiveCustomersYplay(),
    getColombiaYplay(),
    getActiveCustomersTIP(),
    getActiveCustomersOOPS(),
])
    .then((data) => {
        const yplay = data[0].response.rows;
        const colombia = data[1].response.rows;
        const tip = data[2].response.rows;
        const oops = data[3].response.rows;

        writeToReport(yplay, tip, oops, colombia);
    })
    .catch((e) => console.log(e));
