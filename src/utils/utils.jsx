export const formatString = (template, ...values) => {
  return `'${template.replace(/{}/g, () => values.shift())}'`;
};

export const handleToggleState = (setState, value, optional = {}) => {
  setState(value.enable !== undefined ? value.enable : value);
  if (optional?.retrieval) {
    setKeyLocalStorage(optional?.key, optional?.data, value);
  }
};

export const setKeyLocalStorage = (key, data, value) => {
  const settings = JSON.parse(localStorage.getItem(key));
  settings[data.key] = value?.enable !== null || undefined ? value : value;
  localStorage.setItem(key, JSON.stringify(settings));
};

export const setMonacoOverflowProperty = (doc, property) => {
  const MonacoEditors = doc.querySelectorAll("monaco-editor");
  MonacoEditors.forEach((editor) => {
    editor.style.overflow = property;
  });
};
