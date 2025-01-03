const folderHandler = require('./util/folderHandler');
const {
    getActiveCustomersTIP,
    getActiveCustomersSLZ,
    getActiveCustomersOOPS,
    getColombiaYplay,
} = require('./util/reportsEPG');
const writeToReport = require('./util/writeToFile');

// Promise.all([
//     getColombiaYplay(),
//     getActiveCustomersTIP(),
//     getActiveCustomersSLZ(),
//     getActiveCustomersOOPS(),
// ])
//     .then((data) => {
//         const yplay = require('./epg.json');
//         const colombia = data[0].response.rows;
//         const tip = data[1].response.rows;
//         const slz = data[2].response.rows;
//         const oops = data[3].response.rows;

//         // folderHandler();
//         // writeToReport(yplay, tip, slz, oops, colombia);
//     })
//     .catch((e) => console.log(e));

(async function () {
    try {
        const yplay = require('./epg.json');
        const colombiaBody = await getColombiaYplay();
        const colombia = colombiaBody.response.rows;
        const tipBody = await getActiveCustomersTIP();
        const tip = tipBody.response.rows;
        const slzBody = await getActiveCustomersSLZ();
        const slz = slzBody.response.rows;
        const oopsBody = await getActiveCustomersOOPS();
        const oops = oopsBody.response.rows;

        folderHandler();
        writeToReport(yplay, tip, slz, oops, colombia);
    } catch (error) {
        console.log(error);
    }
})();
