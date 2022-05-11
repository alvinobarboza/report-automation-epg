const excel = require('excel4node');
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

    worksheet.column(2).setWidth(25);
    worksheet.column(3).setWidth(22);
    worksheet.row(2).filter();

    worksheet.cell(2,2).string('Utilizador').style(headerStyle);    
    worksheet.cell(2,3).string('Total usuários ativos').style(headerStyle);

    worksheet.cell(3,2).string('SOFTX').style(dataStyle);
    worksheet.cell(3,3).number(totalSoftx).style(dataStyle);
    worksheet.cell(4,2).string('TIP').style(dataStyle);
    worksheet.cell(4,3).number(totalTip).style(dataStyle);
    worksheet.cell(5,2).string('TVN SLZ').style(dataStyle);
    worksheet.cell(5,3).number(totalSLZ).style(dataStyle);
    worksheet.cell(6,2).string('CNN').style(dataStyle);
    worksheet.cell(6,3).number(totalCNN).style(dataStyle);

    workbook.write('test.xlsx');
}

const headerStyle = {
    alignment: {
        horizontal: 'center',
        vertical: 'center'
    },
    font: {
        color: '#000000',
        bold: true,
        size: 12
    },
    fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#ffff00',
        fgColor: '#ffff00',
    },
    border: { 
        left: {
            style: 'thin', 
            color: '#000000' 
        },
        right: {
            style: 'thin', 
            color: '#000000'
        },
        top: {
            style: 'thin', 
            color: '#000000'
        },
        bottom: {
            style: 'thin', 
            color: '#000000'
        },
    }
}

const dataStyle = {
    border: { 
        left: {
            style: 'thin', 
            color: '#000000' 
        },
        right: {
            style: 'thin', 
            color: '#000000'
        },
        top: {
            style: 'thin', 
            color: '#000000'
        },
        bottom: {
            style: 'thin', 
            color: '#000000'
        },
    }
}

module.exports = writeToReport;