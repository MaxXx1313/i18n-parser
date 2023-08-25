"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
console.log('hello');
const spreadsheetId = "1n9-ZIbVC5CVjILT2Iw3xfCCc5AsDbkwqaeaEY3ZE56A";
const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1n9-ZIbVC5CVjILT2Iw3xfCCc5AsDbkwqaeaEY3ZE56A/edit#gid=0";
const keyFile = "./config/i18n-sync@b-synch.iam.gserviceaccount.com.json";
// (async function() {
//     await publishFolder(keyFile, './assets/sample1', spreadsheetId, 'Sheet2');
// })();
//
(async function () {
    await (0, parse_1.parseToFolder)(keyFile, './assets/sample-result', spreadsheetUrl, 'Sheet2');
})();
