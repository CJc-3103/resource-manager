<template>
  <div class="btn-group">
    <el-button @click="handleCreateDB">初始化数据库</el-button>
    <el-button @click="handleDeleteDB">删除数据库</el-button>

    <el-button @click="handleTransaction">测试事务</el-button>
  </div>

  <div class="btn-group">
    <el-button @click="handleAddData">添加数据</el-button>
    <el-button @click="handleUpdateData">更新数据</el-button>
    <el-button @click="handleDeleteData">删除数据</el-button>
    <el-button @click="handleQueryData">查询数据</el-button>
  </div>
</template>

<script setup>
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
} from '@/indexedDB';
import {
  testInitDB,
  testGetDatabase,
  testDeleteDB,
  testCreateTransaction,
  testCreateTopicTransaction,
  testAddTopic,
} from '@/indexedDB';
import { ref } from 'vue';

let topicTransaction = null;
const handleCreateDB = () => {
  let db = testInitDB();
};
const handleDeleteDB = () => {
  testDeleteDB();
};

const handleTransaction = () => {
  testGetDatabase().then((db) => {
    console.log('db', db);
  });
};

// const newData = { topicName: '收藏夹', addrType: 'internet' };
const newData = ref({ topicName: '图片', addrType: 'internet' });
let topicTable = null;
const handleAddData = () => {
  //   testCreateTransaction();
  //   testCreateTopicTransaction();
  //   testAddTopic(newData.value).then().catch();
  testAddTopic(newData.value).then(
    (result) => {
      console.log('result', result);
    }
    // (event) => {
    //   console.log(event.target.error);
    // }
  );
};
const handleUpdateData = () => {
  //   console.log('newData', newData.value);
  console.log('createTableTransaction', createTableTransaction);
};
const handleDeleteData = () => {};
const handleQueryData = () => {};
</script>
