import * as fs from "fs";
import * as path from "path";
import { anyobject, xpath_plain } from "../lib/xpath";
import { JsonToken } from "../interface/parser.interface";

/**
 * Parse json file and produce structured result
 */
export function jsonParseFile(filepath: string) {
    const jsonDataStr = fs.readFileSync(filepath, {encoding: "utf-8"});
    let data = JSON.parse(jsonDataStr);
    return jsonParse(data);
}

export function jsonScanFolder(folderpath: string): Array<{ lang: string, file: string }> {
    const dirData = fs.readdirSync(folderpath);
    const languageFiles = dirData.filter(entryName => {
        return entryName.match(/^[\w_-]+\.json$/i);
    }).map(entryName => {
        return {
            lang: path.basename(entryName, '.json'),
            file: entryName,
        };
    })
    return languageFiles;
}

/**
 * Parse json structure
 */
export function jsonParse(jsonData: anyobject): JsonToken[] {

    const plainObj = xpath_plain(jsonData);
    const result: JsonToken[] = [];
    for (const plainObjKey in plainObj) {
        result.push({
            key: plainObjKey,
            value: plainObj[plainObjKey],
        });
    }
    return result;
}
