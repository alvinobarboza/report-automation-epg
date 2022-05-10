require('dotenv').config();

const SMSYPLAY = 'https://sms.yplay.com.br';
const MWTIP = 'https://mw.tvnsul.com.br';
const MWSLZ = 'https://mwslz.tvn.com.br';
const MWCNN = 'https://mw.cnnbrasil.com.br';
const REPORT = '/api/report/reportSelection';

const loginYplaySMS = process.env.loginYplaySMS;
const secretYplaySMS = process.env.secretYplaySMS;

const loginTipMW = process.env.loginTipMW;
const secretTipMW = process.env.secretTipMW;

const loginSlzMW = process.env.loginSlzMW;
const secretSlzMW = process.env.secretSlzMW;

const loginCNNMW = process.env.loginCNNMW;
const secretCNNMW = process.env.secretCNNMW;

const smsBody = (id) => `{
    "data":{
        "reports_id": ${id}
    }
}`
const mwBody = (id,date) => `{
    "data":{
        "reportsId": ${id}
    }
}`
const smsHeader = (token) => {
    return {'Authorization' : token}
}
const mwHeader = (token) => {
    return {'Authorization-user' : token}
}

module.exports = {
    SMSYPLAY,
    MWCNN,
    MWSLZ,
    MWTIP,
    REPORT,
    loginYplaySMS,
    secretYplaySMS,
    loginTipMW,
    secretTipMW,
    loginSlzMW,
    secretSlzMW,
    loginCNNMW,
    secretCNNMW,
    smsBody,
    mwBody,
    smsHeader,
    mwHeader
}