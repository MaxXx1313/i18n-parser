#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../parse");
const helpers_1 = require("yargs/helpers");
const process = require("process");
const assert = require("assert");
const yargs = require("yargs");
const findUp = require("find-up");
const fs = require("fs");
const publish_1 = require("../publish");
const configPath = findUp.sync(['.i18prc', 'i18p.json']);
if (configPath) {
    console.debug('Using config:', configPath);
}
const config = configPath ? JSON.parse(fs.readFileSync(configPath, { encoding: "utf-8" }).toString()) : {};
yargs((0, helpers_1.hideBin)(process.argv))
    .config(config)
    .command('parse', 'parse google sheet and create i18n files', () => {
}, async (argv) => {
    assert.ok(argv.id, '--id is required');
    assert.ok(argv.folder, '--folder is required');
    assert.ok(argv.keyFile, '--keyFile is required');
    await (0, parse_1.parseToFolder)(argv.keyFile, argv.folder, argv.id, argv.sheet);
})
    .command('publish', 'copy i18n data to google sheet', () => {
}, async (argv) => {
    assert.ok(argv.id, '--id is required');
    assert.ok(argv.folder, '--folder is required');
    assert.ok(argv.keyFile, '--keyFile is required');
    await (0, publish_1.publishFolder)(argv.keyFile, argv.folder, argv.id, argv.sheet);
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
    .demandCommand(1)
    .parse();
