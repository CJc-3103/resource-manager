import {
    handleSuccess,
    handleReject,
} from "@/utils/handleCb";

// 兼容不同浏览器的实现
const getIDB = () => {
    IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
    IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

    if (IDBFactory) {
        return { IDBFactory, IDBTransaction, IDBKeyRange }
    } else {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return undefined;
    }
}
const IDB = getIDB();

//#region 若浏览器不支持 IndexedDB，则以下函数均返回空函数
// 数据库
let initDatabase = () => { };
let getDatabase = () => { };
let deleteDatabase = () => { };
// 请求
let createRequest = () => { };
// 数据库表
let initDBTables = () => { };
// 事务
let createTransaction = () => { };
let getTableByTransaction = () => { }; // 从事务对象中获取某个表对象
let createTableTransaction = () => { }; // 内部已包含事务对象的创建过程
// CURD
let IDBAddData = () => { };
let IDBPutData = () => { };
let IDBGetData = () => { };
let IDBDelData = () => { };
//#endregion


//#endregion

if (IDB) {
    // 创建一个连接请求
    createRequest = (databaseName, { onSuccess, onError, onUpgradeNeeded }) => {
        const request = IDB.IDBFactory.open(databaseName, 1);
        request.onsuccess = (event) => {
            handleSuccess(onSuccess, event, 'Request success.');
        }
        request.onerror = (event) => {
            handleReject(onError, event, 'Request Failed.');
        };
        request.onupgradeneeded = (event) => {
            if (onUpgradeNeeded) {
                onUpgradeNeeded(event.target.result, event);
            } else {
                console.log('IDB Database upgraded');
            }
        }
        return request;
    }
    // 创建并初始化数据库表
    initDBTables = (db, tablesConfig) => {
        if (!db || !tablesConfig) {
            console.error("Reference Error: parameters database and tablesConfig are necessary.");
        } else {
            tablesConfig.forEach(({ mainId, tableName, fieldList }) => {
                const mainIdx = mainId || { autoIncrement: true };

                // 建表时添加主键，这里使用默认索引；如需使用自定义索引，参数格式如下 { keyPath: "ssn" }
                let tableController = db.createObjectStore(tableName, mainIdx);
                // 添加其他索引
                fieldList.forEach(({ name, keyPath, isUnique }) => {
                    if (name) {
                        tableController.createIndex(name, keyPath || name, { unique: isUnique || false });
                    } else {
                        console.error('ReferenceError: failed to create new field, parameter "name" for field is necessary');
                    }
                });
            })
        }
    }
    // resolve request 对象
    initDatabase = (databaseName, tablesConfig) => {
        return new Promise((resolve, reject) => {
            // 初始化时是第一次连接数据库，由于此时数据库尚不存在，因此会触发 onupgradneeded 事件
            let reqResult = createRequest(databaseName, {
                onUpgradeNeeded: (db) => {
                    initDBTables(db, tablesConfig);
                },
            });
            if (reqResult) {
                handleSuccess(resolve, reqResult, 'Database initialized.');
            } else {
                handleReject(reject, reqResult, 'Failed to initialize database.');
            }
        })
    }
    // initDB = (databaseName, tablesConfig) => {
    //     // 建立数据库连接（初始化时会新建一个数据库）
    //     let request = IDB.IDBFactory.open(databaseName, 1);
    //     let db = null;
    //     let tableControllers = {};

    //     request.onerror = (event) => {
    //         console.log("Some error occurred when accessing to the IDB");
    //         console.log('event', event);
    //     };
    //     request.onsuccess = (event) => {
    //         db = event.target.result; // 初始化数据库对象
    //         console.log('request success');

    //         createTransaction = (tables, transactionType) => {
    //             let transaction = db.transaction(tables, transactionType || "readonly");
    //             transaction.oncomplete = function (event) {
    //                 console.log("Transaction success!");
    //                 getTableByTransaction = (tableName) => transaction.objectStore(tableName);
    //                 initTransactionFunc(transaction, createTableTransaction, IDBAddData, IDBGetData, IDBPutData, IDBDeleteData);
    //             };
    //             transaction.onerror = function (event) {
    //                 console.error('IndexedDB Transaction Error:', event);
    //             };
    //             return transaction;
    //         }

    //         db.onerror = function (event) {
    //             console.error("IDB Database error: " + event.target.errorCode);
    //         };
    //     };
    //     request.onupgradeneeded = (event) => {
    //         db = event.target.result;
    //         // 初始化数库表对象
    //         tablesConfig.forEach(({ mainId, tableName, fieldList }) => {
    //             const mainIdx = mainId || { autoIncrement: true };

    //             // 建表时添加主键，这里使用默认索引；如需使用自定义索引，参数格式如下 { keyPath: "ssn" }
    //             let tableController = db.createObjectStore(tableName, mainIdx);
    //             // tableControllers[tableName] = tableController;
    //             // 添加其他索引
    //             fieldList.forEach(({ name, keyPath, isUnique }) => {
    //                 if (name) {
    //                     tableController.createIndex(name, keyPath || name, { unique: isUnique || false });
    //                 } else {
    //                     console.error('ReferenceError: failed to create new field, parameter "name" for field is necessary');
    //                 }
    //             });
    //         })
    //     }
    //     return { request, tableControllers }
    // }
    deleteDatabase = (databaseName) => {
        return new Promise((resolve, reject) => {
            let result = IDB.IDBFactory.deleteDatabase(databaseName);;
            result.onsuccess = (event) => {
                handleSuccess(resolve, event, 'Database deleted.');
            }
            result.onerror = (event) => {
                handleReject(reject, event, 'Failed to delete database.');
            }
        })
    };
    // resolve database 对象
    getDatabase = (databaseName) => {
        return new Promise((resolve, reject) => {
            createRequest(databaseName, {
                onSuccess: (event) => {
                    handleSuccess(resolve, event.target.result, 'Database gotten.');
                },
                onError: (event) => {
                    handleReject(reject, event, 'Failed to get database.');
                }
            })
        });
    }
    // resolve transaction 对象
    createTransaction = (databaseName, tableNames, transactionType) => {
        return new Promise((resolve, reject) => {
            getDatabase(databaseName).then((db) => {
                if (resolve) {
                    let transaction = db.transaction(tableNames, transactionType || 'readonly');
                    transaction.oncomplete = (event) => {
                        handleSuccess(resolve, event, 'Transaction complete.');
                    }
                    transaction.onerror = (event) => {
                        handleReject(reject, event, 'Transaction failed.');
                    }
                    resolve(transaction)
                } else {
                    console.log('Transaction created');
                }
            }, (error) => {
                handleReject(reject, error, 'Failed to create transaction.');
            });
        });
    }

    //#region 
    // createTransaction = (databaseName, tableNames, transactionType) => {
    //     return new Promise((resolve, reject) => {
    //         getDatabase(databaseName).then((db) => {
    //             if (resolve) {
    //                 try {
    //                     let transaction = db.transaction(tableNames, transactionType || 'readonly');
    //                     resolve(transaction)
    //                 } catch (error) {
    //                     const errTxt = error || 'Failed to create transaction.';
    //                     if (reject) {
    //                         reject(errTxt);
    //                     } else {
    //                         console.log(errTxt);
    //                     }
    //                 }
    //             } else {
    //                 console.log('Transaction created');
    //             }
    //         }).catch((error) => {
    //             const errTxt = error || 'Failed to create transaction.';
    //             if (reject) {
    //                 reject(errTxt);
    //             } else {
    //                 console.log(errTxt);
    //             }
    //         });
    //     });
    // }
    //#endregion

    // resolve table 对象
    createTableTransaction = (databaseName, tableName, transactionType) => {
        return new Promise((resolve, reject) => {
            createTransaction(databaseName, [tableName], transactionType).then((transaction) => {
                const table = transaction.objectStore(tableName);
                handleSuccess(resolve, table, 'Table transaction created.');
            }, (error) => {
                handleReject(reject, error, 'Failed to create table transaction.');
            });
        })
    }
    // CURD
    IDBAddData = (databaseName, tableName, transactionType, data) => {
        return new Promise((resolve, reject) => {
            createTableTransaction(databaseName, tableName, transactionType).then((table) => {
                data = JSON.parse(JSON.stringify(data)); // ref 数据进来需要转换
                const result = table.add(data);

                result.onsuccess = (event) => {
                    // debugger
                    handleSuccess(resolve, event, 'New data added.');
                }
                result.onerror = (event) => {
                    console.log('Failed to add new data.');
                    console.log('event', event);
                }
            }, (error) => {
                console.log('event', error)
                reject(error);
            });
        })
    };
    IDBPutData = (databaseName, tableName, transactionType, key, data) => {
        return new Promise((resolve, reject) => {
            createTableTransaction(databaseName, tableName, transactionType).then((table) => {
                if (resolve) {
                    const result = table.put(data);
                    resolve(result);
                } else {
                    console.log('New data added')
                }
            }).catch((error) => {
                const errTxt = error || 'Failed to add new data.';
                if (reject) {
                    reject(errTxt);
                } else {
                    console.log(errTxt);
                }
            });
        })
    };
    IDBGetData = (databaseName, tableName, transactionType, key) => {
        return new Promise((resolve, reject) => {
            createTableTransaction(databaseName, tableName, transactionType).then((table) => {
                if (resolve) {
                    const result = table.add(data);
                    resolve(result);
                } else {
                    console.log('New data added');
                }
            }, (error) => {
                const errTxt = error || 'Failed to add new data.';
                if (reject) {
                    reject(errTxt);
                } else {
                    console.error(errTxt);
                }
            }).catch((error) => {
                const errTxt = error || 'Failed to add new data.';
                if (reject) {
                    reject(errTxt);
                } else {
                    console.error(errTxt);
                }
            });
        })
    };
    IDBDelData = () => { };

}

export {
    initDatabase,
    getDatabase,
    deleteDatabase,
    createRequest,
    createTransaction,
    getTableByTransaction,
    createTableTransaction,
    IDBAddData,
    IDBGetData,
    IDBPutData,
    IDBDelData,
};