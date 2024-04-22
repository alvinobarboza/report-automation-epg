const fs = require('node:fs');
const { getCurrentMonthYearFull } = require('./date');
const path = require('node:path');

module.exports = function () {
    const folderName = getCurrentMonthYearFull();
    const output = 'output';
    const pathToFolder = path.join(output, folderName);
    try {
        if (!fs.existsSync(pathToFolder)) {
            fs.mkdirSync(pathToFolder);
        }
    } catch (error) {
        console.log(error);
    }
};
