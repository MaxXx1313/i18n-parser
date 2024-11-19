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
}
