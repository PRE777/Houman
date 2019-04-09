/* eslint-disable */
import XLSX from 'xlsx';

function auto_width(ws, data) {
  /*set worksheet max width per col*/
  const colWidth = data.map(row => row.map(val => {
    /*if null/undefined*/
    if (val == null) {
      return {
        'wch': 10
      };
    }
    /*if chinese*/
    else if (val.toString().charCodeAt(0) > 255) {
      return {
        'wch': val.toString().length * 2
      };
    } else {
      return {
        'wch': val.toString().length
      };
    }
  }))
  /*start in the first row*/
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch'];
      }
    }
  }
  ws['!cols'] = result;
}

function json_to_array(key, jsonData) {
  return jsonData.map(v => key.map(j => {
    return v[j]
  }));
}

// fix data,return string
function fixdata(data) {
  let o = ''
  let l = 0
  const w = 10240
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}

// get head from excel file,return array
function get_header_row(sheet) {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
    var cell = sheet[XLSX.utils.encode_cell({
      c: C,
      r: R
    })] /* find the cell in the first row */
    var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const export_table_to_excel = (id, filename) => {
  const table = document.getElementById(id);
  const wb = XLSX.utils.table_to_book(table);
  XLSX.writeFile(wb, filename);

  /* the second way */
  // const table = document.getElementById(id);
  // const wb = XLSX.utils.book_new();
  // const ws = XLSX.utils.table_to_sheet(table);
  // XLSX.utils.book_append_sheet(wb, ws, filename);
  // XLSX.writeFile(wb, filename);
}

export const export_json_to_excel = ({
  data,
  key,
  title,
  filename,
  autoWidth
}) => {
  const wb = XLSX.utils.book_new();
  data.unshift(title);
  const ws = XLSX.utils.json_to_sheet(data, {
    header: key,
    skipHeader: true
  });
  if (autoWidth) {
    const arr = json_to_array(key, data);
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, filename + '.xlsx');
}

// 导出不带有汉字标题的execel内容
export const export_array_to_excel = ({
  key,
  data,
  title,
  filename,
  autoWidth
}) => {
  const wb = XLSX.utils.book_new();
  const arr = json_to_array(key, data);
  arr.unshift(title)
  const ws = XLSX.utils.aoa_to_sheet(arr);
  if (autoWidth) {
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, filename + '.xlsx');
}

// 导出带有汉字标题的execel内容
export const export_array_to_excel2 = ({
  key,
  data,
  title,
  filename,
  autoWidth
}) => {
  const wb = XLSX.utils.book_new();
  const arr = json_to_array(key, data);
  arr.unshift(key)
  arr.unshift(title)
  const ws = XLSX.utils.aoa_to_sheet(arr);
  if (autoWidth) {
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, filename + '.xlsx');
}

export const read = (data, type) => {
  /* if type == 'base64' must fix data first */
  // const fixedData = fixdata(data)
  // const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
  const workbook = XLSX.read(data, {
    type: type
  });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const header = get_header_row(worksheet);
  const results = XLSX.utils.sheet_to_json(worksheet);
  return {
    header,
    results
  };
}

// 导入
export const readesxle = async (file, header, jsointitle) => {
  return new Promise(function (resolve, reject) {
    const resultdata = {
      ErrCode: "9",
      ErrText: '导入文件格式不正确。',
      Rows: []
    }
    const fileExt = file.name.split('.').pop().toLocaleLowerCase()
    if (fileExt === 'xlsx' || fileExt === 'xls') {
      const reader = new FileReader();

      const thisXLSX = XLSX;
      const thisheader = header;
      const thisjsointitle = jsointitle;
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {}
      // reader.onprogress = e => {
      //   this.progressPercent = Math.round(e.loaded / e.total * 100)
      // }
      reader.onerror = e => {
        resultdata.ErrText = '文件读取出错';
        resultdata.ErrCode = "1";
        resolve(resultdata);
      }
      reader.onload = e => {
        const data = e.target.result
        const
          workbook = thisXLSX.read(data, {
            type: "array"
          });
        let tempFlag = true;

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetsheader = get_header_row(worksheet);
        const sheetarray = thisXLSX.utils.sheet_to_json(worksheet);

        thisheader.forEach((item, index) => {
          if (sheetsheader.findIndex(x => x == item) == -1) {
            tempFlag = false
          }
        });
        if (tempFlag) {
          let sheetresult = [];
          for (let i = 0; i < sheetarray.length; i++) {
            sheetresult.push({});
            for (let j = 0; j < thisheader.length; j++) {
              if (sheetarray[i][thisheader[j]] == undefined || sheetarray[i][thisheader[j]] == null)
                sheetresult[i][thisjsointitle[j]] = "";
              else
                sheetresult[i][thisjsointitle[j]] = sheetarray[i][thisheader[j]];
            }
          }
          resultdata.ErrCode = "0";
          resultdata.EErrText = "文件导入成功";
          resultdata.Rows = sheetresult;
        } else {
          resultdata.ErrCode = "1";
          resultdata.EErrText = "导入文件格式不正确。";
          resultdata.Rows = [];
        }
        resolve(resultdata);
      }
    } else {
      resultdata.ErrCode = "1";
      resultdata.ErrText = '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。';
      resolve(resultdata);
    }
  })
}

export default {
  export_table_to_excel,
  export_array_to_excel,
  export_json_to_excel,
  export_array_to_excel2,
  read,
  readesxle,
}