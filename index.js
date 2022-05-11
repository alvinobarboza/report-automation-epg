const { getToken } = require("./util/moTVCalls");
const { 
    getActiveCustomersYplay, 
    getActiveCustomersTIP, 
    getActiveCustomersSLZ, 
    getActiveCustomersCNN 
} = require("./util/reportsEPG");
const writeToReport = require("./util/writeToFile");

Promise.all([
    getActiveCustomersYplay(),
    getActiveCustomersTIP(),
    getActiveCustomersSLZ(),
    getActiveCustomersCNN()
])
.then( data => {
    const yplay = data[0].response.rows;
    const tip = data[1].response.rows;
    const slz = data[2].response.rows;
    const cnn = data[3].response.rows;

    writeToReport(yplay,tip,slz,cnn);
})
.catch(e=>console.log(e))