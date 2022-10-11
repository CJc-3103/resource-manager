import { idbTopic } from '@/indexedDB'

const addTopic = (topicObj) => {
    return idbTopic.idbAddTopic(topicObj)
};
const getAllTopics = () => { return idbTopic.idbGetAllTopics() }
const getTopicById = (id) => { return idbTopic.idbQueryTopic(id) }
const updateTopic = (topicObj) => { return idbTopic.idbUpdateTopic(topicObj) }
const deleteTopic = (topicId) => { return idbTopic.idbDeleteTopic(topicId) }

export { addTopic, getAllTopics, getTopicById, updateTopic, deleteTopic }