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
    secretSlzMW
} = require("./constants");
const { getReport, getToken } = require("./moTVCalls");

const REPORTYPLAY = 161;
const REPORTTIP = 49;
const REPORTSLZ = 3;

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

module.exports = {
    getActiveCustomersYplay,
    getActiveCustomersTIP,
    getActiveCustomersSLZ
}