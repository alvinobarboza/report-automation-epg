const {
    SMSYPLAY,
    REPORT,
    smsBody,
    smsHeader,
    loginYplaySMS,
    secretYplaySMS,
    MWTIP,
    MWCNN,
    mwBody,
    mwHeader,
    loginTipMW,
    secretTipMW,
    MWOOPS,
    loginOopsMW,
    secretOopsMW,
} = require('./constants');
const { getReport, getToken } = require('./moTVCalls');

const REPORTYPLAY = 161;
const REPORTYPLAYCO = 328;
const REPORTTIP = 49;
const REPORTOOPS = 35;

const getActiveCustomersYplay = () =>
    getReport(
        SMSYPLAY + REPORT,
        smsBody(REPORTYPLAY),
        smsHeader(getToken(loginYplaySMS, secretYplaySMS))
    );

const getColombiaYplay = () =>
    getReport(
        SMSYPLAY + REPORT,
        smsBody(REPORTYPLAYCO),
        smsHeader(getToken(loginYplaySMS, secretYplaySMS))
    );

const getActiveCustomersTIP = () =>
    getReport(
        MWTIP + REPORT,
        mwBody(REPORTTIP),
        mwHeader(getToken(loginTipMW, secretTipMW))
    );

const getActiveCustomersOOPS = () =>
    getReport(
        MWOOPS + REPORT,
        mwBody(REPORTOOPS),
        mwHeader(getToken(loginOopsMW, secretOopsMW))
    );

module.exports = {
    getActiveCustomersYplay,
    getColombiaYplay,
    getActiveCustomersTIP,
    getActiveCustomersOOPS,
};
