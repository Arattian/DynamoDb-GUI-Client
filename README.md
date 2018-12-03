# DynamoDb-Vue-Electron
## Cross-platform GUI client for DynamoDb(Under Development)

![Logo](src/assets/git-logo.png)

:eyes:
![Logo](src/assets/App-View.png)

## Run


```bash
git clone https://github.com/Arattian/DynamoDb-Vue-Electron.git
cd Dynamodb-Vue-Electron
npm i
# Electron serve
npm run electron:serve
# Vue Cli serve
npm start
```


## Features

* [x] Remote Access of AWS DynamoDB Service*
* [x] Local DynamoDB
* [x] Supports multiple databases
* View
  * Table view
    * [x] Records view
    * [x] Table schema view
  * [x] JSON view
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
    
* For remote access, need to provide access and secret keys.All keys stored in localstorage.
