import { publishSpreadsheet } from "./googlesheet/googlesheet";
import { jsonParseFile } from "./parser";

console.log('hello');


const spreadsheetId = "1n9-ZIbVC5CVjILT2Iw3xfCCc5AsDbkwqaeaEY3ZE56A";

(async function() {
    const result = jsonParseFile('./assets/sample1/en.json');
    await publishSpreadsheet(spreadsheetId, {en: result});
})();
//
// const result = jsonParseFile('./assets/sample1/en.json');
//
// console.log(result);
//
// jsonStringifyFile('./assets/sample-result/en.json', result);
