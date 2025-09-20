export function required(msg = 'Required') {
    return v => (v == null || v === '' ? msg : undefined);
}

export function email(msg = 'Invalid email') {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return v => (v && !re.test(v) ? msg : undefined);
}
