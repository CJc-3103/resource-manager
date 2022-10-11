import { idbAddTopic, idbQueryTopic, idbUpdateTopic, idbDeleteTopic } from '@/indexedDB'

const addTopic = (topicObj) => {
    return idbAddTopic(topicObj)
};
const getTopicById = (id, changes) => { return idbQueryTopic(id, changes); }
const updateTopic = (topicObj) => { return idbUpdateTopic(topicObj); }
const deleteTopic = (topicName) => { return idbDeleteTopic(topicName); }

export { addTopic, getTopicById, updateTopic, deleteTopic } 