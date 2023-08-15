"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetsClient = void 0;
const googleapis_1 = require("googleapis");
class GoogleSheetsClient {
    constructor(serviceAccountKeyFile) {
        this.serviceAccountKeyFile = serviceAccountKeyFile;
    }
    async initialize() {
        if (!this.init$) {
            this.init$ = this._getGoogleSheetClient();
        }
        return this.init$;
    }
    async readGoogleSheet(spreadsheetId, range) {
        const googleSheetClient = await this.initialize();
        const res = await googleSheetClient.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range,
        });
        return res.data.values;
    }
    async writeGoogleSheet(sheetId, range, data) {
        const googleSheetClient = await this.initialize();
        await googleSheetClient.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            // insertDataOption: 'INSERT_ROWS',
            resource: {
                "majorDimension": "ROWS",
                "range": range,
                "values": data
            },
        });
    }
    async _getGoogleSheetClient() {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: this.serviceAccountKeyFile,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const authClient = await auth.getClient();
        return googleapis_1.google.sheets({
            version: 'v4',
            auth: authClient,
        });
    }
}
exports.GoogleSheetsClient = GoogleSheetsClient;
