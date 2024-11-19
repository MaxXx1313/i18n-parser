import * as fs from "fs";
import { anyobject, xpath_set } from "../lib/xpath";
import { JsonToken } from "../interface/parser.interface";
import * as path from "path";

/**
 * Set json data
 */
export function jsonStringifyFile(filepath: string, data: JsonToken[]) {
    const jsonData = jsonStringify(data);
    const jsonDataStr = JSON.stringify(jsonData, null, 4);
    fs.mkdirSync(path.dirname(filepath), {recursive: true});
    return fs.writeFileSync(filepath, jsonDataStr, {encoding: "utf-8"});
}

/**
 * Set json data
 * TODO: add options later? opts?: { sectionDepth?: number }
 */
export function jsonStringify(data: JsonToken[]): anyobject {
    const sectionDepth = 1;
    const result = {};

    for (const token of data) {
        xpath_set(result, token.key, token.value, {maxDepth: 1, sortFn: true});
    }
    return result;

    // collect groups
    // const sectionHash: { [section: string]: JsonToken[] } = {};
    //
    // for (const token of data) {
    //     const parts = token.key.split('.', 2);
    //     let section = parts[0];
    //     let remains = parts[1];
    //     if (parts.length === 1) {
    //         // no section
    //         section = '';
    //         remains = token.key;
    //     }
    //
    //     // add to group
    //     sectionHash[section] = sectionHash[section] || [];
    //     sectionHash[section].push({
    //         key: remains,
    //         value: token.value,
    //     });
    // }

    // combine groups
    // const result: anyobject = {};
    // for (const section in sectionHash) {
    //
    //     const tokenArr = sectionHash[section];
    //     for (const jsonToken of tokenArr) {
    //
    //         if ( !section) {
    //
    //             for (const jsonToken of tokenArr) {
    //                 result[jsonToken.key] = jsonToken.value;
    //             }
    //
    //         } else{
    //
    //         }
    //         sectionData[jsonToken.key] = jsonToken.value;
    //     }
    //
    //     // add to section
    //     if ( !section) {
    //         for (const key in sectionData) {
    //             result[key] = sectionData[key];
    //         }
    //     } else {
    //         for (const jsonToken of tokenArr) {
    //             result[jsonToken.key] = jsonToken.value;
    //         }
    //     }
    // }
}
