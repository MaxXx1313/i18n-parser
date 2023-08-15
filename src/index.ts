import { parseSpreadsheet } from "./googlesheet/googlesheet";

console.log('hello');


const spreadsheetId = "1n9-ZIbVC5CVjILT2Iw3xfCCc5AsDbkwqaeaEY3ZE56A";

(async function() {

    await parseSpreadsheet(spreadsheetId);
})();
//
// const result = jsonParseFile('./assets/sample1/en.json');
//
// console.log(result);
//
// jsonStringifyFile('./assets/sample-result/en.json', result);
