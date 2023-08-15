import * as fs from "fs";
import { anyobject, isObject, plainObject } from "../lib/xpath";
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

    const result: JsonToken[] = [];

    for (const key in jsonData) {
        const value = jsonData[key];

        if (isObject(value)) {

            const plainObj = plainObject(value, key);
            for (const plainObjKey in plainObj) {
                result.push({
                    key: plainObjKey,
                    value: plainObj[plainObjKey],
                });
            }
        } else {
            result.push({
                key,
                value,
            });
        }
    }
    return result;
}
