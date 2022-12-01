const { getToken } = require("./util/moTVCalls");
const {
    getActiveCustomersYplay,
    getActiveCustomersTIP,
    getActiveCustomersSLZ,
    getActiveCustomersOOPS
} = require("./util/reportsEPG");
const writeToReport = require("./util/writeToFile");

Promise.all([
    getActiveCustomersYplay(),
    getActiveCustomersTIP(),
    getActiveCustomersSLZ(),
    getActiveCustomersOOPS(),
]).then(data => {
    const yplay = data[0].response.rows;
    const tip = data[1].response.rows;
    const slz = data[2].response.rows;
    const oops = data[3].response.rows;

    writeToReport(yplay, tip, slz, oops);
}).catch(e => console.log(e))