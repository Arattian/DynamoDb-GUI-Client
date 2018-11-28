# DynamoDb-Vue
## GUI client for DynamoDb

![Logo](src/assets/git-logo.png)

## **To Do List**
* [ ] Wrap application with electron
### **Problems**
* [ ] AWS-SDK is not working properly in electron. Util.Streams got undefined.
* [ ] Electron doesn't support localstorage, so need to switch from localstorage to file system.

## run

```bash
git clone https://github.com/Arattian/DynamoDb-Vue.git
cd Dynamodb-Vue
npm i
npm start
```

## features

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
