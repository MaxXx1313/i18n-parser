import { google } from 'googleapis';
import { GoogleSheetsClient } from "./client";

const serviceAccountKeyFile = "./config/i18n-sync@b-synch.iam.gserviceaccount.com.json";

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

