const { 
    SMSYPLAY, 
    REPORT, 
    smsBody, 
    smsHeader, 
    loginYplaySMS, 
    secretYplaySMS, 
    MWTIP, MWSLZ, MWCNN, 
    mwBody, mwHeader, 
    loginTipMW, 
    secretTipMW, 
    loginSlzMW, 
    secretSlzMW, 
    loginCNNMW, 
    secretCNNMW 
} = require("./constants");
const { getReport, getToken } = require("./moTVCalls");

const REPORTYPLAY = 119;
const REPORTTIP = 49;
const REPORTSLZ = 3;
const REPORTCNN = 10;

const getActiveCustomersYplay = () => getReport(
    SMSYPLAY+REPORT,
    smsBody(REPORTYPLAY),
    smsHeader(
        getToken(
            loginYplaySMS,
            secretYplaySMS
        )
    )
);

const getActiveCustomersTIP = () => getReport(
    MWTIP+REPORT,
    mwBody(REPORTTIP),
    mwHeader(
        getToken(
            loginTipMW,
            secretTipMW
        )
    )
);

const getActiveCustomersSLZ = () => getReport(
    MWSLZ+REPORT,
    mwBody(REPORTSLZ),
    mwHeader(
        getToken(
            loginSlzMW,
            secretSlzMW
        )
    )
);

const getActiveCustomersCNN = () => getReport(
    MWCNN+REPORT,
    mwBody(REPORTCNN),
    mwHeader(
        getToken(
            loginCNNMW,
            secretCNNMW
        )
    )
);

module.exports = {
    getActiveCustomersYplay,
    getActiveCustomersTIP,
    getActiveCustomersSLZ,
    getActiveCustomersCNN
}