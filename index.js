const folderHandler = require('./util/folderHandler');
const { getToken } = require('./util/moTVCalls');
const {
    getActiveCustomersYplay,
    getActiveCustomersTIP,
    getActiveCustomersSLZ,
    getActiveCustomersOOPS,
    getColombiaYplay,
} = require('./util/reportsEPG');
const writeToReport = require('./util/writeToFile');

Promise.all([
    getActiveCustomersYplay(),
    getColombiaYplay(),
    getActiveCustomersTIP(),
    getActiveCustomersSLZ(),
    getActiveCustomersOOPS(),
])
    .then((data) => {
        const yplay = data[0].response.rows;
        const colombia = data[1].response.rows;
        const tip = data[2].response.rows;
        const slz = data[3].response.rows;
        const oops = data[4].response.rows;

        folderHandler();
        writeToReport(yplay, tip, slz, oops, colombia);
    })
    .catch((e) => console.log(e));
