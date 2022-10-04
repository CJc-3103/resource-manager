
export const handleCb = (cb, data, logFn, logKey, logTxt, dataKey) => {
    if (cb && cb instanceof Function) {
        cb(data);
    } else {
        console[logFn](logKey || 'logTxt', logTxt);
        console[logFn](dataKey || 'data', data);
    }
}

export const handleSuccess = (cb, data, logTxt) => {
    handleCb(cb, data, 'log', 'Success log:', logTxt || 'Callback success.', 'data')
}
export const handleReject = (cb, error, logTxt) => {
    handleCb(cb, error, 'error', 'Error log', logTxt || 'Callback rejected.', 'error')
}