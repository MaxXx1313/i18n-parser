"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id2url = exports.url2id = void 0;
/**
 * Parse url and extract spreadsheet ID
 */
function url2id(spreadsheetIdOrUrl) {
    if (!spreadsheetIdOrUrl.startsWith('http')) {
        // assume it's ID
        return spreadsheetIdOrUrl;
    }
    const u = new URL(spreadsheetIdOrUrl);
    const matchSuffix = u.pathname.match(/([^\/]+)(?:\/edit)/);
    if (matchSuffix && matchSuffix[1]) {
        return matchSuffix[1];
    }
    const matchPrefix = u.pathname.match(/(?:\/spreadsheets\/d\/)([^\/]+)/);
    if (matchPrefix && matchPrefix[1]) {
        return matchPrefix[1];
    }
    throw new Error('Cannot parse URL. Please, provide spreadsheet ID');
}
exports.url2id = url2id;
/**
 *
 */
function id2url(spreadsheetId) {
    return 'https://docs.google.com/spreadsheets/d/' + spreadsheetId;
}
exports.id2url = id2url;
