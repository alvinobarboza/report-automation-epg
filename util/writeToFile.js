const excel = require('excel4node');
const { getLocaleDateString, getCurrentMonthYearFull } = require('./date');
const { dataStyle, headerStyle, headerStyle2 } = require('./styleExcel');
const validation = require('./validation');

const writeToReport = (yplay, tip, slz, cnn) => {
    const {
        totalSoftx,
        totalTip,
        totalSLZ,
        totalCNN
    } = validation(yplay, tip, slz, cnn);

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
    worksheet.cell(8,2).string('SOFTX').style(dataStyle);
    worksheet.cell(8,3).number(totalSoftx).style(dataStyle);
    worksheet.cell(9,2).string('TIP').style(dataStyle);
    worksheet.cell(9,3).number(totalTip).style(dataStyle);
    worksheet.cell(10,2).string('TVN SLZ').style(dataStyle);
    worksheet.cell(10,3).number(totalSLZ).style(dataStyle);
    worksheet.cell(11,2).string('CNN').style(dataStyle);
    worksheet.cell(11,3).number(totalCNN).style(dataStyle);

    worksheet.cell(13,2).string('Número total de assinantes:').style(headerStyle2);
    worksheet.cell(13,3).number((totalCNN+totalSLZ+totalSoftx+totalTip)).style(dataStyle);

    workbook.write(`Operadores com EPG ReporTV - ${getCurrentMonthYearFull()}.xlsx`);
}

module.exports = writeToReport;