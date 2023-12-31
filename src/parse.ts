import * as path from "path";
import { parseSpreadsheet } from "./googlesheet/googlesheet";
import { jsonStringifyFile } from "./parser";
import { id2url, url2id } from "./googlesheet/parse-url";

/**
 *
 */
export async function parseToFolder(keyFile: string, folderpath: string, spreadsheetIdOrUrl: string, sheetName?: string) {
    const spreadsheetId = url2id(spreadsheetIdOrUrl);
    const link = id2url(spreadsheetId);
    console.log('Fetching spreadsheet data: ', link);
    const langData = await parseSpreadsheet(keyFile, spreadsheetId, sheetName);

    // console.log('Found languages:');
    // for (const lang in langData) {
    //     console.log('\t%s', lang);
    // }

    ///
    console.log('Saving data:');
    for (const lang in langData) {
        const location = path.join(folderpath, lang + '.json')
        console.log('\t%s -> "%s"', lang, location);

        try {
            jsonStringifyFile(location, langData[lang]);
        } catch (e) {
            console.warn('Error saving file', location);
            console.warn(e);
        }
    }

    console.log('Done!');
}
