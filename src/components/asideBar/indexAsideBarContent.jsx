import { Dependecies } from "./Dependencies";
import { History } from "./historyComponent/History";
import { Settings } from "../asideSettings/Settings";
import { propertiesGlobal } from "../../const";
import "./index.css";

function indexAsideBarContent({
  asideBarComponentKey,
  searchMorePackage,
  setSearchMorePackage,
  encodeData,
  setDecode,
  setGutterConfig
}) {
  return (
    <div className="wrapper-aside-bar-content">
      {asideBarComponentKey === propertiesGlobal.DEPENDENCIES && (
        <Dependecies
          setDecode={setDecode}
          searchMorePackage={searchMorePackage}
          setSearchMorePackage={setSearchMorePackage}
        />
      )}
      {asideBarComponentKey === propertiesGlobal.HISTORY && (
        <History encodeData={encodeData} setDecode={setDecode} />
      )}
      {asideBarComponentKey === propertiesGlobal.SETTINGS && (
        <Settings setGutterConfig={setGutterConfig} />
      )}
    </div>
  );
}

export default indexAsideBarContent;
