import {
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
} from './utils'

const DATABASE_NAME = 'resourceManager';
const TABLE_NAMES = { TOPIC: 'topic', TAG: 'tag', RESOURCE: 'resource' };
const tablesConfig = [
    {
        tableName: TABLE_NAMES.TOPIC,
        fieldList: [
            {
                name: 'topicName',
                isUnique: true,
            },
            {
                name: 'addrType',
            },
        ],
    },
    {
        tableName: TABLE_NAMES.TAG,
        fieldList: [
            {
                name: 'tagName',
                isUnique: true,
            },
            {
                name: 'parent',
            },
            {
                name: 'children',
            },
        ],
    },
    {
        tableName: TABLE_NAMES.RESOURCE,
        fieldList: [
            {
                name: 'url',
                isUnique: true,
            },
            {
                name: 'resourceName',
            },
            {
                name: 'addrType',
            },
            {
                name: 'tagList',
            },
            {
                name: 'group',
            },
            {
                name: 'addedTime',
            },
        ],
    },
];

// const { db } = initDB(DATABASE_NAME, tablesConfig);

// const transaction = createTransaction(db, Object.values(TABLE_NAMES));

// const transactionTopic = transaction.objectStore(TABLE_NAMES.TOPIC),
//     transactionTag = transaction.objectStore(TABLE_NAMES.TAG),
//     transactionResource = transaction.objectStore(TABLE_NAMES.RESOURCE);
// 后续使用 add/put/get/delete 执行 CURD 操作

// export { transactionTopic, transactionTag, transactionResource }


const testInitDB = () => {
    initDatabase(DATABASE_NAME, tablesConfig);
}
const testGetDatabase = () => getDatabase(DATABASE_NAME)
const testDeleteDB = () => deleteDatabase(DATABASE_NAME);
const testCreateTransaction = () => createTransaction(DATABASE_NAME, [TABLE_NAMES.TOPIC], 'readwrite');
const testCreateTopicTransaction = () => createTableTransaction(DATABASE_NAME, TABLE_NAMES.TOPIC, 'readwrite');

const testAddTopic = (data) => IDBAddData(DATABASE_NAME, [TABLE_NAMES.TOPIC], 'readwrite', data);



export { testInitDB, testGetDatabase, testDeleteDB, testCreateTransaction, testCreateTopicTransaction, testAddTopic }
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
}