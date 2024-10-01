const folderHandler = require('./util/folderHandler');
const { getToken } = require('./util/moTVCalls');
const {
    getActiveCustomersTIP,
    getActiveCustomersSLZ,
    getActiveCustomersOOPS,
    getColombiaYplay,
} = require('./util/reportsEPG');
const writeToReport = require('./util/writeToFile');

Promise.all([
    getColombiaYplay(),
    getActiveCustomersTIP(),
    getActiveCustomersSLZ(),
    getActiveCustomersOOPS(),
])
    .then((data) => {
        const yplay = require('./epg.json');
        const colombia = data[0].response.rows;
        const tip = data[1].response.rows;
        const slz = data[2].response.rows;
        const oops = data[3].response.rows;

        folderHandler();
        writeToReport(yplay, tip, slz, oops, colombia);
    })
    .catch((e) => console.log(e));
