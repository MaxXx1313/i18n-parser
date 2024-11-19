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
        (0, xpath_1.xpath_set)(result, token.key, token.value, { maxDepth: 1, sortFn: true });
    }
    return result;
}
exports.jsonStringify = jsonStringify;
