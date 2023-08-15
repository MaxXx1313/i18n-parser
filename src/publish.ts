import { jsonParseFile, jsonScanFolder, LangData } from "./parser";
import * as path from "path";
import { publishSpreadsheet } from "./googlesheet/googlesheet";

/**
 *
 */
export async function publishFolder(folderpath: string, spreadsheetId: string) {
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
    console.log('Uploading...');
    await publishSpreadsheet(spreadsheetId, filesData);


    console.log('Done!');
}
