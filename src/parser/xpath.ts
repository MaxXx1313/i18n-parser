export interface anyobject {
    [key: string]: any;
}

/**
 *
 */
export function plainObject(data: anyobject, prefix = ''): anyobject {
    const result: anyobject = {};
    const prefixStr = prefix ? prefix + '.' : '';

    for (const prop in data) {
        let val = data[prop];

        let innerObjPlain: { [key: string]: any };
        if (isObject(val)) {
            innerObjPlain = plainObject(val, prop);
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


export function isObject(val: any) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
