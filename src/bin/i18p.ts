#!/usr/bin/env node
import { parseToFolder } from "../parse";
import { hideBin } from 'yargs/helpers';
import * as process from "process";
import * as assert from "assert";
import * as yargs from "yargs";
import { ArgumentsCamelCase } from "yargs";
// import {findUpSync} from 'find-up';


// const configPath = findUpSync(['.i18prc']);
// const config = configPath ? JSON.parse(fs.readFileSync(configPath, {encoding: "utf-8"}).toString()) : {};

yargs(hideBin(process.argv))
    // .config(config)
    .command('parse', 'parse google spreadsheet and create i18n files', () => {
    }, async (argv: ArgumentsCamelCase<any>) => {
        assert.ok(argv.id, '--id is required');
        assert.ok(argv.folder, '--folder is required');
        await parseToFolder(argv.folder, argv.id);
    })
    .demandCommand(1)
    .parse()
