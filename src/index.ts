import { jsonParseFile, jsonStringifyFile } from "./parser";

console.log('hello');


const result = jsonParseFile('./assets/sample1/en.json');

console.log(result);

jsonStringifyFile('./assets/sample-result/en.json', result);
