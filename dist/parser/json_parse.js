"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParse = exports.jsonScanFolder = exports.jsonParseFile = void 0;
const fs = require("fs");
const path = require("path");
const xpath_1 = require("../lib/xpath");
/**
 * Parse json file and produce structured result
 */
function jsonParseFile(filepath) {
    const jsonDataStr = fs.readFileSync(filepath, { encoding: "utf-8" });
    let data = JSON.parse(jsonDataStr);
    return jsonParse(data);
}
exports.jsonParseFile = jsonParseFile;
function jsonScanFolder(folderpath) {
    const dirData = fs.readdirSync(folderpath);
    const languageFiles = dirData.filter(entryName => {
        return entryName.match(/^[\w_-]+\.json$/i);
    }).map(entryName => {
        return {
            lang: path.basename(entryName, '.json'),
            file: entryName,
        };
    });
    return languageFiles;
}
exports.jsonScanFolder = jsonScanFolder;
/**
 * Parse json structure
 */
function jsonParse(jsonData) {
    const plainObj = (0, xpath_1.xpath_plain)(jsonData);
    const result = [];
    for (const plainObjKey in plainObj) {
        result.push({
            key: plainObjKey,
            value: plainObj[plainObjKey],
        });
    }
    return result;
}
exports.jsonParse = jsonParse;
