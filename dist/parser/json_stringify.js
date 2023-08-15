"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonStringify = exports.jsonStringifyFile = void 0;
const fs = require("fs");
const xpath_1 = require("../lib/xpath");
const path = require("path");
/**
 * Set json data
 */
function jsonStringifyFile(filepath, data) {
    const jsonData = jsonStringify(data);
    const jsonDataStr = JSON.stringify(jsonData, null, 4);
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    return fs.writeFileSync(filepath, jsonDataStr, { encoding: "utf-8" });
}
exports.jsonStringifyFile = jsonStringifyFile;
/**
 * Set json data
 * TODO: add options later? opts?: { sectionDepth?: number }
 */
function jsonStringify(data) {
    const sectionDepth = 1;
    const result = {};
    for (const token of data) {
        (0, xpath_1.xpath_set)(result, token.key, token.value, '.', 1);
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
exports.jsonStringify = jsonStringify;
