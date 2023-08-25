import { publishFolder } from "./publish";
import { parseToFolder } from "./parse";

console.log('hello');


const spreadsheetId = "1n9-ZIbVC5CVjILT2Iw3xfCCc5AsDbkwqaeaEY3ZE56A";
const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1n9-ZIbVC5CVjILT2Iw3xfCCc5AsDbkwqaeaEY3ZE56A/edit#gid=0";
const keyFile = "./config/i18n-sync@b-synch.iam.gserviceaccount.com.json";

// (async function() {
//     await publishFolder(keyFile, './assets/sample-result', spreadsheetId, 'Sheet1');
// })();

//
// (async function() {
//     await parseToFolder(keyFile, './assets/sample-result', spreadsheetUrl, 'Sheet1');
// })();
