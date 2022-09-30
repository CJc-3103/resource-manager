import { getItem, setItem, removeItem } from '../utils'

const backupKey = 'backupResourceSelection';
const recoverFromLocal = () => {
    return JSON.parse(getItem(backupKey));
}
const backup2Local = (selectionData) => {
    setItem(backupKey, JSON.stringify(selectionData));
}
const removeBackupInLocal = () => removeItem(backupKey);

export { recoverFromLocal, backup2Local, removeBackupInLocal }