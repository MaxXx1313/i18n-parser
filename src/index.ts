import { publishFolder } from "./publish";
import { parseToFolder } from "./parse";

console.log('hello');


const spreadsheetId = "1n9-ZIbVC5CVjILT2Iw3xfCCc5AsDbkwqaeaEY3ZE56A";

// (async function() {
//     await publishFolder('./assets/sample1', spreadsheetId);
// })();


(async function() {
    await parseToFolder('./assets/sample-result', spreadsheetId);
})();
