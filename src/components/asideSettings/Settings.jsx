import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./index.css";
import { handleToggleState } from "../../utils/utils";
import {
  BOTTOM_LAYOUT,
  DEFAULT_LAYOUT,
  HORIZONTAL_LAYOUT,
  PropertiesLayouts,
  VERTICAL_LAYOUT,
  listGuttersConfig
} from "../../const";
import { handleConfigGutter, handleLayout } from "./utils";
import { split } from "../../Split";
import { LocalStorage } from "../localStorage/localStorage";
export const Settings = ({ setGutterConfig }) => {
  const {
    fontFamily,
    setFontFamily,
    fontLigature,
    setFontLigature,
    lineNumbers,
    setLineNumbers,
    wordWrap,
    setWordWrap,
    fontSize,
    setFontSize,
    filename,
    setFilename,
    minimap,
    setMinimap,
    cursorBlinking,
    setCursorBlinking,
    cursorWidth,
    setCursorWidth
  } = useContext(GlobalContext);

  return (
    <div className="wrapper-layouts">
      <div style={{ display: "flex", gap: "5px", padding: "10px 0 0 0" }}>
        <strong style={{ opacity: "0.5" }}>Editor: </strong> <p>layouts</p>
      </div>
      <div className="layouts-grid">
        <button
          className="button-layout"
          onClick={() => {
            handleLayout(listGuttersConfig.DEFAULT_LAYOUT);
            const confi = LocalStorage.get("settings").configGutter;
            setGutterConfig({
              conf: DEFAULT_LAYOUT(document),
              oldConf: confi
            });
            handleConfigGutter(listGuttersConfig.DEFAULT_LAYOUT);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 406 343"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="221"
              y="194"
              width="185"
              height="149"
              rx="22"
              fill="white"
            />
            <rect x="221" width="185" height="149" rx="22" fill="#FFFF00" />
            <rect y="194" width="185" height="149" rx="22" fill="#29A9DF" />
            <rect width="185" height="149" rx="22" fill="#FF8C00" />
          </svg>
        </button>
        <button
          className="button-layout"
          onClick={() => {
            handleLayout(listGuttersConfig.BOTTOM_LAYOUT);
            const confi = LocalStorage.get("settings").configGutter;
            setGutterConfig({
              conf: BOTTOM_LAYOUT(document),
              oldConf: confi
            });
            handleConfigGutter(listGuttersConfig.BOTTOM_LAYOUT);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 412 349"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="406" height="149" rx="22" fill="white" />
            <path
              d="M153 222C153 209.85 162.85 200 175 200H231C243.15 200 253 209.85 253 222V327C253 339.15 243.15 349 231 349H175C162.85 349 153 339.15 153 327V222Z"
              fill="#FFFF00"
            />
            <rect y="200" width="100" height="149" rx="22" fill="#29A9DF" />
            <rect
              x="312"
              y="200"
              width="100"
              height="149"
              rx="22"
              fill="#FF8C00"
            />
          </svg>
        </button>
        <button
          className="button-layout"
          onClick={() => {
            handleLayout(listGuttersConfig.DEFAULT_LAYOUT_2);
            const confi = LocalStorage.get("settings").configGutter;
            setGutterConfig({
              conf: DEFAULT_LAYOUT(document),
              oldConf: confi
            });
            handleConfigGutter(listGuttersConfig.DEFAULT_LAYOUT_2);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 406 343"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="221"
              y="194"
              width="185"
              height="149"
              rx="22"
              fill="white"
            />
            <rect x="221" width="185" height="149" rx="22" fill="#29A9DF" />
            <rect y="194" width="185" height="149" rx="22" fill="#FFFF00" />
            <rect width="185" height="149" rx="22" fill="#FF8C00" />
          </svg>
        </button>
        <button
          className="button-layout"
          onClick={() => {
            handleLayout(listGuttersConfig.VERTICAL_LAYOUT);
            const confi = LocalStorage.get("settings").configGutter;
            setGutterConfig({
              conf: VERTICAL_LAYOUT(document),
              oldConf: confi
            });
            handleConfigGutter(listGuttersConfig.VERTICAL_LAYOUT);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 567 349"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="467"
              y="-100"
              width="100"
              height="649"
              rx="22"
              fill="white"
            />
            <rect x="159" width="100" height="349" rx="22" fill="#29A9DF" />
            <rect x="308" width="100" height="349" rx="22" fill="#FFFF00" />
            <rect width="100" height="349" rx="22" fill="#FF8C00" />
          </svg>
        </button>
        <button
          className="button-layout"
          onClick={() => {
            handleLayout(listGuttersConfig.HORIZONTAL_LAYOUT);
            const confi = LocalStorage.get("settings").configGutter;
            setGutterConfig({
              conf: HORIZONTAL_LAYOUT(document),
              oldConf: confi
            });
            handleConfigGutter(listGuttersConfig.HORIZONTAL_LAYOUT);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 349 412"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="349"
              width="406"
              height="149"
              rx="22"
              transform="rotate(90 349 0)"
              fill="white"
            />
            <path
              d="M127 153C139.15 153 149 162.85 149 175V231C149 243.15 139.15 253 127 253H22C9.84974 253 0 243.15 0 231V175C0 162.85 9.84974 153 22 153H127Z"
              fill="#FFFF00"
            />
            <rect
              x="149"
              width="100"
              height="149"
              rx="22"
              transform="rotate(90 149 0)"
              fill="#29A9DF"
            />
            <rect
              x="149"
              y="312"
              width="100"
              height="149"
              rx="22"
              transform="rotate(90 149 312)"
              fill="#FF8C00"
            />
          </svg>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong>{" "}
          <p>Line of Numbers</p>
        </div>
        <label htmlFor="lineNumbers"></label>
        <select
          id="lineNumbers"
          name="lineNumbers"
          className="actions-containers"
          value={lineNumbers}
          onChange={(e) =>
            handleToggleState(setLineNumbers, e.target.value, {
              retrieval: true,
              key: "settings",
              data: {
                key: "lineNumbers"
              }
            })
          }
        >
          <option value="on">on</option>
          <option value="off">off</option>
          <option value="relative">relative</option>
          <option value="interval">interval</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong> <p>World wrap</p>
        </div>
        <label htmlFor="wordWrap"></label>
        <select
          id="wordWrap"
          name="wordWrap"
          className="actions-containers"
          value={wordWrap}
          onChange={(e) =>
            handleToggleState(setWordWrap, e.target.value, {
              retrieval: true,
              key: "settings",
              data: {
                key: "wordWrap"
              }
            })
          }
        >
          <option value="on">on</option>
          <option value="off">off</option>
          <option value="bounded">bounded</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong>{" "}
          <p>Cursor Blinking</p>
        </div>
        <label htmlFor="cursorBlinking"></label>
        <select
          id="cursorBlinking"
          name="cursorBlinking"
          className="actions-containers"
          value={cursorBlinking}
          onChange={(e) =>
            handleToggleState(setCursorBlinking, e.target.value, {
              retrieval: true,
              key: "settings",
              data: {
                key: "cursorBlinking"
              }
            })
          }
        >
          <option value="blink">blink</option>
          <option value="smooth">smooth</option>
          <option value="phase">phase</option>
          <option value="expand">expand</option>
          <option value="solid">solid</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong> <p>Font size</p>
        </div>
        <label htmlFor="fontSize"></label>
        <input
          type="number"
          min={1}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          name="fontSize"
          id="fontSize"
          className="actions-containers"
          value={fontSize}
          onChange={(e) =>
            handleToggleState(setFontSize, e.target.value, {
              retrieval: true,
              key: "settings",
              data: {
                key: "fontSize"
              }
            })
          }
          step={1}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong>{" "}
          <p>Cursor width</p>
        </div>
        <label htmlFor="cursorWidth"></label>
        <input
          type="number"
          min={1}
          max={10}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          name="cursorWidth"
          id="cursorWidth"
          className="actions-containers"
          value={cursorWidth}
          onChange={(e) =>
            handleToggleState(setCursorWidth, e.target.value, {
              retrieval: true,
              key: "settings",
              data: {
                key: "cursorWidth"
              }
            })
          }
          step={1}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong>{" "}
          <p>Font Family</p>
        </div>
        <div style={{ display: "flex", gap: "10px", flex: 1 }}>
          <input
            type="text"
            name="fontFamily"
            id="fontFamily"
            value={fontFamily}
            onChange={(e) =>
              handleToggleState(setFontFamily, e.target.value, {
                retrieval: true,
                key: "settings",
                data: {
                  key: "fontFamily"
                }
              })
            }
            className="actions-containers"
            style={{
              width: "100%"
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong>{" "}
          <p>Font Ligatures</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="checkbox"
            name="ligatures"
            id="ligatures"
            checked={fontLigature}
            onChange={() =>
              handleToggleState(setFontLigature, !fontLigature, {
                retrieval: true,
                key: "settings",
                data: {
                  key: "fontLigatures"
                }
              })
            }
            className="actions-containers"
          />
          <label htmlFor="ligatures">Enable Font Ligatures</label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Editor: </strong>{" "}
          <p>Font Ligatures</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="checkbox"
            name="minimap"
            id="minimap"
            checked={minimap}
            onChange={() =>
              handleToggleState(
                setMinimap,
                { enable: !minimap },
                {
                  retrieval: true,
                  key: "settings", // cambiarlo en los const
                  data: {
                    key: "minimap"
                  }
                }
              )
            }
            className="actions-containers"
          />
          <label htmlFor="minimap">Enable Minimap</label>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px 0"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <strong style={{ opacity: "0.5" }}>Features: Downloads:</strong>
          <p>File name </p>
        </div>
        <label htmlFor="miSelector"></label>
        <input
          type="text"
          className="actions-containers"
          value={filename}
          onChange={(e) =>
            handleToggleState(setFilename, e.target.value, {
              retrieval: true,
              key: "settings",
              data: {
                key: "filename"
              }
            })
          }
        />
      </div>
    </div>
  );
};
