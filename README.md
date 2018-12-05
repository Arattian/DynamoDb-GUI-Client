# DynamoDb-GUI-Client
## Cross-platform GUI client for DynamoDb(Under Development)

### Builded Electron Application
* [.deb](https://www.dropbox.com/s/6evuca09vy89e3d/DynamoDbGUI-linux-amd64-1.0.0.deb?dl=0)
* [.AppImage](https://www.dropbox.com/s/ihscol2qg013r4g/DynamoDbGUI-linux-x86_64-1.0.0.AppImage?dl=0)

[How to open .AppImage files on Linux](https://itsfoss.com/use-appimage-linux/)

![Logo](src/assets/git-logo.png)

:eyes:
![Logo](src/assets/App-View.png)

## To-Do List
* [ ] MacOS build
* [ ] Windows build

## Run

```bash
git clone https://github.com/Arattian/DynamoDb-GUI-Client.git
cd Dynamodb-GUI-Client
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
