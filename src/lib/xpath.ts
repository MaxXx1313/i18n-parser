export interface anyobject {
    [key: string]: any;
}

/**
 * extract object property value by point-divided selector like 'book.meta.author'
 * @param {object} obj
 * @param {string|Array<string>} path
 * @param {string} [separator:'.']
 * @return {*|null} value
 */
export function xpath_get(obj: anyobject, path: string | string[], separator = '.') {
    separator = (typeof separator == 'undefined') ? '.' : separator;
    let tokens = Array.isArray(path) ? path : path.split(separator);
    let result = obj;
    for (let i = 0; result && (i < tokens.length); i++) {
        result = result[tokens[i]];
    }
    return result;
}

type SortKeysFn = (a: string, b: string) => number;

/**
 * set object property value by point-divided selector like 'book.meta.author'
 * @param {T} obj
 * @param {string|Array<string>} path
 * @param opts
 * @param {string} [opts.separator='.']
 * @param {number} [opts.maxDepth=-1]
 * @param {function | boolean} [opts.sortFn] default is 'localeCompare'
 * @param {*} value
 *
 * @return {T} updated object
 */
export function xpath_set(
    obj: anyobject,
    path: string | string[],
    value: any,
    opts?: {
        separator?: string,
        maxDepth?: number,
        sortFn?: boolean | SortKeysFn,
    },
): anyobject {
    // default values
    opts = opts || {};
    opts.separator = (typeof opts.separator == 'undefined') ? '.' : opts.separator;
    opts.maxDepth = (typeof opts.maxDepth == 'undefined') ? -1 : opts.maxDepth;

    let sortFn: SortKeysFn | null = null;
    if (typeof opts.sortFn == 'function') {
        sortFn = opts.sortFn;
    } else if (opts.sortFn === true) {
        sortFn = (a, b) => a.localeCompare(b);
    }

    // prepare data
    let pathParts = Array.isArray(path) ? path : path.split(opts.separator);
    let maxDepth = Math.min(opts.maxDepth, pathParts.length - 1);

    let pathTokens = maxDepth >= 0 ? pathParts.slice(0, maxDepth) : pathParts.slice(0, -1);
    let valTokens = maxDepth >= 0 ? pathParts.slice(maxDepth) : [pathParts[pathParts.length - 1]];
    let valPart = valTokens.join(opts.separator);

    // find property
    let result = obj;
    for (let i = 0; result && (i < pathTokens.length); i++) {
        _setPropertyOrdered(result, pathTokens[i], result[pathTokens[i]] || {}, sortFn);
        result = result[pathTokens[i]];
    }

    // set value
    _setPropertyOrdered(result, valPart, value, sortFn);

    return obj;
}

// reorder keys
function _setPropertyOrdered(obj: anyobject, prop: string, value: any, sortFn?: SortKeysFn | null): void {
    obj[prop] = value;
    if ( !sortFn) {
        return;
    }
    const keys = Object.keys(obj).sort(sortFn);
    for (const k of keys) {
        const _value = obj[k];
        delete obj[k];
        obj[k] = _value;
    }
}

/**
 * delete object property by point-divided selector like 'book.meta.author'
 * Also delete all parent properties if they are empty
 * @param {T} obj
 * @param {string|Array<string>} path
 * @param {string} [separator = '.']
 * @param {boolean} [deleteEmpty=true]
 *
 * @return {object} updated object
 */
export function xpath_delete(obj: anyobject, path: string, separator = '.', deleteEmpty = true): anyobject {
    deleteEmpty = (typeof deleteEmpty == 'undefined') ? true : deleteEmpty;
    separator = (typeof separator == 'undefined') ? '.' : separator;
    let tokens = Array.isArray(path) ? path : path.split(separator);
    let result = obj;
    let deleteFrom = obj;
    let deleteFromIndex = 0;

    let i = 0;
    // -2 because we left last token for deletion
    for (; i <= tokens.length - 2; i++) {
        result = result[tokens[i]];
        if ( !result) {
            return obj;
        }

        //
        if ( !deleteEmpty || Object.keys(result).length > 1) {
            deleteFrom = result;
            deleteFromIndex = i;
        }
    }

    //
    if ( !deleteEmpty || Object.keys(result).length > 1) {
        deleteFrom = result;
        deleteFromIndex = i;
    }

    delete deleteFrom[tokens[deleteFromIndex]]; // here: i == length-1 in most cases
    return obj;
}


/**
 *
 */
export function xpath_plain(data: anyobject, prefix = ''): anyobject {
    const result: anyobject = {};
    const prefixStr = prefix ? prefix + '.' : '';

    for (const prop in data) {
        let val = data[prop];

        let innerObjPlain: { [key: string]: any };
        if (isObject(val)) {
            innerObjPlain = xpath_plain(val, prop);
        } else {
            innerObjPlain = {[prop]: val};
        }

        for (const valPlainKey in innerObjPlain) {
            if (result[prefixStr + valPlainKey]) {
                console.warn('Duplicated keys found: "' + prefixStr + valPlainKey + '". Result contains the latest value');
            }
            result[prefixStr + valPlainKey] = innerObjPlain[valPlainKey];
        }
    }
    return result;
}


/**
 *
 */
export function isObject(val: any) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}





