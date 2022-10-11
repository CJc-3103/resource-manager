import Dexie from "dexie";

const DATABASE_NAME = 'resourceManager';
// export const DB_TABLES = { TOPIC: 'topic', TAG: 'tag', RESOURCE: 'resource' }

// export let db = null;
export const db = new Dexie(DATABASE_NAME);
db.version(1).stores({
    topic: '++id, &topicName',
    tag: '++id, &tagName, parent, children',
    resource: '++id, &url, resourceName, pathType, tagList',
});
db.transaction('r', ['topic'], () => { });

export const deleteDB = () => db.delete();

export const resetDB = () => {
    deleteDB();
    initDB();
}

// 操作主题，可以直接根据 id ，但需要保证每次更新后 id 对应不变
export const idbAddTopic = (topicObj) => {
    return db.topic.put(topicObj);
    // return new Promise((res, rej) => {
    //     const id = db.topic.put(topicObj)
    //     if (id) {
    //         res(id);
    //     }
    // })
}

export const idbGetTopicById = (id) => { return db.topic.get(id); }

export const idbUpdateTopic = (topicObj) => {
    const id = db.topic.put(topicObj);
    db.topic.put(topicObj);
}

export const idbDeleteTopic = (topicName) => db.topic.add(topicName);