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
async function parseToFolder(keyFile, folderpath, spreadsheetIdOrUrl, opts) {
    const spreadsheetId = (0, parse_url_1.url2id)(spreadsheetIdOrUrl);
    const link = (0, parse_url_1.id2url)(spreadsheetId);
    console.log('Fetching spreadsheet data: ', link);
    const langData = await (0, googlesheet_1.parseSpreadsheet)(keyFile, spreadsheetId, opts === null || opts === void 0 ? void 0 : opts.sheetName);
    // console.log('Found languages:');
    // for (const lang in langData) {
    //     console.log('\t%s', lang);
    // }
    ///
    console.log('Saving data:');
    for (const lang in langData) {
        const location = path.join(folderpath, lang + '.json');
        console.log('\t%s -> "%s"', lang, location);
        // filtering empty strings
        let tokenDataArr = langData[lang];
        if (opts === null || opts === void 0 ? void 0 : opts.skipEmpty) {
            tokenDataArr = tokenDataArr.filter(t => {
                if (t.value.trim().length > 0) {
                    return true;
                }
                return false;
            });
        }
        try {
            (0, parser_1.jsonStringifyFile)(location, tokenDataArr);
        }
        catch (e) {
            console.warn('Error saving file', location);
            console.warn(e);
        }
    }
    console.log('Done!');
}
exports.parseToFolder = parseToFolder;
