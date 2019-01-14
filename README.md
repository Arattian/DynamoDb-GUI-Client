# DynamoDb-GUI-Client

## Cross-platform GUI client for DynamoDb

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Arattian/DynamoDb-GUI-Client/blob/master/LICENSE)

### [Release v3.1.0](https://github.com/Arattian/DynamoDb-GUI-Client/releases/tag/3.1.0)

#### [Download for MacOS (.dmg)](https://github.com/Arattian/DynamoDb-GUI-Client/releases/download/3.1.0/DynamoDbGUI-mac-3.1.0.dmg)

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
cd Dynamodb-GUI-Client
npm i
# Electron application build(This will build app for your OS)
npm run electron:build
```

## Features

* [x] Remote Access of AWS DynamoDB Service*
* [x] Local DynamoDB
* [x] Supports multiple databases
* View
  * Table view
    * [x] Records view
    * [x] Table schema view
* Operation
  * Record
    * [x] Add Record
    * [x] Edit Record
    * [x] Delete Record
  * Table
    * [x] Add Table
    * [x] Edit Table
    * [x] Delete Table
  * Filter by attribute value
  * Filter by attribute name

* For remote access, need to provide access and secret keys.All keys stored in localStorage.
