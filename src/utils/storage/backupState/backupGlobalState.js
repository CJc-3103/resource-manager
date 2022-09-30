import store from '@/store'
import { getItem, setItem, removeItem } from '../utils'

const backupKey = 'backupGlobalState';
const recoverFromLocal = () => {
    const backup = getItem(backupKey);
    if (backup) {
        store.replaceState(Object.assign({}, store.state, JSON.parse(backup)));
    }
}
const backup2Local = () => {
    setItem(backupKey, JSON.stringify(store.state));
}
const removeBackupInLocal = () => removeItem(backupKey);

export { recoverFromLocal, backup2Local, removeBackupInLocal }