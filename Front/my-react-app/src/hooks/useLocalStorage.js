import { useState, useEffect, useRef, useCallback } from 'react';

export function useLocalStorage(
    key,
    initialValue,
    {
        serialize = JSON.stringify,
        deserialize = JSON.parse,
        sync = true,
    } = {}
) {
    const keyRef = useRef(key);
    const serializersRef = useRef({ serialize, deserialize });

    const [value, setValue] = useState(() => {
        if (typeof window === 'undefined') return resolve(initialValue);
        try {
            const raw = window.localStorage.getItem(key);
            if (raw === null) {
                const init = resolve(initialValue);
                window.localStorage.setItem(key, serialize(init));
                return init;
            }
            return deserialize(raw);
        } catch {
            return resolve(initialValue);
        }
    });

    useEffect(() => {
        if (keyRef.current !== key) {
            try {
                window.localStorage.setItem(key, serializersRef.current.serialize(value));
            } catch {}
            keyRef.current = key;
        }
    }, [key, value]);

    const setStored = useCallback(updater => {
        setValue(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            try {
                window.localStorage.setItem(keyRef.current, serializersRef.current.serialize(next));
                dispatchSync(keyRef.current, next);
            } catch {}
            return next;
        });
    }, []);

    const remove = useCallback(() => {
        try {
            window.localStorage.removeItem(keyRef.current);
            dispatchSync(keyRef.current, undefined);
        } catch {}
        setValue(undefined);
    }, []);

    useEffect(() => {
        if (!sync) return;
        function storage(e) {
            if (e.key !== keyRef.current) return;
            if (e.newValue == null) setValue(undefined);
            else {
                try {
                    setValue(serializersRef.current.deserialize(e.newValue));
                } catch {}
            }
        }
        function local(e) {
            if (e.detail?.key === keyRef.current) setValue(e.detail.value);
        }
        window.addEventListener('storage', storage);
        window.addEventListener('__ls_sync__', local);
        return () => {
            window.removeEventListener('storage', storage);
            window.removeEventListener('__ls_sync__', local);
        };
    }, [sync]);

    return [value, setStored, { remove, key: keyRef.current }];
}

function resolve(v) { return typeof v === 'function' ? v() : v; }
function dispatchSync(key, value) {
    try {
        window.dispatchEvent(new CustomEvent('__ls_sync__', { detail: { key, value } }));
    } catch {}
}