"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToFolder = void 0;
const path = require("path");
const googlesheet_1 = require("./googlesheet/googlesheet");
const parser_1 = require("./parser");
const parse_url_1 = require("./googlesheet/parse-url");
/**
 *
 */
async function parseToFolder(keyFile, folderpath, spreadsheetIdOrUrl, sheetName) {
    const spreadsheetId = (0, parse_url_1.url2id)(spreadsheetIdOrUrl);
    const link = (0, parse_url_1.id2url)(spreadsheetId);
    console.log('Fetching spreadsheet data: ', link);
    const langData = await (0, googlesheet_1.parseSpreadsheet)(keyFile, spreadsheetId, sheetName);
    // console.log('Found languages:');
    // for (const lang in langData) {
    //     console.log('\t%s', lang);
    // }
    ///
    console.log('Saving data:');
    for (const lang in langData) {
        const location = path.join(folderpath, lang + '.json');
        console.log('\t%s -> "%s"', lang, location);
        try {
            (0, parser_1.jsonStringifyFile)(location, langData[lang]);
        }
        catch (e) {
            console.warn('Error saving file', location);
            console.warn(e);
        }
    }
    console.log('Done!');
}
exports.parseToFolder = parseToFolder;
