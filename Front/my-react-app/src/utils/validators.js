export function required(msg = 'Required') {
    return v => (v == null || v === '' ? msg : undefined);
}
export function minLength(len, msg) {
    return v => (v && v.length < len ? (msg || `Must be at least ${len} characters`) : undefined);
}
export function email(msg = 'Invalid email') {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return v => (v && !re.test(v) ? msg : undefined);
}
export function composeValidators(...validators) {
    return v => {
        for (const fn of validators) {
            const err = fn(v);
            if (err) return err;
        }
        return undefined;
    };
}