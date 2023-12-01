const excel = require('excel4node');
const { getLocaleDateString, getCurrentMonthYearFull } = require('./date');
const { dataStyle, headerStyle, headerStyle2 } = require('./styleExcel');
const validation = require('./validation');
const path = require('path');
const sendEmail = require('./email/mailSender');

const FILENAMES = [];

function insertFilenameToFilenames(file) {
    FILENAMES.push(file);
}

const writeToReport = (yplay, tip, slz, oops, colombia) => {
    const { yplayPlatform, tipPlatform, oopsPlatform, colombiaPlatform } =
        validation(yplay, tip, slz, oops, colombia);
    reportREPORTTV(yplayPlatform, tipPlatform, oopsPlatform);
    reportREPORTTVInterno(yplayPlatform, tipPlatform, oopsPlatform);
    reportColombia(colombiaPlatform);
    // Send email
    sendEmail(FILENAMES).catch((e) => console.log(e));
};

function reportREPORTTVInterno(yplayPlatform, tipPlatform, oopsPlatform) {
    const reportData = [
        {
            name: 'SOFTXX',
            total: yplayPlatform.softxxTotal,
            customers: yplayPlatform.softxxCustomers,
        },
        {
            name: 'OLLA',
            total: yplayPlatform.ollaTotal,
            customers: yplayPlatform.ollaCustomers,
        },
        {
            name: 'TVN SUL',
            total: tipPlatform.sulTotal,
            customers: tipPlatform.sulCustomers,
        },
        {
            name: 'TVN SLZ',
            total: tipPlatform.slzTotal,
            customers: tipPlatform.slzCustomers,
        },
        {
            name: 'OOPS',
            total: oopsPlatform.oopsTotal,
            customers: oopsPlatform.oopsCustomers,
        },
    ];
    reportData.forEach((data) => genericReportREPORTTVInterno(data));
}

function reportREPORTTV(yplayPlatform, tipPlatform, oopsPlatform) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultado', {
        sheetView: {
            showGridLines: false,
        },
    });

    worksheet.row(1).setHeight(9);
    worksheet.row(2).setHeight(35);
    worksheet.row(3).setHeight(9);
    worksheet.row(6).setHeight(9);
    worksheet.row(14).setHeight(9);
    worksheet.column(1).setWidth(2);
    worksheet.column(2).setWidth(45);
    worksheet.column(3).setWidth(32);

    worksheet
        .cell(2, 2, 2, 3, true)
        .string('OPERADORES COM EPG REPORTV')
        .style(headerStyle);

    worksheet.cell(4, 2).string('Data de emissão:').style(headerStyle2);
    worksheet.cell(4, 3).string(getLocaleDateString()).style(dataStyle);
    worksheet.cell(5, 2).string('Mês de referência:').style(headerStyle2);
    worksheet.cell(5, 3).string(getCurrentMonthYearFull()).style(dataStyle);

    worksheet.cell(7, 2).string('Operadores').style(headerStyle2);
    worksheet.cell(7, 3).string('Número de assinantes').style(headerStyle2);
    worksheet.cell(8, 2).string('Yplay').style(dataStyle);
    worksheet
        .cell(8, 3)
        .number(yplayPlatform.yplayPlatformTotal)
        .style(dataStyle);
    worksheet.cell(9, 2).string('SOFTXX').style(dataStyle);
    worksheet.cell(9, 3).number(yplayPlatform.softxxTotal).style(dataStyle);
    worksheet.cell(10, 2).string('OLLA').style(dataStyle);
    worksheet.cell(10, 3).number(yplayPlatform.ollaTotal).style(dataStyle);
    worksheet.cell(11, 2).string('TIP').style(dataStyle);
    worksheet.cell(11, 3).number(tipPlatform.total).style(dataStyle);
    worksheet.cell(12, 2).string('OOPS').style(dataStyle);
    worksheet.cell(12, 3).number(oopsPlatform.oopsTotal).style(dataStyle);

    worksheet
        .cell(15, 2)
        .string('Número total de assinantes:')
        .style(headerStyle2);
    worksheet
        .cell(15, 3)
        .number(
            tipPlatform.total + yplayPlatform.total + oopsPlatform.oopsTotal
        )
        .style(dataStyle);

    const FILENAME = `Operadores com EPG ReporTV - ${getCurrentMonthYearFull()}.xlsx`;

    const file = {
        filename: FILENAME,
        path: path.join(__dirname, '..', 'output', FILENAME),
    };
    insertFilenameToFilenames(file);
    workbook.write(file.path);
}

/**@param {import('./validation').ColombiaData[]} data  */
function reportColombia(data) {
    const total = data.reduce((pre, curr) => pre + curr.customers.length, 0);

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultado', {
        sheetView: {
            showGridLines: false,
        },
    });

    const worksheetCustomers = workbook.addWorksheet('Usuários', {
        sheetView: {
            showGridLines: false,
        },
    });

    // resultado worksheet begin
    worksheet.row(1).setHeight(9);
    worksheet.row(2).setHeight(35);
    worksheet.row(3).setHeight(9);
    worksheet.row(6).setHeight(9);
    worksheet.column(1).setWidth(2);
    worksheet.column(2).setWidth(45);
    worksheet.column(3).setWidth(32);

    worksheet
        .cell(2, 2, 2, 3, true)
        .string('OPERADORES COM EPG REPORTV')
        .style(headerStyle);

    worksheet.cell(4, 2).string('Data de emissão:').style(headerStyle2);
    worksheet.cell(4, 3).string(getLocaleDateString()).style(dataStyle);
    worksheet.cell(5, 2).string('Mês de referência:').style(headerStyle2);
    worksheet.cell(5, 3).string(getCurrentMonthYearFull()).style(dataStyle);

    worksheet.cell(7, 2).string('Operadores').style(headerStyle2);
    worksheet.cell(7, 3).string('Número de assinantes').style(headerStyle2);

    let row = 8;
    for (const vendor of data) {
        worksheet.cell(row, 2).string(vendor.name).style(dataStyle);
        worksheet.cell(row, 3).number(vendor.total).style(dataStyle);
        row++;
    }

    row += 4;
    worksheet
        .cell(row, 2)
        .string('Número total de assinantes:')
        .style(headerStyle2);
    worksheet.cell(row, 3).number(total).style(dataStyle);
    // END

    // Usuários worksheet begin

    const headerCustomers = ['ID', 'LOGIN', 'VENDOR'];

    worksheetCustomers.row(1).setHeight(9);
    worksheetCustomers.column(1).setWidth(2);
    worksheetCustomers.column(2).setWidth(32);
    worksheetCustomers.column(3).setWidth(32);
    worksheetCustomers.column(4).setWidth(32);
    worksheetCustomers.row(2).filter();

    headerCustomers.forEach((data, index) => {
        worksheetCustomers
            .cell(2, 2 + index)
            .string(data)
            .style(headerStyle2);
    });

    /**@type {import('./validation').ColombiaReport[]} */
    const customers = data.reduce((pre, curr) => {
        for (const customer of curr.customers) {
            pre.push(customer);
        }
        return pre;
    }, []);
    customers.forEach((customer, index) => {
        worksheetCustomers
            .cell(3 + index, 2)
            .number(customer.id)
            .style(dataStyle);
        worksheetCustomers
            .cell(3 + index, 3)
            .string(customer.login)
            .style(dataStyle);
        worksheetCustomers
            .cell(3 + index, 4)
            .string(customer.dealerid === 37 ? 'Softxx' : customer.vendor)
            .style(dataStyle);
    });
    // END

    const FILENAME = `Operadores com EPG ReporTV - Yplay CO. - ${getCurrentMonthYearFull()}.xlsx`;

    const file = {
        filename: FILENAME,
        path: path.join(__dirname, '..', 'output', FILENAME),
    };
    insertFilenameToFilenames(file);
    workbook.write(file.path);
}

function genericReportREPORTTVInterno(data) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultado', {
        sheetView: {
            showGridLines: false,
        },
    });

    const worksheetCustomers = workbook.addWorksheet('Usuários', {
        sheetView: {
            showGridLines: false,
        },
    });

    // resultado worksheet begin
    worksheet.row(1).setHeight(9);
    worksheet.row(2).setHeight(35);
    worksheet.row(3).setHeight(9);
    worksheet.row(6).setHeight(9);
    worksheet.column(1).setWidth(2);
    worksheet.column(2).setWidth(45);
    worksheet.column(3).setWidth(32);

    worksheet
        .cell(2, 2, 2, 3, true)
        .string('OPERADORES COM EPG REPORTV')
        .style(headerStyle);

    worksheet.cell(4, 2).string('Data de emissão:').style(headerStyle2);
    worksheet.cell(4, 3).string(getLocaleDateString()).style(dataStyle);
    worksheet.cell(5, 2).string('Mês de referência:').style(headerStyle2);
    worksheet.cell(5, 3).string(getCurrentMonthYearFull()).style(dataStyle);

    worksheet.cell(7, 2).string('Operadores').style(headerStyle2);
    worksheet.cell(7, 3).string('Número de assinantes').style(headerStyle2);
    worksheet.cell(8, 2).string(data.name).style(dataStyle);
    worksheet.cell(8, 3).number(data.total).style(dataStyle);

    worksheet
        .cell(12, 2)
        .string('Número total de assinantes:')
        .style(headerStyle2);
    worksheet.cell(12, 3).number(data.total).style(dataStyle);
    // END

    // Usuários worksheet begin

    const headerCustomers = ['ID', 'LOGIN', 'VENDOR'];

    worksheetCustomers.row(1).setHeight(9);
    worksheetCustomers.column(1).setWidth(2);
    worksheetCustomers.column(2).setWidth(32);
    worksheetCustomers.column(3).setWidth(32);
    worksheetCustomers.column(4).setWidth(32);
    worksheetCustomers.row(2).filter();

    headerCustomers.forEach((data, index) => {
        worksheetCustomers
            .cell(2, 2 + index)
            .string(data)
            .style(headerStyle2);
    });
    data.customers.forEach((customer, index) => {
        worksheetCustomers
            .cell(3 + index, 2)
            .number(customer.id)
            .style(dataStyle);
        worksheetCustomers
            .cell(3 + index, 3)
            .string(customer.login)
            .style(dataStyle);
        worksheetCustomers
            .cell(3 + index, 4)
            .string(customer.dealerid === 37 ? 'Softxx' : customer.vendor)
            .style(dataStyle);
    });
    // END

    const FILENAME = `Operadores com EPG ReporTV(interno) - ${data.name.toUpperCase()} - ${getCurrentMonthYearFull()}.xlsx`;

    const file = {
        filename: FILENAME,
        path: path.join(__dirname, '..', 'output', FILENAME),
    };
    insertFilenameToFilenames(file);
    workbook.write(file.path);
}

module.exports = writeToReport;
