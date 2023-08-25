import { google } from "googleapis";


export class GoogleSheetsClient {

    private init$: Promise<any> | undefined;

    constructor(public serviceAccountKeyFile: string) {
    }

    async initialize() {
        if ( !this.init$) {
            this.init$ = this._getGoogleSheetClient();
        }
        return this.init$;
    }

    async readGoogleSheet(spreadsheetId: string, range: string, sheetName?: string) {
        const googleSheetClient = await this.initialize();

        const sheetRange = (sheetName ? sheetName + '!' : '') + range;
        const res = await googleSheetClient.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: sheetRange,
        });

        return res.data.values;
    }

    async writeGoogleSheet(sheetId: string, data: string[][], range: string, sheetName?: string) {
        const googleSheetClient = await this.initialize();
        const sheetRange = (sheetName ? sheetName + '!' : '') + range;

        await googleSheetClient.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: sheetRange,
            valueInputOption: 'USER_ENTERED',
            // insertDataOption: 'INSERT_ROWS',
            resource: {
                "majorDimension": "ROWS",
                "range": sheetRange,
                "values": data
            },
        })
    }

    private async _getGoogleSheetClient() {
        const auth = new google.auth.GoogleAuth({
            keyFile: this.serviceAccountKeyFile,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const authClient = await auth.getClient();
        return (google as any).sheets({
            version: 'v4',
            auth: authClient,
        });
    }

}
