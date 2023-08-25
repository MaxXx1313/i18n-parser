"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishFolder = void 0;
const parser_1 = require("./parser");
const path = require("path");
const googlesheet_1 = require("./googlesheet/googlesheet");
const parse_url_1 = require("./googlesheet/parse-url");
/**
 *
 */
async function publishFolder(keyFile, folderpath, spreadsheetIdOrUrl, sheetName) {
    const spreadsheetId = (0, parse_url_1.url2id)(spreadsheetIdOrUrl);
    const langFiles = (0, parser_1.jsonScanFolder)(folderpath);
    // console.log('Found languages:');
    // for (const langFile of langFiles) {
    //     console.log('\t%s (%s)', langFile.lang, langFile.file);
    // }
    ///
    const filesData = {};
    for (const langFile of langFiles) {
        console.log('Parsing language ', langFile.lang);
        try {
            const tokens = (0, parser_1.jsonParseFile)(path.join(folderpath, langFile.file));
            filesData[langFile.lang] = tokens;
        }
        catch (e) {
            console.warn('Error parsing file', langFile.file);
            console.warn(e);
        }
    }
    ///
    const link = (0, parse_url_1.id2url)(spreadsheetId);
    console.log('Uploading to spreadsheet: ', link);
    await (0, googlesheet_1.publishSpreadsheet)(keyFile, filesData, spreadsheetId, sheetName);
    console.log('Done!');
}
exports.publishFolder = publishFolder;
