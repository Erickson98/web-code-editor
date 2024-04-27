import { propertiesGlobal } from "../../../const";
import { decodeBase64, urlEncode } from "../../URLBase64Utils";
import { LocalStorage } from "../../localStorage/localStorage";
import { v4 as uuidv4 } from "uuid";
export const updateElementFromHistory = (key, urlEncoded) => {
  try {
    const history = LocalStorage.get(key);
    if (
      (history === null || history?.current.value === "") &&
      urlEncoded !== propertiesGlobal.EMPTY_CONTENT_ENCODE
    ) {
      return newHsitory(urlEncoded);
    } else {
      const current = history.current;
      const snapShots = history.snapshots[current.data];
      for (const snapshot of snapShots) {
        if (snapshot.id === current.id && urlEncoded !== "") {
          snapshot.value = urlEncoded;
          current.value = urlEncoded;
          break;
        }
      }
      return LocalStorage.set(key, history);
    }
  } catch (error) {
    console.error(error);
  }
};

export const newHsitory = (urlEncoded) => {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const año = fechaActual.getFullYear();
  const date = `${dia}/${mes}/${año}`;
  const hour = fechaActual.getHours();
  const minute = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();
  const currentHour = `${hour}:${minute}:${seconds}`;
  const id = uuidv4();
  const history = JSON.parse(localStorage.getItem("history"));
  if (
    !history ||
    Object.keys(history).length === 0 ||
    Object.keys(history.snapshots).length === 0
  ) {
    const objHistory = {
      snapshots: {
        [date]: [
          {
            data: date,
            id: id,
            name: "Untitle",
            value:
              urlEncoded === ""
                ? propertiesGlobal.EMPTY_CONTENT_ENCODE
                : urlEncoded
          }
        ]
      },
      current: {
        data: date,
        id: id,
        name: "Untitle",
        value:
          urlEncoded === "" ? propertiesGlobal.EMPTY_CONTENT_ENCODE : urlEncoded
      }
    };
    LocalStorage.set("history", objHistory);
    return;
  }
  let title = _incrementHistoryItem(history);
  const item = {
    data: date,
    id: id,
    name: `${title}`,
    value:
      urlEncoded === "" ? propertiesGlobal.EMPTY_CONTENT_ENCODE : urlEncoded
  };
  history.current = item;
  insertItemsIntoTheHsitory(history, date, item);
  LocalStorage.set("history", history);
};

const _incrementHistoryItem = (history) => {
  const regex = /^Untitle( \(\d+\))?$/;
  let lengthOfUntitleNames = [];
  for (const date in history.snapshots) {
    const filtered = history.snapshots[date].filter((snapshot) =>
      regex.test(snapshot.name)
    );

    lengthOfUntitleNames = lengthOfUntitleNames.concat(filtered);
  }

  return lengthOfUntitleNames.length < 1
    ? "Untitle"
    : "Untitle " + `(${lengthOfUntitleNames.length})`;
};

export const extractURLContent = (url) => {
  const urlEncoded = urlEncode(url);
  updateElementFromHistory("history", urlEncoded);
  return decodeBase64(urlEncoded);
};

export const getHistory = (key) => {
  return LocalStorage.get(key);
};

export const setHistory = (key, value) => {
  LocalStorage.set(key, value);
};

export const deleteKeyFromLocalStorage = () => {
  LocalStorage.deleteKey("history");
};

export const insertItemsIntoTheHsitory = (history, date, newObject) => {
  if (Object.keys(history.snapshots)[0] === date) {
    history.snapshots[date].unshift(newObject);
    return history;
  }
  history.snapshots = { [date]: [newObject], ...history.snapshots };
  return history;
};
