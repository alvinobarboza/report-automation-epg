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
    MWOOPS,
    loginOopsMW,
    secretOopsMW
} = require("./constants");
const { getReport, getToken } = require("./moTVCalls");

const REPORTYPLAY = 161;
const REPORTTIP = 49;
const REPORTSLZ = 3;
const REPORTOOPS = 35;

const getActiveCustomersYplay = () => getReport(
    SMSYPLAY + REPORT,
    smsBody(REPORTYPLAY),
    smsHeader(
        getToken(
            loginYplaySMS,
            secretYplaySMS
        )
    )
);

const getActiveCustomersTIP = () => getReport(
    MWTIP + REPORT,
    mwBody(REPORTTIP),
    mwHeader(
        getToken(
            loginTipMW,
            secretTipMW
        )
    )
);

const getActiveCustomersSLZ = () => getReport(
    MWSLZ + REPORT,
    mwBody(REPORTSLZ),
    mwHeader(
        getToken(
            loginSlzMW,
            secretSlzMW
        )
    )
);

const getActiveCustomersOOPS = () => getReport(
    MWOOPS + REPORT,
    mwBody(REPORTOOPS),
    mwHeader(
        getToken(
            loginOopsMW,
            secretOopsMW
        )
    )
);

module.exports = {
    getActiveCustomersYplay,
    getActiveCustomersTIP,
    getActiveCustomersSLZ,
    getActiveCustomersOOPS
}