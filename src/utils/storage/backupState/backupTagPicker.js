import { getItem, setItem, removeItem } from '../utils'

const backupKey = 'backupTagPicker';
const recoverFromLocal = () => {
    return JSON.parse(getItem(backupKey));
}
const backup2Local = (datas) => {
    setItem(backupKey, JSON.stringify(datas));
}
const removeBackupInLocal = () => removeItem(backupKey);

export { recoverFromLocal, backup2Local, removeBackupInLocal }