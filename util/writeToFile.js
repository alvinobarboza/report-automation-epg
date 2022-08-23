const excel = require('excel4node');
const { getLocaleDateString, getCurrentMonthYearFull } = require('./date');
const { dataStyle, headerStyle, headerStyle2 } = require('./styleExcel');
const validation = require('./validation');
const path = require('path');

const writeToReport = (yplay, tip, slz) => {
    const {
        yplayPlatform,
        tipPlatform
    } = validation(yplay, tip, slz);

    reportREPORTTV(yplayPlatform, tipPlatform);
    reportREPORTTVInterno(yplayPlatform, tipPlatform);
}

const reportREPORTTV = (yplayPlatform, tipPlatform) => {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultado', {
        sheetView: {
            showGridLines: false
        }
    });

    worksheet.row(1).setHeight(9);    
    worksheet.row(2).setHeight(35);
    worksheet.row(3).setHeight(9);
    worksheet.row(6).setHeight(9);
    worksheet.row(12).setHeight(9);
    worksheet.column(1).setWidth(2);
    worksheet.column(2).setWidth(45);
    worksheet.column(3).setWidth(32);
    worksheet.row(7).filter();

    worksheet.cell(2,2,2,3,true).string('OPERADORES COM EPG REPORTV').style(headerStyle);    

    worksheet.cell(4,2).string('Data de emissão:').style(headerStyle2);    
    worksheet.cell(4,3).string(getLocaleDateString()).style(dataStyle);
    worksheet.cell(5,2).string('Mês de referência:').style(headerStyle2);    
    worksheet.cell(5,3).string(getCurrentMonthYearFull()).style(dataStyle);

    worksheet.cell(7,2).string('Operadores').style(headerStyle2);    
    worksheet.cell(7,3).string('Número de assinantes').style(headerStyle2);
    worksheet.cell(8,2).string('Yplay').style(dataStyle);
    worksheet.cell(8,3).number(yplayPlatform.yplayPlatformTotal).style(dataStyle);
    worksheet.cell(9,2).string('SOFTXX').style(dataStyle);
    worksheet.cell(9,3).number(yplayPlatform.softxxTotal).style(dataStyle);
    worksheet.cell(10,2).string('TIP').style(dataStyle);
    worksheet.cell(10,3).number(tipPlatform.total).style(dataStyle);

    worksheet.cell(13,2).string('Número total de assinantes:').style(headerStyle2);
    worksheet.cell(13,3).number((tipPlatform.total+yplayPlatform.total)).style(dataStyle);

    workbook.write(path.join(__dirname, '..', 'output', `Operadores com EPG ReporTV - ${getCurrentMonthYearFull()}.xlsx`));
}

const reportREPORTTVInterno = (yplayPlatform, tipPlatform) => {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Resultado', {
        sheetView: {
            showGridLines: false
        }
    });

    const worksheetCustomers = workbook.addWorksheet('Usuários', {
        sheetView: {
            showGridLines: false
        }
    });

    // resultado worksheet begin
    worksheet.row(1).setHeight(9);    
    worksheet.row(2).setHeight(35);
    worksheet.row(3).setHeight(9);
    worksheet.row(6).setHeight(9);
    worksheet.row(12).setHeight(9);
    worksheet.column(1).setWidth(2);
    worksheet.column(2).setWidth(45);
    worksheet.column(3).setWidth(32);
    worksheet.row(7).filter();

    worksheet.cell(2,2,2,3,true).string('OPERADORES COM EPG REPORTV').style(headerStyle);    

    worksheet.cell(4,2).string('Data de emissão:').style(headerStyle2);    
    worksheet.cell(4,3).string(getLocaleDateString()).style(dataStyle);
    worksheet.cell(5,2).string('Mês de referência:').style(headerStyle2);    
    worksheet.cell(5,3).string(getCurrentMonthYearFull()).style(dataStyle);

    worksheet.cell(7,2).string('Operadores').style(headerStyle2);    
    worksheet.cell(7,3).string('Número de assinantes').style(headerStyle2);
    worksheet.cell(8,2).string('SOFTXX').style(dataStyle);
    worksheet.cell(8,3).number(yplayPlatform.softxxTotal).style(dataStyle);
    worksheet.cell(9,2).string('TVN SUL').style(dataStyle);
    worksheet.cell(9,3).number(tipPlatform.sulTotal).style(dataStyle);
    worksheet.cell(10,2).string('TVN SLZ').style(dataStyle);
    worksheet.cell(10,3).number(tipPlatform.slzTotal).style(dataStyle);

    worksheet.cell(13,2).string('Número total de assinantes:').style(headerStyle2);
    worksheet.cell(13,3).number((tipPlatform.total+yplayPlatform.softxxTotal)).style(dataStyle);
    // END

    // Usuários worksheet begin
    const customers = [
        ...yplayPlatform.softxxCustomers,
        ...tipPlatform.sulCustomers,
        ...tipPlatform.slzCustomers
    ];
    const headerCustomers = ['ID', 'LOGIN', 'VENDOR'];

    worksheetCustomers.row(1).setHeight(9);    
    worksheetCustomers.column(1).setWidth(2);
    worksheetCustomers.column(2).setWidth(32);
    worksheetCustomers.column(3).setWidth(32);
    worksheetCustomers.column(4).setWidth(32);
    worksheetCustomers.row(2).filter();

    headerCustomers.forEach((data, index)=>{
        worksheetCustomers.cell(2,2+index).string(data).style(headerStyle2);
    });
    customers.forEach((customer, index)=>{
        worksheetCustomers.cell(3+index, 2).number(customer.id).style(dataStyle);
        worksheetCustomers.cell(3+index, 3).string(customer.login).style(dataStyle);
        worksheetCustomers.cell(3+index, 4).string(customer.dealerid === 37 ? 'Softxx':customer.vendor).style(dataStyle);
    });
    // END

    workbook.write(path.join(__dirname, '..', 'output', `Operadores com EPG ReporTV(interno) - ${getCurrentMonthYearFull()}.xlsx`));
}

module.exports = writeToReport;