"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSpreadsheet = exports.publishSpreadsheet = void 0;
const google_sheets_client_1 = require("./google-sheets-client");
const assert = require("assert");
/**
 * @more https://developers.google.com/sheets/api/guides/concepts
 */
async function publishSpreadsheet(keyFile, spreadsheetId, data) {
    // Generating google sheet client
    const googleSheetClient = new google_sheets_client_1.GoogleSheetsClient(keyFile);
    // prepare data
    const firstRow = ['token'];
    const rowsHash = {};
    const langs = Object.keys(data);
    for (let ilang = 0; ilang < langs.length; ilang++) {
        const langHash = langs[ilang];
        firstRow.push(langHash);
        for (let irow = 0; irow < data[langHash].length; irow++) {
            const jsonToken = data[langHash][irow];
            rowsHash[jsonToken.key] = rowsHash[jsonToken.key] || [];
            rowsHash[jsonToken.key][ilang] = jsonToken.value;
        }
    }
    // combine rows
    const rows = [];
    rows.push(firstRow);
    for (const token in rowsHash) {
        const row = [token];
        row.push(...rowsHash[token]);
        rows.push(row);
    }
    // Write to sheet
    await googleSheetClient.writeGoogleSheet(spreadsheetId, "A1", rows);
}
exports.publishSpreadsheet = publishSpreadsheet;
/**
 * @more https://developers.google.com/sheets/api/guides/concepts
 */
async function parseSpreadsheet(keyFile, spreadsheetId) {
    // Generating google sheet client
    const googleSheetClient = new google_sheets_client_1.GoogleSheetsClient(keyFile);
    // Reading Google Sheet from a specific range
    const [langsRow] = await googleSheetClient.readGoogleSheet(spreadsheetId, "1:1");
    // verify row data
    assert.equal(langsRow[0], 'token', 'First column must have "token" name');
    // column data
    const tokensColumnData = await googleSheetClient.readGoogleSheet(spreadsheetId, 'A:A');
    const tokensColumn = [];
    for (let i = 0; i < (tokensColumnData === null || tokensColumnData === void 0 ? void 0 : tokensColumnData.length); i++) {
        tokensColumn.push(tokensColumnData[i][0]);
    }
    assert.equal(tokensColumn[0], 'token', 'Cell A1 must have "token" name');
    // fetch data
    const data = await googleSheetClient.readGoogleSheet(spreadsheetId, `R1C1:R${tokensColumn.length}C${langsRow.length}`);
    // iterations is started from 1 because we skip first row and column
    const result = {};
    for (let ilang = 1; ilang < langsRow.length; ilang++) {
        const langData = [];
        for (let irow = 1; irow < tokensColumn.length; irow++) {
            langData.push({
                key: tokensColumn[irow],
                value: data[irow][ilang] || '',
            });
        }
        result[langsRow[ilang]] = langData;
    }
    return result;
}
exports.parseSpreadsheet = parseSpreadsheet;
