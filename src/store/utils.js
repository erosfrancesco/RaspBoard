export const parseLocalConfig = (str) => {
    return JSON.parse(str);
}

export const stringifyConfig = (config) => {
    return JSON.stringify(config, '\\n', 2);
}

export const saveConfigToLocal = (config, key) => {
    const configs = stringifyConfig(config);
    localStorage.setItem(key, configs);
}

export const loadConfigFromLocal = (key) => {
    const str = localStorage.getItem(key);
    return parseLocalConfig(str);
}