import { useState, React, useMemo, useEffect } from "react";
import { GlobalContext } from "./components/context/GlobalContext";
import App from "./App";
import { LocalStorage } from "./components/localStorage/localStorage";

function Index() {
  const [fontFamily, setFontFamily] = useState("Cascadia Code");
  const [fontLigature, setFontLigature] = useState(true);
  const [lineNumbers, setLineNumbers] = useState("on");
  const [wordWrap, setWordWrap] = useState("on");
  const [fontSize, setFontSize] = useState("16");
  const [filename, setFilename] = useState("code.editor");
  const [cursorBlinking, setCursorBlinking] = useState("expand");
  const [cursorWidth, setCursorWidth] = useState(2);
  const [encodeBase64, setEncodeBase64] = useState("code.editor");
  const [chronology, setChronology] = useState([]);
  const [URL, setURL] = useState("");
  const [minimap, setMinimap] = useState(false);
  useEffect(() => {
    const settings = LocalStorage.get("settings");
    if (settings) {
      setFontFamily(settings.fontFamily);
      setLineNumbers(settings.lineNumbers);
      setWordWrap(settings.wordWrap);
      setFontSize(settings.fontSize);
      setFilename(settings.filename);
      setMinimap(settings.minimap.enable);
      setCursorBlinking(settings.cursorBlinking);
      setCursorWidth(settings.cursorWidth);
    }
  }, []);
  const value = useMemo(
    () => ({
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
      encodeBase64,
      setEncodeBase64,
      chronology,
      setChronology,
      URL,
      setURL,
      minimap,
      setMinimap,
      cursorBlinking,
      setCursorBlinking,
      cursorWidth,
      setCursorWidth
    }),
    [
      fontFamily,
      fontLigature,
      lineNumbers,
      wordWrap,
      fontSize,
      filename,
      encodeBase64,
      chronology,
      URL,
      minimap,
      cursorBlinking,
      cursorWidth
    ]
  );

  return (
    <div>
      <GlobalContext.Provider value={value}>
        <App />
      </GlobalContext.Provider>
    </div>
  );
}

export default Index;
