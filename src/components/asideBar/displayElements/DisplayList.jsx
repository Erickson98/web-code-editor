import { useRef, useCallback, useContext } from "react";
import "./index.css";
import { propertiesGlobal } from "../../../const";
import { formatString } from "../../../utils/utils";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {
  extractURLContent,
  getHistory
} from "../historyComponent/utilsHistory";
export const DisplayList = ({
  data,
  searching,
  inputValue,
  setCurrentPageNumber,
  pageNumber,
  hasMore,
  displayListRef,
  fetchPackageFromSkypack,
  packageName,
  setDecode
}) => {
  const { setEncodeBase64, setChronology, setURL } = useContext(GlobalContext);

  const clickIdentifierRef = useRef(null);
  const observer = useRef();
  const lastItem = useCallback(
    (node) => {
      if (searching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [searching, hasMore]
  );

  function cleanAndCamelCasePackageName(packageName) {
    // Remover caracteres no alfanuméricos y convertir a camel case
    var camelCaseString = packageName.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) =>
      chr.toUpperCase()
    );
    // Capitalizar la primera letra
    return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
  }
  //cambiar nombre
  const handleCLickWrapperLi = (item) => {
    const separator = "|||";

    const url = formatString(
      propertiesGlobal.CDN_JS_DELIVER,
      item.name,
      item.version
    );

    const namePackage = cleanAndCamelCasePackageName(item.name);
    const importPackage = "import " + namePackage + " from " + url + ";";

    const metadata = extractURLContent(window.location.href);
    if (metadata.content[5].includes(url)) {
      return;
    }
    let iframe = document.getElementById("frame").contentWindow.document;
    let text =
      metadata.content[0] +
      "<style>" +
      metadata.content[2] +
      "</style>" +
      '<script type="module">' +
      metadata.content[5] +
      "</script>";
    iframe.open();
    iframe.write(text);
    iframe.close();
    text =
      metadata.content[0] +
      separator +
      "<style>" +
      separator +
      metadata.content[2] +
      separator +
      "</style>" +
      separator +
      '<script type="module">' +
      separator +
      importPackage +
      "\n" +
      metadata.content[5] +
      separator +
      "</script>";
    var encodedContent = btoa(encodeURIComponent(text));

    setEncodeBase64(encodedContent);
    window.history.pushState({}, "", "/" + encodedContent);
    setChronology(getHistory("history"));
    extractURLContent(window.location.href);
    updateIframeContent();
    setDecode({ value: encodedContent });
    console.log(url);
    clickIdentifierRef.current = 1;
  };
  function updateIframeContent() {
    const iframe = document.getElementById("frame");
    const doc = iframe.contentWindow.document;
    const html = doc.documentElement.outerHTML;
    const blob = new Blob([html], { type: "text/html" });
    const newBlobUrl = URL.createObjectURL(blob);
    console.log(newBlobUrl);
  }
  const handleCLickToCopy = async (event) => {
    clickIdentifierRef.current = 2;
    // Prevenir la redirección
    event.preventDefault();

    // Texto que quieres copiar
    const urlToCopy = event.currentTarget.getAttribute("href");

    try {
      // Usar la API del portapapeles para copiar el texto
      await navigator.clipboard.writeText(urlToCopy);
    } catch (err) {
      console.error("Error to copy text:", err);
    }
  };
  const handleCLickToDetails = async (event, item) => {
    clickIdentifierRef.current = 2;
    const urlToCopy = event.currentTarget.getAttribute("href");
    const url = formatString(urlToCopy, item.name, item.version);
    try {
      // Usar la API del portapapeles para copiar el texto
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Error to copy text:", err);
    }
  };
  useEffect(() => {
    async function fetchMyAPI() {
      return await fetchPackageFromSkypack(packageName, pageNumber);
    }

    fetchMyAPI();
  }, [pageNumber]);
  return (
    <>
      <ul ref={displayListRef}>
        {!searching
          ? data?.hits?.map((element, index) => {
              return (
                <li
                  key={index}
                  className="wrapper-elements-li"
                  onClick={() => handleCLickWrapperLi(element)}
                  ref={data.hits.length === index + 1 ? lastItem : null}
                >
                  <strong>{element.name}</strong>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      padding: "0px",
                      margin: "0px"
                    }}
                  >
                    {element.description ?? (
                      <section style={{ opacity: "0.2" }}>
                        empty description
                      </section>
                    )}
                  </div>

                  <footer className="cards-metadata">
                    <div className="wrapper-versions-metadata">
                      <section>version: {element.version}</section>
                      <div className="wrapper-copy-details">
                        <a
                          tabIndex={-1}
                          ref={clickIdentifierRef}
                          rel="noopener noreferrer"
                          data-copy
                          href={formatString(
                            propertiesGlobal.CDN_JS_DELIVER,
                            element.name,
                            element.version
                          )}
                          target="_blank"
                          className="links"
                          onClick={(event) => handleCLickToCopy(event)}
                        >
                          copy
                        </a>
                        <a
                          ref={clickIdentifierRef}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            propertiesGlobal.PACKAGE_VIEW_URL + element.name
                          }
                          className="links"
                          onClick={handleCLickToDetails}
                        >
                          details
                        </a>
                      </div>
                    </div>
                  </footer>
                </li>
              );
            })
          : inputValue &&
            searching && (
              <div className="wrapper-loading">
                <div className="loading"></div>
              </div>
            )}
        <br />
      </ul>
    </>
  );
};
