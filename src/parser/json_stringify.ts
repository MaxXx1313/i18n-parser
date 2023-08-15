import * as fs from "fs";
import { anyobject, xpath_set } from "../lib/xpath";
import { JsonToken } from "./JsonToken.interface";

/**
 * Set json data
 */
export function jsonStringifyFile(path: string, data: JsonToken[]) {
    const jsonData = jsonStringify(data);
    const jsonDataStr = JSON.stringify(jsonData);
    return fs.writeFileSync(path, jsonDataStr, {encoding: "utf-8"});
}

/**
 * Set json data
 * TODO: add options later? opts?: { sectionDepth?: number }
 */
export function jsonStringify(data: JsonToken[]): anyobject {
    const sectionDepth = 1;
    const result = {};

    for (const token of data) {
        xpath_set(result, token.key, token.value, '.', 2);
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
