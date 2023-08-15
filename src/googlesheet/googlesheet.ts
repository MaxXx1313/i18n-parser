import { google } from 'googleapis';

const serviceAccountKeyFile = "./config/i18n-sync@b-synch.iam.gserviceaccount.com.json";

/**
 * @more https://developers.google.com/sheets/api/guides/concepts
 */
export async function parseSpreadsheet(spreadsheetId: string) {
    // Generating google sheet client
    const googleSheetClient = await _getGoogleSheetClient();

    // Reading Google Sheet from a specific range
    const data = await _readGoogleSheet(googleSheetClient, spreadsheetId, "1:1");
    console.log(data);
    await _writeGoogleSheet(googleSheetClient, spreadsheetId, "A2", [['test']]);

    // // Adding a new row to Google Sheet
    // const dataToBeInserted = [
    //     ['11', 'rohith', 'Rohith', 'Sharma', 'Active'],
    //     ['12', 'virat', 'Virat', 'Kohli', 'Active']
    // ]
    // await _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, dataToBeInserted);
}


async function _getGoogleSheetClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: serviceAccountKeyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    return (google as any).sheets({
        version: 'v4',
        auth: authClient,
    });
}


async function _readGoogleSheet(googleSheetClient: any, spreadsheetId: string, range: string) {
    const res = await googleSheetClient.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    });

    return res.data.values;
}

async function _writeGoogleSheet(googleSheetClient: any, sheetId: string, range: string, data: string[][]) {
    await googleSheetClient.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "majorDimension": "ROWS",
            "values": data
        },
    })
}
