/**
 * Parse url and extract spreadsheet ID
 */
export function url2id(spreadsheetIdOrUrl: string): string {
    if ( !spreadsheetIdOrUrl.startsWith('http')) {
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

/**
 *
 */
export function id2url(spreadsheetId: string): string {
    return 'https://docs.google.com/spreadsheets/d/' + spreadsheetId;
}
