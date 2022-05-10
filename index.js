const { getToken } = require("./util/moTVCalls");
const { 
    getActiveCustomersYplay, 
    getActiveCustomersTIP, 
    getActiveCustomersSLZ, 
    getActiveCustomersCNN 
} = require("./util/reportsEPG");

Promise.all([
    getActiveCustomersYplay(),
    getActiveCustomersTIP(),
    getActiveCustomersSLZ(),
    getActiveCustomersCNN()
])
.then( data => {
    const [yplay, tip, slz, cnn] = data;
    console.table(yplay);
    console.table(tip);
    console.table(slz);
    console.table(cnn);
})
.catch(e=>console.log(e))