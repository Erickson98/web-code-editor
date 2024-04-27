import "./App.css";
import { useState, useRef, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import {
  BOTTOM_LAYOUT,
  DEFAULT_LAYOUT,
  HORIZONTAL_LAYOUT,
  PropertiesCss,
  PropertiesGridArea,
  PropertiesLayouts,
  VERTICAL_LAYOUT,
  listGuttersConfig,
  propertiesGlobal,
  selectConfigGutter
} from "./const";
import IndexAsideBarContent from "./components/asideBar/indexAsideBarContent";
import Split from "split-grid";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "./components/context/GlobalContext";

import "./utils/slot-code-editor";
import {
  getHistory,
  extractURLContent
} from "./components/asideBar/historyComponent/utilsHistory";
import { handleLayout } from "./components/asideSettings/utils";
import { setMonacoOverflowProperty } from "./utils/utils";
import { LocalStorage } from "./components/localStorage/localStorage";
import { split } from "./Split";
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function App() {
  const [HTML, setHTML] = useState("");
  const [CSS, setCSS] = useState("");
  const [JS, setJS] = useState("");
  const [searchMorePackage, setSearchMorePackage] = useState(0);
  const [asideBarComponents, setasideBarComponents] = useState(null);
  let [countClick, setCountClick] = useState(0);
  const debouncedHTMl = useDebounce(HTML, 200);
  const debouncedCSS = useDebounce(CSS, 200);
  const debouncedJS = useDebounce(JS, 200);
  const [encodeBase64, setEncode] = useState("");
  const [decodeBase64, setDecode] = useState("");
  const [countRefreshe, setCountRefresh] = useState(0);
  const [urlBlob, setUrlBlob] = useState("");

  const [gutterConfig, setGutterConfig] = useState({ conf: "", oldConf: "" });

  const colRef = useRef(null);
  const editorRef = useRef(null);
  const asideBarContentRef = useRef(null);

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
    setEncodeBase64,
    setChronology,
    minimap,
    setMinimap,
    cursorBlinking,
    cursorWidth
  } = useContext(GlobalContext);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    emmetHTML(monaco);
  }
  const insertContentIntoIframe = (html, css, js) => {
    try {
      let separator = "|||";
      let iframe = document.getElementById("frame").contentWindow.document;
      const htmlContent =
        html === "undefined" || html === undefined ? "" : html;
      const cssContent = css === "undefined" || css === undefined ? "" : css;
      const jsContent = js === "undefined" || js === undefined ? "" : js;
      let text =
        htmlContent +
        "<style>" +
        cssContent +
        "</style>" +
        '<script type="module">' +
        jsContent +
        "</script>";
      iframe.open();
      iframe.write(text);
      iframe.close();
      text =
        htmlContent +
        separator +
        "<style>" +
        separator +
        cssContent +
        separator +
        "</style>" +
        separator +
        '<script type="module">' +
        separator +
        jsContent +
        separator +
        "</script>";

      HandleOnChangeHtml(htmlContent);
      handleOnChangeCSS(cssContent);
      handleOnChangeJS(jsContent);

      var encodedContent = btoa(encodeURIComponent(text));
      setEncode(encodedContent);

      setEncodeBase64(encodedContent);
      window.history.pushState({}, "", "/" + encodedContent);
      extractURLContent(window.location.href); // incongruenia con el nombre, esta funcion hace varais cosas tratar de separarla
      updateIframeContent();
      setChronology(getHistory("history"));
    } catch (error) {
      console.error(error);
    }
  };
  debugger;
  useEffect(() => {
    if (countRefreshe < 2) {
      return;
    }

    insertContentIntoIframe(debouncedHTMl, debouncedCSS, debouncedJS);
  }, [debouncedHTMl, debouncedCSS, debouncedJS]);
  const HandleOnChangeHtml = (value, e) => {
    if (value === "undefined" || value === undefined) {
      value = "";
    }
    setHTML(value);
    setCountRefresh(countRefreshe + 1);
  };
  const handleOnChangeCSS = (value, e) => {
    if (value === "undefined" || value === undefined) {
      value = "";
    }
    setCSS(value);

    setCountRefresh(countRefreshe + 1);
  };
  const handleOnChangeJS = (value, e) => {
    if (value === "undefined" || value === undefined) {
      value = "";
    }
    setJS(value);

    setCountRefresh(countRefreshe + 1);
  };

  const handleDisplayOnELements = (display) => {
    if (PropertiesCss.NONE === display || display === "") {
      return (display = "inline");
    }
    return (display = "none");
  };
  const changeStyleBoderForButton = (id) => {
    for (let index in id) {
      const button = document.getElementById(id[index]);
      button.style.borderRadius = 0;
      button.style.borderLeftWidth = "2.5px";
      button.style.borderLeftColor = "transparent";
    }
    const button = document.getElementById(id[0]);
    button.style.borderRadius = 0;
    button.style.borderLeftColor = "white";
  };
  const handleClickEditor = () => {
    changeStyleBoderForButton([
      "editor-aside-bar",
      "dependencies-aside-bar",
      "history-aside-bar",
      "settings-aside-bar"
    ]);
    if (asideBarContentRef.current.style.display === PropertiesCss.INLINE) {
      asideBarContentRef.current.style.display = handleDisplayOnELements(
        asideBarContentRef.current.style.display
      );
    }
  };
  const handleClickDependencies = () => {
    changeStyleBoderForButton([
      "dependencies-aside-bar",
      "editor-aside-bar",
      "history-aside-bar",
      "settings-aside-bar"
    ]);
    if (asideBarContentRef.current.style.display === PropertiesCss.INLINE) {
      if (countClick === 1) {
        asideBarContentRef.current.style.display = handleDisplayOnELements(
          asideBarContentRef.current.style.display
        );
        setasideBarComponents(propertiesGlobal.DEPENDENCIES);
        changeStyleBoderForButton([
          "editor-aside-bar",
          "dependencies-aside-bar",
          "history-aside-bar",
          "settings-aside-bar"
        ]);

        return;
      } else if (countClick === 2 || countClick === 3) {
        setasideBarComponents(propertiesGlobal.DEPENDENCIES);
        setCountClick(1);
        return;
      }

      setCountClick(1);
      return;
    }
    setasideBarComponents(propertiesGlobal.DEPENDENCIES);
    setCountClick(1);

    asideBarContentRef.current.style.display = handleDisplayOnELements(
      asideBarContentRef.current.style.display
    );
  };
  const handleClickHistory = () => {
    try {
      changeStyleBoderForButton([
        "history-aside-bar",
        "editor-aside-bar",
        "dependencies-aside-bar",
        "settings-aside-bar"
      ]);
      if (asideBarContentRef.current.style.display === PropertiesCss.INLINE) {
        setasideBarComponents(propertiesGlobal.HISTORY);
        if (countClick === 2) {
          asideBarContentRef.current.style.display = handleDisplayOnELements(
            asideBarContentRef.current.style.display
          );
          setasideBarComponents(propertiesGlobal.HISTORY);
          changeStyleBoderForButton([
            "editor-aside-bar",
            "history-aside-bar",
            "dependencies-aside-bar",
            "settings-aside-bar"
          ]);
          return;
        } else if (countClick === 1 || countClick === 3) {
          setCountClick(2);
          return;
        }

        setasideBarComponents(propertiesGlobal.HISTORY);
        setCountClick(2);
        return;
      }
      setCountClick(2);
      setasideBarComponents(propertiesGlobal.HISTORY);
      asideBarContentRef.current.style.display = handleDisplayOnELements(
        asideBarContentRef.current.style.display
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickSettings = () => {
    changeStyleBoderForButton([
      "settings-aside-bar",
      "editor-aside-bar",
      "dependencies-aside-bar",
      "history-aside-bar"
    ]);
    if (asideBarContentRef.current.style.display === PropertiesCss.INLINE) {
      setasideBarComponents(propertiesGlobal.SETTINGS);
      if (countClick === 3) {
        asideBarContentRef.current.style.display = handleDisplayOnELements(
          asideBarContentRef.current.style.display
        );
        setasideBarComponents(propertiesGlobal.SETTINGS);
        changeStyleBoderForButton([
          "editor-aside-bar",
          "dependencies-aside-bar",
          "history-aside-bar",
          "settings-aside-bar"
        ]);
        return;
      } else if (countClick === 1 || countClick === 2) {
        setCountClick(3);
        return;
      }
      setasideBarComponents(propertiesGlobal.SETTINGS);
      setCountClick(3);
      return;
    }
    setCountClick(3);
    setasideBarComponents(propertiesGlobal.SETTINGS);
    asideBarContentRef.current.style.display = handleDisplayOnELements(
      asideBarContentRef.current.style.display
    );
  };
  const handleClickDownload = () => {
    const zip = new JSZip();

    zip.file("index.html", debouncedHTMl);
    zip.file("style.css", debouncedCSS);
    zip.file("script.js", debouncedJS);

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, filename + ".zip");
    });
  };
  const handleClickSharableLink = () => {
    const urlCompleta = window.location.href;
    const elemento = document.createElement("textarea");
    elemento.value = urlCompleta;

    // Estilo para evitar que el elemento sea visible para el usuario
    elemento.setAttribute("readonly", "");
    elemento.style.position = "absolute";
    elemento.style.left = "-9999px";

    document.body.appendChild(elemento);
    elemento.select();
    document.execCommand("copy");
    document.body.removeChild(elemento);

    notify();
  };
  const handleClickPreview = () => {
    window.open(urlBlob, "_blank");
  };
  useEffect(() => {
    try {
      setCountRefresh(countRefreshe + 1);

      if (countRefreshe < 1) {
        return;
      }
      if (decodeBase64 === "") {
        return;
      }

      let separator = "|||";
      let decoded = decodeBase64.value ? decodeBase64.value : "";

      let decodedContent = decodeURIComponent(atob(decoded));
      let contents = decodedContent.split(separator);
      HandleOnChangeHtml(contents[0]);
      handleOnChangeCSS(contents[2]);
      handleOnChangeJS(contents[5]);
    } catch (error) {
      console.error(error);
    }
  }, [decodeBase64]);
  useEffect(() => {
    try {
      // refactorizar

      if (!localStorage.getItem("settings")) {
        const configurations = {
          selectOnLineNumbers: false,
          fontLigatures: fontLigature,
          fontFamily: fontFamily,
          minimap: { enable: false },
          wordWrap: wordWrap,
          fontSize: fontSize,
          lineNumbers: lineNumbers,
          filename: filename,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          cursorBlinking: cursorBlinking,
          cursorWidth: cursorWidth,
          fixedOverflowWidgets: true,
          configGutter: listGuttersConfig.DEFAULT_LAYOUT
        };
        localStorage.setItem("settings", JSON.stringify(configurations));
        split(DEFAULT_LAYOUT(document));
      }
      const settings = JSON.parse(localStorage.getItem("settings"));

      setFontLigature(settings.fontLigatures);
      setLineNumbers(settings.lineNumbers);
      setFontFamily(settings.fontFamily);
      setWordWrap(settings.wordWrap);
      setFontSize(settings.fontSize);
      setFilename(settings.filename);
      const splitInstance = new split(
        selectConfigGutter(document)[`${settings.configGutter}`]
      );

      const metadata = extractURLContent(window.location.href);
      HandleOnChangeHtml(metadata.content[0]);
      handleOnChangeCSS(metadata.content[2]);
      handleOnChangeJS(metadata.content[5]);
      insertContentIntoIframe(
        metadata.content[0],
        metadata.content[2],
        metadata.content[5]
      );
      setGutterConfig({
        conf: selectConfigGutter(document)[`${settings.configGutter}`],
        oldConf: ""
      });
      handleLayout(settings.configGutter);
    } catch (error) {
      console.error(error);
    }
    updateIframeContent();
    changeStyleBoderForButton([
      "editor-aside-bar",
      "settings-aside-bar",
      "dependencies-aside-bar",
      "history-aside-bar"
    ]);
  }, []);

  useEffect(() => {
    const splitInstance = new split(DEFAULT_LAYOUT(document));
    splitInstance.updateConfiguration(gutterConfig.conf);
  }, [gutterConfig]);
  function updateIframeContent() {
    const iframe = document.getElementById("frame");
    const doc = iframe.contentWindow.document;
    const html = doc.documentElement.outerHTML;
    const blob = new Blob([html], { type: "text/html" });
    const newBlobUrl = URL.createObjectURL(blob);

    setUrlBlob(newBlobUrl);
  }
  const notify = () => toast("The url was copy!");

  const options = {
    selectOnLineNumbers: false,
    fontLigatures: fontLigature,
    fontFamily: fontFamily,
    minimap: {
      enabled: minimap.enable !== undefined ? minimap.enable : minimap
    },
    wordWrap: wordWrap,
    fontSize: fontSize,
    lineNumbers: lineNumbers,
    filename: filename,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    cursorBlinking: cursorBlinking,
    cursorWidth: cursorWidth,
    fixedOverflowWidgets: true
  };
  return (
    <div id="main">
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <aside className="aside-bar">
        <div className="aside-options">
          <header className="aside-header">
            <button
              className="buttons-aside-bar"
              id="editor-aside-bar"
              onClick={handleClickEditor}
            >
              <img
                className="img-sidebar"
                draggable="false"
                src="./src/assets/paper_icon.svg"
                width={"40px"}
              />
              <span className="editor-aside-bar-span">Editor</span>
            </button>
            <button
              className="buttons-aside-bar"
              id="dependencies-aside-bar"
              onClick={handleClickDependencies}
            >
              <img
                className="img-sidebar"
                src="./src/assets/package_light_icon.svg"
                width={"40px"}
              />
              <span className="editor-aside-bar-span">Dependecies</span>
            </button>
            <button
              className="buttons-aside-bar"
              id="download-aside-bar"
              onClick={handleClickDownload}
            >
              <img
                className="img-sidebar"
                src="./src/assets/cloud_download_icon.svg"
                width={"40px"}
              />
              <span className="editor-aside-bar-span">Download</span>
            </button>
            <button
              className="buttons-aside-bar"
              id="history-aside-bar"
              onClick={handleClickHistory}
            >
              <img
                className="img-sidebar"
                src="./src/assets/history_line_icon.svg"
                width={"40px"}
              />
              <span className="editor-aside-bar-span">History</span>
            </button>
          </header>
          <footer className="aside-footer">
            <button
              className="buttons-aside-bar"
              id="preview-aside-bar"
              onClick={handleClickPreview}
            >
              <img
                className="img-sidebar"
                src="./src/assets/eye_preview_see_seen_view_icon.svg"
                width={"40px"}
              />
              <span className="editor-aside-bar-span">Preview</span>
            </button>
            <button
              className="buttons-aside-bar"
              id="share-aside-bar"
              onClick={handleClickSharableLink}
            >
              <img
                className="img-sidebar"
                src="./src/assets/share_turn_icon.svg"
                width={"40px"}
              />
              <span className="editor-aside-bar-span">Share</span>
            </button>
            <button
              className="buttons-aside-bar"
              id="settings-aside-bar"
              onClick={handleClickSettings}
            >
              <img
                className="img-sidebar"
                src="./src/assets/settings_parameters_params_setting_tools_icon.svg"
                width={"40px"}
              />
              <span className="editor-aside-bar-span">Settings</span>
            </button>
          </footer>
        </div>
        <div id="aside-content" ref={asideBarContentRef}>
          <IndexAsideBarContent
            asideBarComponentKey={asideBarComponents}
            searchMorePackage={searchMorePackage}
            setSearchMorePackage={setSearchMorePackage}
            encodeData={encodeBase64}
            setDecode={setDecode}
            setGutterConfig={setGutterConfig}
          />
        </div>
      </aside>

      <div className="wrapper">
        <monaco-editor
          data-image-src="src/assets/html.svg"
          grid-area="firstEditor"
          overflow="hidden"
        >
          <div ref={colRef} className="monaco-editor-container">
            <Editor
              language="html"
              theme="vs-dark"
              loading=""
              value={HTML}
              onChange={HandleOnChangeHtml}
              beforeMount={handleEditorDidMount}
              options={options}
            />
          </div>
        </monaco-editor>

        <div id="firstGutter" className="first-gutter column" />
        <monaco-editor
          data-image-src="src/assets/css icon.svg"
          grid-area="secondEditor"
          overflow="hidden"
        >
          <div ref={colRef} className="monaco-editor-container">
            <Editor
              language="css"
              theme="vs-dark"
              loading=""
              value={CSS}
              onChange={handleOnChangeCSS}
              onMount={handleEditorDidMount}
              options={options}
            />
          </div>
        </monaco-editor>

        <div id="secondGutter" className="second-gutter row"></div>
        <div id="thirdGutter" className="third-gutter" />

        <monaco-editor
          data-image-src="src/assets/js.png"
          grid-area="thirdEditor"
          overflow="hidden"
        >
          <div ref={colRef} className="monaco-editor-container">
            <Editor
              language="javascript"
              theme="vs-dark"
              loading=""
              value={JS}
              onChange={handleOnChangeJS}
              onMount={handleEditorDidMount}
              options={options}
            />
          </div>
        </monaco-editor>

        <iframe
          id="frame"
          src={urlBlob}
          sandbox
          style={{
            display: "flex",
            gridArea: "fourthGutter",
            height: "100%",
            width: "100%",
            minHeight: 0
          }}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
