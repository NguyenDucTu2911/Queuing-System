import React from "react";

interface ExcelExportButtonProps {
  data: any[];
  sheetName: string;
  fileName: string;
}

class CommonUtils {
//   static exportExcel(data : any[], nameSheet: string, nameFile: string) {
//     return new Promise((resolve, reject) => {
//       var wb = XLSX.utils.book_new();
//       var ws = XLSX.utils.json_to_sheet(data);
//       XLSX.utils.book_append_sheet(wb, ws, nameSheet);
//       XLSX.writeFile(wb, `${nameFile}.xlsx`);
//       resolve("done");
//     });
//   }
}

export default CommonUtils;

