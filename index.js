const { getToken } = require("./util/moTVCalls");
const { 
    getActiveCustomersYplay, 
    getActiveCustomersTIP, 
    getActiveCustomersSLZ
} = require("./util/reportsEPG");
const writeToReport = require("./util/writeToFile");

Promise.all([
    getActiveCustomersYplay(),
    getActiveCustomersTIP(),
    getActiveCustomersSLZ()
])
.then( data => {
    const yplay = data[0].response.rows;
    const tip = data[1].response.rows;
    const slz = data[2].response.rows;

    writeToReport(yplay,tip,slz);
})
.catch(e=>console.log(e))