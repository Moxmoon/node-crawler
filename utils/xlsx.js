const xlsx = require('node-xlsx');
const fs = require('fs')

const writeData = function (data, fileName) {
    const excelData = [{ name: 'sheet1', data: data }]
    const buffer = xlsx.build(excelData);
    fs.writeFileSync(`files/${fileName}.xlsx`, buffer, function (error) {
        if (error) console.log('***导出失败****')
        console.log('***导出成功****')
    });
}

module.exports = writeData 