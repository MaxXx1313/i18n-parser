import { jsonParseFile, jsonScanFolder, LangData } from "./parser";
import * as path from "path";
import { publishSpreadsheet } from "./googlesheet/googlesheet";
import { id2url, url2id } from "./googlesheet/parse-url";

/**
 *
 */
export async function publishFolder(keyFile: string, folderpath: string, spreadsheetIdOrUrl: string, opts?: {
    sheetName?: string,
}) {
    const spreadsheetId = url2id(spreadsheetIdOrUrl);
    const langFiles = jsonScanFolder(folderpath);

    // console.log('Found languages:');
    // for (const langFile of langFiles) {
    //     console.log('\t%s (%s)', langFile.lang, langFile.file);
    // }

    ///
    const filesData: LangData = {};
    for (const langFile of langFiles) {
        console.log('Parsing language ', langFile.lang);
        try {
            const tokens = jsonParseFile(path.join(folderpath, langFile.file));
            filesData[langFile.lang] = tokens;
        } catch (e) {
            console.warn('Error parsing file', langFile.file);
            console.warn(e);
        }
    }

    ///
    const link = id2url(spreadsheetId);
    console.log('Uploading to spreadsheet: ', link);
    await publishSpreadsheet(keyFile, filesData, spreadsheetId, opts?.sheetName);


    console.log('Done!');
}
