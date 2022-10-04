import Dexie from "dexie";

const DATABASE_NAME = 'resourceManager';
// export const DB_TABLES = { TOPIC: 'topic', TAG: 'tag', RESOURCE: 'resource' }

export const db = new Dexie(DATABASE_NAME);
export const deleteDB = () => db.delete();

db.version(1).stores({
    topic: '++id, &topicName, addrType',
    tag: '++id, &tagName, parent, children',
    resource: '++id, &url, resourceName, addrType, tagList, group, addedTime',
});

// 操作主题，可以直接根据 id ，但需要保证每次更新后 id 对应不变
export const addTopic = (topicObj) => db.topic.add(topicObj);

export const queryTopic = (id, changes) => db.topic.update(id, changes);

export const updateTopic = (topicObj) => {
    const id = db.topic.put(topicObj);
    db.topic.put(topicObj);
}

export const deleteTopic = (topicName) => db.topic.add(topicName);

