require('dotenv').config();

const SMSYPLAY = 'https://sms.yplay.com.br';
const MWTIP = 'https://mw.tvnsul.com.br';
const MWSLZ = 'https://mwslz.tvn.com.br';
const MWOOPS = 'https://mw.oops.net.br';
const REPORT = '/api/report/reportSelection';

const loginYplaySMS = process.env.loginYplaySMS;
const secretYplaySMS = process.env.secretYplaySMS;

const loginTipMW = process.env.loginTipMW;
const secretTipMW = process.env.secretTipMW;

const loginSlzMW = process.env.loginSlzMW;
const secretSlzMW = process.env.secretSlzMW;

const loginOopsMW = process.env.loginOopsMW;
const secretOopsMW = process.env.secretOopsMW;

const smsBody = (id) => `{
    "data":{
        "reports_id": ${id}
    }
}`
const mwBody = (id, date) => `{
    "data":{
        "reportsId": ${id}
    }
}`
const smsHeader = (token) => {
    return { 'Authorization': token }
}
const mwHeader = (token) => {
    return { 'Authorization-user': token }
}

module.exports = {
    SMSYPLAY,
    MWSLZ,
    MWTIP,
    MWOOPS,
    REPORT,
    loginYplaySMS,
    secretYplaySMS,
    loginTipMW,
    secretTipMW,
    loginSlzMW,
    secretSlzMW,
    loginOopsMW,
    secretOopsMW,
    smsBody,
    mwBody,
    smsHeader,
    mwHeader
}