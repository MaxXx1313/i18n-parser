#!/usr/bin/env node
import { parseToFolder } from "../parse";
import { hideBin } from 'yargs/helpers';
import * as process from "process";
import * as assert from "assert";
import * as yargs from "yargs";
import { ArgumentsCamelCase } from "yargs";
import * as findUp from 'find-up';
import * as fs from "fs";
import { publishFolder } from "../publish";
import { id2url, url2id } from "../googlesheet/parse-url";


const configPath = findUp.sync(['.i18prc', 'i18p.json']);
if (configPath) {
    console.debug('Using config:', configPath);
}

const config = configPath ? JSON.parse(fs.readFileSync(configPath, {encoding: "utf-8"}).toString()) : {};

yargs(hideBin(process.argv))
    .config(config)
    .command('parse', 'parse google sheet and create i18n files', () => {
    }, async (argv: ArgumentsCamelCase<any>) => {
        assert.ok(argv.id, '--id is required');
        assert.ok(argv.folder, '--folder is required');
        assert.ok(argv.keyFile, '--keyFile is required');
        await parseToFolder(argv.keyFile, argv.folder, argv.id, {
            sheetName: argv.sheet,
            skipEmpty: !!argv.skipEmpty,
        });
    })
    .command('publish', 'copy i18n data to google sheet', () => {
    }, async (argv: ArgumentsCamelCase<any>) => {
        assert.ok(argv.id, '--id is required');
        assert.ok(argv.folder, '--folder is required');
        assert.ok(argv.keyFile, '--keyFile is required');
        await publishFolder(argv.keyFile, argv.folder, argv.id, {sheetName: argv.sheet});
    })
    .option('id', {
        type: 'string',
        description: 'Spreadsheet ID or URL'
    })
    .option('folder', {
        type: 'string',
        description: 'local path for i18n files'
    })
    .option('keyFile', {
        type: 'string',
        description: 'local path to "Service Account" key file'
    })
    .option('sheet', {
        type: 'string',
        description: '(optional) Sheet name'
    })
    .option('skip-empty', {
        type: 'boolean',
        description: 'Skip empty cells'
    })
    .alias('h', 'help')
    .command('info', 'Print spreadsheet link', () => {
    }, (argv: ArgumentsCamelCase<any>) => {
        if (argv.id) {
            const spreadsheetId = url2id(argv.id);
            const link = id2url(spreadsheetId);
            console.log('Spreadsheet:', link);
        } else {
            console.log('Spreadsheet:', 'NOT SET');
        }

        if (argv.sheet) {
            console.log('Sheet name:', argv.sheet);
        } else {
            console.log('Sheet name not set');
        }
    })
    .demandCommand(1)
    .parse()
