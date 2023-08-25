import { GoogleSheetsClient } from "./google-sheets-client";
import { JsonToken, LangData } from "../parser";
import * as assert from "assert";

/**
 * @more https://developers.google.com/sheets/api/guides/concepts
 */
export async function publishSpreadsheet(keyFile: string, data: LangData, spreadsheetId: string, sheetName?: string) {
    // Generating google sheet client
    const googleSheetClient = new GoogleSheetsClient(keyFile);


    // prepare data
    const firstRow = ['token'];
    const rowsHash: { [token: string]: string[] } = {};

    const langs = Object.keys(data);
    for (let ilang = 0; ilang < langs.length; ilang++) {
        const langHash = langs[ilang];
        firstRow.push(langHash);

        for (let irow = 0; irow < data![langHash]!.length; irow++) {
            const jsonToken: JsonToken = data![langHash][irow];
            rowsHash[jsonToken.key] = rowsHash[jsonToken.key] || [];
            rowsHash[jsonToken.key][ilang] = jsonToken.value;
        }
    }

    // combine rows
    const rows: string[][] = [];
    rows.push(firstRow);
    for (const token in rowsHash) {
        const row = [token];
        row.push(...rowsHash[token]);
        rows.push(row);
    }

    // Write to sheet
    await googleSheetClient.writeGoogleSheet(spreadsheetId, rows, "A1", sheetName);
}


/**
 * @more https://developers.google.com/sheets/api/guides/concepts
 */
export async function parseSpreadsheet(keyFile: string, spreadsheetId: string, sheetName?: string): Promise<LangData> {
    // Generating google sheet client
    const googleSheetClient = new GoogleSheetsClient(keyFile);

    // Reading Google Sheet from a specific range
    const [langsRow] = await googleSheetClient.readGoogleSheet(spreadsheetId, "1:1", sheetName);

    // verify row data
    assert.equal(langsRow[0], 'token', 'First column must have "token" name');

    // column data
    const tokensColumnData: string[][] = await googleSheetClient.readGoogleSheet(spreadsheetId, 'A:A', sheetName);

    const tokensColumn = [];
    for (let i = 0; i < tokensColumnData?.length; i++) {
        tokensColumn.push(tokensColumnData[i][0]);
    }
    assert.equal(tokensColumn[0], 'token', 'Cell A1 must have "token" name');


    // fetch data
    const data: string[][] = await googleSheetClient.readGoogleSheet(spreadsheetId, `R1C1:R${tokensColumn.length}C${langsRow.length}`, sheetName);

    // iterations is started from 1 because we skip first row and column
    const result: LangData = {};
    for (let ilang = 1; ilang < langsRow.length; ilang++) {
        const langData: JsonToken[] = [];
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
