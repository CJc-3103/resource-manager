import store from '@/store'
import { getItem, setItem, removeItem } from './index'

const backupKey = 'backupState';
const recoverFromLocal = () => {
    let backup = getItem(backupKey);
    if (backup) {
        store.replaceState(Object.assign({}, store.state, JSON.parse(backup)));
    }
    removeItem(backupKey);
}
const backup2Local = () => {
    setItem(backupKey, JSON.stringify(store.state));
}

export { recoverFromLocal, backup2Local }