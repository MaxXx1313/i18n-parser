import * as fs from "fs";
import { anyobject, xpath_plain } from "../lib/xpath";
import { JsonToken } from "./JsonToken.interface";

/**
 * Parse json file and produce structured result
 */
export function jsonParseFile(path: string) {
    const jsonDataStr = fs.readFileSync(path, {encoding: "utf-8"});
    let data = JSON.parse(jsonDataStr);
    return jsonParse(data);
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
