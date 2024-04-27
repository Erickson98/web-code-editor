import { setConfigLayout } from "../../const";
import { LocalStorage } from "../localStorage/localStorage";

export const handleLayout = (configNumber) => {
  setConfigLayout(document, configNumber);
};
export const handleConfigGutter = (configuration) => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.configGutter = configuration;
  LocalStorage.set("settings", settings);
};
