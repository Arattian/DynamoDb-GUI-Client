# DynamoDb-GUI-Client

### (This project is no longer supported)
First, of all, I really appreciate the work of everyone who contributed to this project so far. This was really challenging and interesting project for me when I get my first job in programming. Unfortunately due to the lack of time and loss of personal interest on this, I will no longer contribute to this project. Thank you very much for supporting me and for every star given to this project. Also, I want to share with you the app that I just saw for database management directly from AWS development team, give it a try they did a good job [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html). 
Sincerely yours [Arattian::LinkedIn](https://www.linkedin.com/in/misakpoghosyan/)

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

## Cross-platform GUI client for DynamoDb

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Arattian/DynamoDb-GUI-Client/blob/master/LICENSE)

### [Release v3.3.1](https://github.com/Arattian/DynamoDb-GUI-Client/releases/tag/3.3.1)

#### [Download for MacOS (.dmg)](https://github.com/Arattian/DynamoDb-GUI-Client/releases/download/3.3.1/DynamoDbGUI-mac-3.3.1.dmg)

#### [Download for MacOS (.zip)](https://github.com/Arattian/DynamoDb-GUI-Client/releases/download/3.3.1/DynamoDbGUI-mac-3.3.1.zip)

### [Release v2.1.1 || Old UI](https://github.com/Arattian/DynamoDb-GUI-Client/releases/tag/v2.1.1)

#### [Download for Debian (.deb)](https://github.com/Arattian/DynamoDb-GUI-Client/releases/download/v2.1.1/DynamoDbGUI-linux-amd64-2.1.1.deb)

#### [Download for Linux (.AppImage)](https://github.com/Arattian/DynamoDb-GUI-Client/releases/download/v2.1.1/DynamoDbGUI-linux-x86_64-2.1.1.AppImage)

![Logo](src/assets/git-logo.png)

:eyes:
![Logo](https://i.imgur.com/24jcqzs.png)

## Run

```bash
git clone https://github.com/Arattian/DynamoDb-GUI-Client.git
cd DynamoDb-GUI-Client
npm i
# Electron serve
npm run electron:serve
# Vue Cli serve
npm start
```

## Build Instructions

```bash
git clone https://github.com/Arattian/DynamoDb-GUI-Client.git
cd DynamoDb-GUI-Client
npm i
# Electron application build(This will build app for your OS)
npm run electron:build
```

## Features

- [x] Remote Access of AWS DynamoDB Service\*
- [x] Local DynamoDB
- [x] Supports multiple databases
- View
  - Table view
    - [x] Records view
    - [x] Table schema view
- Operation

  - Record
    - [x] Add Record
    - [x] Edit Record
    - [x] Delete Record
  - Table
    - [x] Add Table
    - [x] Edit Table
    - [x] Delete Table
  - Filter by attribute value
  - Filter by attribute name

- For remote access, need to provide access and secret keys.All keys stored in localStorage.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/Arattian"><img src="https://avatars3.githubusercontent.com/u/36269636?v=4" width="100px;" alt="Misak Poghosyan"/><br /><sub><b>Misak Poghosyan</b></sub></a><br /><a href="#infra-Arattian" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Arattian/DynamoDb-GUI-Client/commits?author=Arattian" title="Tests">⚠️</a> <a href="#talk-Arattian" title="Talks">📢</a> <a href="#tool-Arattian" title="Tools">🔧</a> <a href="#maintenance-Arattian" title="Maintenance">🚧</a> <a href="https://github.com/Arattian/DynamoDb-GUI-Client/commits?author=Arattian" title="Code">💻</a></td><td align="center"><a href="https://github.com/gevorggalstyan"><img src="https://avatars2.githubusercontent.com/u/2598355?v=4" width="100px;" alt="Gevorg A. Galstyan"/><br /><sub><b>Gevorg A. Galstyan</b></sub></a><br /><a href="#ideas-gevorggalstyan" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-gevorggalstyan" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-gevorggalstyan" title="Maintenance">🚧</a> <a href="#talk-gevorggalstyan" title="Talks">📢</a> <a href="https://github.com/Arattian/DynamoDb-GUI-Client/commits?author=gevorggalstyan" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
