import { GoogleSheetsClient } from "./google-sheets-client";
import { JsonToken, LangData } from "../parser";

const serviceAccountKeyFile = "./config/i18n-sync@b-synch.iam.gserviceaccount.com.json";


/**
 * @more https://developers.google.com/sheets/api/guides/concepts
 */
export async function publishSpreadsheet(spreadsheetId: string, data: LangData) {
    // Generating google sheet client
    const googleSheetClient = new GoogleSheetsClient(serviceAccountKeyFile);


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
    await googleSheetClient.writeGoogleSheet(spreadsheetId, "A1", rows);
}


/**
 * @more https://developers.google.com/sheets/api/guides/concepts
 */
export async function parseSpreadsheet(spreadsheetId: string) {
    // Generating google sheet client
    const googleSheetClient = new GoogleSheetsClient(serviceAccountKeyFile);

    // Reading Google Sheet from a specific range
    const data = await googleSheetClient.readGoogleSheet(spreadsheetId, "1:1");
    console.log(data);
    await googleSheetClient.writeGoogleSheet(spreadsheetId, "A2", [['test']]);

    // // Adding a new row to Google Sheet
    // const dataToBeInserted = [
    //     ['11', 'rohith', 'Rohith', 'Sharma', 'Active'],
    //     ['12', 'virat', 'Virat', 'Kohli', 'Active']
    // ]
    // await _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, dataToBeInserted);
}
