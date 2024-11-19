# i18p

i18n parser is a tool to parse Google Sheets into `i18n/{lang}.json` files and vice-versa.

## Install

TODO: update installation

```bash
npm install --save-dev "git+https://github.com/MaxXx1313/i18n-parser.git#1.3"
```

### 1. GCP configuration

It's essential to create service account in GCP:

* Create GCP project ( https://console.cloud.google.com/projectcreate)
* Enable Sheet API (https://console.cloud.google.com/marketplace/product/google/sheets.googleapis.com)
* Create SA account (https://console.cloud.google.com/apis/credentials)
    * create new "Service Account"
    * download key for the account created
* Share target spreadsheet to the account created (Write permission is needed to 'publish' only)

### 2. Local configuration

Create configuration file `i18p.json` with the following content:

```json
{
  "id": "1n9-ZIb*************************************",
  "sheet": "Sheet1",
  "folder": "assets/i18n",
  "skipEmpty": false,
  "keyFile": "./config/i18n-sync@my-project.iam.gserviceaccount.com.json"
}

```

Here:

* `id` - spreadsheet ID (https://docs.google.com/spreadsheets/d/{!!HERE-IS-ID!!}/edit). It's possible to provide the
  link itself, but it's more reliable to provide the ID
* `folder` - local path for i18n files. It should be a FOLDER, because many files will be created there
* `keyFile` - local path to "Service Account" key file
* `sheet` - sheet name inside the spreadsheet. If the spreadsheet contains multiple sheets it's recommended to provide
  the name, otherwise it's parsing the first sheet.
* `skipEmpty` - (default false) ignore empty cells

## Usage

* `npx i18p parse` - parse google sheet and create 'json' files (one file for each language)
* `npx i18p publish` - copy i18n data from 'json' files to google sheet (multiple files will be combined in one sheet)

## Google Sheet template

First row contains language tokens, which is used to create translation file, i.e. `en` -> `en.json`
First column contains translation tokens, which is used in the application.
First top left cell (A1) contains `token` word, which should not be changed.

| token         | en     | it      |
|---------------|--------|---------|
| button.save   | Save   | Salva   |
| button.cancel | Cancel | Annulla |

## Development

Run `npm run dev` to build and run the tool
