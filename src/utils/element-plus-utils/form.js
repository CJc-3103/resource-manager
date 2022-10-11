export const validForm = (formEl) => {
    return new Promise((res, rej) => {
        if (!formEl) return;
        formEl.validate((valid, fields) => {
            if (valid) {
                res();
            } else {
                if (rej) rej(fields);
            }
        });
    });
};

