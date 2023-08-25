/**
 *
 */
export interface JsonToken {
    key: string;
    value: string;
}

export interface LangData {
    [lang: string]: JsonToken[];
}
