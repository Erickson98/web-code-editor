import { useEffect, useState, useContext } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "../../context/GlobalContext";
import {
  deleteKeyFromLocalStorage,
  getHistory,
  insertItemsIntoTheHsitory,
  setHistory
} from "./utilsHistory";
import { propertiesGlobal } from "../../../const";

export const History = ({ encodeData, setDecode }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);
  const [selected, setSelected] = useState(-1);
  const { chronology, setChronology } = useContext(GlobalContext);
  const handleClickClear = () => {
    try {
      setChronology([]);
      deleteKeyFromLocalStorage();
      const s = {
        value: propertiesGlobal.EMPTY_CONTENT_ENCODE
      };
      setDecode(s);
      const history = getHistory("history");
      history.current.value = "";
      setHistory("history", history);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCLickNew = () => {
    try {
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1;
      const año = fechaActual.getFullYear();
      const hour = fechaActual.getHours();
      const minute = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const date = `${dia}/${mes}/${año}`;
      const currentHour = `${hour}:${minute}:${seconds}`;
      const id = uuidv4();
      const versions = JSON.parse(localStorage.getItem("history"));
      if (
        !versions ||
        Object.keys(versions).length === 0 ||
        Object.keys(versions.snapshots).length === 0
      ) {
        const history = {
          snapshots: {
            [date]: [
              {
                data: date,
                id: id,
                name: `${propertiesGlobal.DEFAULT_HISTORY_ITEMS_NAME}`,
                value:
                  encodeData === ""
                    ? propertiesGlobal.EMPTY_CONTENT_ENCODE
                    : encodeData
              }
            ]
          },
          current: {
            data: date,
            id: id,
            name: `${propertiesGlobal.DEFAULT_HISTORY_ITEMS_NAME}`,
            value:
              encodeData === ""
                ? propertiesGlobal.EMPTY_CONTENT_ENCODE
                : encodeData
          }
        };
        setSelected(id);
        localStorage.setItem("history", JSON.stringify(history));
        updateChronology();
        return;
      }

      let title = nameUntitleElements(versions);
      const item = {
        data: date,
        id: id,
        name: `${title}`,
        value: propertiesGlobal.EMPTY_CONTENT_ENCODE //here
      };
      versions.current = item;
      insertItemsIntoTheHsitory(versions, date, item);

      // ;
      setDecode(item);
      setSelected(id);
      setHistoryToLocalStorage(versions);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCLickWithoutCurrent = (ownEncode) => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();
    const hour = fechaActual.getHours();
    const minute = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const date = `${dia}/${mes}/${año}`;
    const currentHour = `${hour}:${minute}:${seconds}`;
    const id = uuidv4();
    const versions = JSON.parse(localStorage.getItem("history"));

    let title = nameUntitleElements(versions);
    const item = {
      data: date,
      id: id,
      name: `${title}`,
      value: ownEncode
    };
    versions.current = item;
    versions.snapshots[date].unshift(item);
    // ;
    setSelected(id);
    setHistoryToLocalStorage(versions);
  };
  function nameUntitleElements(history) {
    const regex = new RegExp(
      `^${propertiesGlobal.DEFAULT_HISTORY_ITEMS_NAME}( \\(\\d+\\))?$`
    );
    let lengthOfUntitleNames = [];
    for (const date in history.snapshots) {
      const filtered = history.snapshots[date].filter((snapshot) =>
        regex.test(snapshot.name)
      );

      lengthOfUntitleNames = lengthOfUntitleNames.concat(filtered);
    }

    return lengthOfUntitleNames.length < 1
      ? `${propertiesGlobal.DEFAULT_HISTORY_ITEMS_NAME}`
      : `${propertiesGlobal.DEFAULT_HISTORY_ITEMS_NAME}` +
          ` (${lengthOfUntitleNames.length})`;
  }
  const setHistoryToLocalStorage = (versions) => {
    setChronology(versions);

    localStorage.setItem("history", JSON.stringify(versions));
  };
  const updateChronology = () => {
    setChronology(JSON.parse(localStorage.getItem("history")) ?? []);
  };
  const editing = (index, item) => {
    setIsEditing(index);
    setCurrentValue(item?.name);
  };
  const handleFocus = (event) => {
    event.target.select();
  };
  const handleBlurForEditLi = (item) => {
    setIsEditing(-1);
  };
  const handleChandeEdit = (e, index, item) => {
    setCurrentValue(item.name);
    const versions = JSON.parse(localStorage.getItem("history"));

    for (let x of versions.snapshots[item.data]) {
      setCurrentValue(e.target.value);
      if (x.id === item.id && e.target.value !== "") {
        x.name = e.target.value;
        break;
      }
    }
    setChronology(versions);
    setHistoryToLocalStorage(versions);
  };
  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
      setIsEditing(-1);
      // Aquí puedes poner el código que quieres ejecutar cuando se presiona Enter
    }
  };
  const handleDeleteItemForLi = (item) => {
    try {
      const versions = JSON.parse(localStorage.getItem("history"));
      const items = versions.snapshots[item.data].filter(
        (x) => x.id !== item.id
      );
      versions.snapshots[item.data] = items;
      if (!items.length) {
        delete versions.snapshots[item.data];
      }
      if (versions.current.value !== item.value) {
        const item2 = {
          value: versions.current.value
        };
        setDecode(item2);
      } else {
        versions.current.value = "";
        const s = {
          value: propertiesGlobal.EMPTY_CONTENT_ENCODE
        };
        setDecode(s);
      }

      setHistoryToLocalStorage(versions);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickLi = (items) => {
    setDecode(items);
    const versions = JSON.parse(localStorage.getItem("history"));
    versions.current = items;
    setHistoryToLocalStorage(versions);
    setSelected(items.id);
  };
  useEffect(() => {
    const versions = JSON.parse(localStorage.getItem("history"));
    if (!versions) {
      return;
    }
    setSelected(versions.current.id);
    updateChronology();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="wrapper-main">
        <div className="wrapper-header">
          <div className="wrapper-header-content">
            <strong>History</strong>
            <p>Manages the sandboxes history.</p>
          </div>
          <div className="wrapper-for-buttons">
            <button
              className="wrapper-buttons-action-history"
              onClick={handleClickClear}
            >
              <svg
                enable-background="new 0 0 512 512"
                height="20px"
                version="1.1"
                viewBox="0 0 512 512"
                width="20px"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="white"
              >
                <g id="Layer_26">
                  <g>
                    <path d="M255.531,385.818c6.213,0,11.245-2.284,11.245-5.076v-8.776l-3.803,0.061v-28.689l3.803,0.059v-8.766    c0-0.938-0.594-1.796-1.557-2.538L342.73,39.175c5.387-0.411,9.486-2.596,10.238-6.022c1.102-4.969-5.223-10.582-14.105-12.543    c-8.883-1.952-16.975,0.507-18.078,5.466c-0.762,3.504,2.207,7.301,7.096,9.937l-77.865,294.216    c-3.402,0.867-5.721,2.508-5.721,4.401v8.444l3.7,0.048h-0.2v29.128l-3.5,0.049v8.443    C244.294,383.534,249.322,385.818,255.531,385.818z" />
                    <path d="M160.417,425.635l190.865-2.822c11.615-0.155,20.908-9.731,20.74-21.356c-0.176-11.646-9.74-20.929-21.365-20.753    l-83.412,1.211v8.784c0,2.802-5.041,5.076-11.25,5.076c-6.209,0-11.24-2.274-11.24-5.076v-8.453l-84.963,1.27    c-11.63,0.166-20.929,9.731-20.752,21.367C139.21,416.518,148.786,425.801,160.417,425.635z" />
                    <path d="M374.326,433.688c0.107-1.278,0.186-2.587,0.146-3.915l-0.352-24.295l-0.305,0.019    c0.188,12.584-9.877,22.94-22.459,23.146l-190.863,2.802c-12.573,0.185-22.954-9.898-23.139-22.462h-0.294l0.333,22.599    c-0.229,0.448-0.361,0.936-0.346,1.453l0.664,45.332c0.02,1.895,1.781,3.397,3.918,3.357c0.914,0,1.748-0.302,2.406-0.781    l0.015,0.732c0.024,1.903,1.781,3.396,3.919,3.368c2.132-0.028,3.856-1.592,3.821-3.467l-0.024-1.394l-7.052,0.115    c0.468-0.575,0.747-1.277,0.732-2.038l-0.371-24.785c1.801,1.601,3.91,2.851,6.354,3.623l0.42,28.53    c0.02,1.854,2.133,3.3,4.7,3.261c1.108-0.02,2.095-0.322,2.89-0.771l0.01,0.704c0.029,1.823,2.137,3.279,4.699,3.24    c2.568-0.021,4.628-1.542,4.604-3.368l-0.024-1.338l-8.468,0.127c0.561-0.555,0.894-1.249,0.889-1.98l-0.406-27.469l7.561-0.127    l0.39,27.498c0.035,1.826,2.143,3.271,4.7,3.24c1.108-0.02,2.104-0.332,2.895-0.78l0.009,0.702    c0.035,1.836,2.139,3.299,4.701,3.25c2.572-0.028,4.627-1.551,4.598-3.377l-0.015-1.337l-8.473,0.128    c0.562-0.558,0.898-1.231,0.884-1.982l-0.396-27.468l7.541-0.107l0.41,27.478c0.024,1.826,2.132,3.279,4.689,3.241    c1.108-0.011,2.104-0.313,2.904-0.781l0.006,0.722c0.034,1.836,2.133,3.279,4.7,3.242c2.567-0.04,4.631-1.563,4.597-3.389    l-0.015-1.337l-8.472,0.128c0.556-0.548,0.898-1.221,0.888-1.953l-0.4-27.498l7.546-0.098l0.409,27.468    c0.029,1.836,2.128,3.29,4.695,3.242c1.108-0.011,2.104-0.304,2.904-0.782l0.006,0.724c0.019,1.834,2.127,3.28,4.694,3.25    c2.563-0.04,4.622-1.552,4.593-3.378l-0.01-1.347l-8.473,0.127c0.561-0.555,0.898-1.229,0.893-1.962l-0.415-27.498l7.56-0.098    l0.401,27.468c0.024,1.836,2.127,3.291,4.69,3.261c1.107-0.019,2.104-0.322,2.904-0.8l0.01,0.731    c0.019,1.826,2.123,3.28,4.69,3.24c2.573-0.037,4.622-1.541,4.612-3.377l-0.024-1.336l-8.478,0.127    c0.571-0.557,0.903-1.24,0.893-1.974l-0.405-27.477l7.55-0.116l0.411,27.477c0.02,1.835,2.127,3.28,4.695,3.251    c1.108-0.02,2.104-0.322,2.895-0.801l0.009,0.731c0.025,1.826,2.127,3.279,4.69,3.242c2.568-0.021,4.637-1.544,4.602-3.367    l-0.019-1.349l-8.464,0.127c0.558-0.557,0.898-1.24,0.884-1.972l-0.405-27.469l7.545-0.116l0.415,27.489    c0.025,1.823,2.129,3.279,4.69,3.24c1.119-0.03,2.104-0.323,2.904-0.792l0.01,0.723c0.029,1.844,2.117,3.289,4.691,3.231    c2.572-0.021,4.619-1.542,4.598-3.368l-0.01-1.347l-8.479,0.136c0.57-0.566,0.898-1.249,0.889-1.971l-0.406-27.479l7.561-0.117    l0.404,27.486c0.031,1.826,2.119,3.291,4.701,3.242c1.094-0.009,2.094-0.303,2.889-0.79v0.722c0.039,1.845,2.145,3.289,4.701,3.25    c2.572-0.037,4.627-1.561,4.602-3.387l-0.029-1.318l-8.463,0.118c0.563-0.577,0.889-1.24,0.889-1.963l-0.391-27.497l7.525-0.118    l0.43,27.489c0.025,1.823,2.129,3.289,4.686,3.24c1.098,0,2.094-0.302,2.904-0.791l0.012,0.742    c0.027,1.826,2.117,3.27,4.684,3.241c2.576-0.049,4.627-1.563,4.607-3.368l-0.02-1.348l-8.473,0.128    c0.566-0.558,0.898-1.24,0.887-1.972l-0.398-27.499l7.545-0.097l0.391,27.478c0.049,1.826,2.127,3.279,4.715,3.24    c1.111-0.009,2.107-0.312,2.889-0.779l0.01,0.723c0.039,1.825,2.129,3.279,4.695,3.24c2.576-0.04,4.627-1.542,4.605-3.378    l-0.018-1.337l-8.453,0.127c0.545-0.556,0.879-1.24,0.879-1.973l-0.41-27.486l7.545-0.108l0.4,27.487    c0.039,1.825,2.146,3.27,4.707,3.232c1.102-0.009,2.105-0.313,2.887-0.781l0.021,0.722c0.037,1.836,2.127,3.289,4.693,3.24    c2.568-0.039,4.617-1.541,4.598-3.367l-0.008-1.346l-8.484,0.125c0.566-0.557,0.898-1.238,0.898-1.971l-0.41-27.479l7.555-0.117    l0.4,27.488c0.041,1.825,2.129,3.271,4.695,3.25c1.113-0.028,2.109-0.331,2.889-0.791l0.031,0.713    c0.008,1.834,2.117,3.29,4.686,3.24c2.564-0.019,4.615-1.542,4.598-3.365l-0.01-1.349l-8.484,0.127    c0.568-0.556,0.908-1.24,0.9-1.962l-0.391-27.479l7.514-0.117l0.422,27.479c0.039,1.826,2.127,3.289,4.695,3.249    c2.576-0.027,4.615-1.551,4.605-3.377l-0.018-0.702c0.486,0.175,1.004,0.272,1.551,0.264c2.139-0.037,3.855-1.572,3.828-3.436    l-0.012-0.723l-5.426,3.261l-1.465-26.355h6.891v23.095c0.664,0.459,1.504,0.723,2.43,0.723c2.131-0.04,3.857-1.572,3.828-3.417    L374.326,433.688z" />
                  </g>
                </g>
              </svg>
              Clear
            </button>
            <button
              className="wrapper-buttons-action-history"
              onClick={handleCLickNew}
            >
              <svg
                enable-background="new 0 0 24 24"
                version="1.1"
                viewBox="0 0 24 24"
                width="20px"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="info" />
                <g id="icons">
                  <path
                    d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1z M17,14h-3v3c0,1.1-0.9,2-2,2s-2-0.9-2-2v-3H7   c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2h3V7c0-1.1,0.9-2,2-2s2,0.9,2,2v3h3c1.1,0,2,0.9,2,2C19,13.1,18.1,14,17,14z"
                    id="add"
                  />
                </g>
              </svg>
              new
            </button>
          </div>
        </div>
      </div>
      <div className="wrapper-main-list">
        {chronology !== null && typeof chronology.snapshots !== "undefined"
          ? Object.entries(chronology.snapshots).map(([key, snapshot]) => (
              <>
                <h4 className="title-history">{key}</h4>
                <ul key={key}>
                  {snapshot.map((items, index) => (
                    <li key={index}>
                      <div
                        style={{
                          borderColor:
                            chronology.current.id === items.id ? "#646cff" : ""
                        }}
                        className="wrapper-list-history"
                      >
                        <div
                          style={{
                            display: "flex",
                            paddingLeft: "0.2rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            cursor: "pointer"
                          }}
                          onClick={() => handleClickLi(items)}
                        >
                          {isEditing === index ? (
                            <input
                              type="text"
                              defaultValue={items.name}
                              value={currentValue}
                              onBlur={handleBlurForEditLi}
                              onChange={(e) =>
                                handleChandeEdit(e, index, items)
                              }
                              autoFocus
                              onKeyDown={handleKeyEnter}
                              autoComplete="off"
                              className="input-edit-li"
                              onFocus={handleFocus}
                            />
                          ) : (
                            <button className="button-history-action">
                              {items.name}
                            </button>
                          )}
                        </div>
                        <div className="wrapper-for-action-edit-delete">
                          <button onClick={() => editing(index, items)}>
                            <svg
                              enable-background="new 0 0 50 50"
                              height="50px"
                              id="Layer_1"
                              version="1.1"
                              viewBox="0 0 50 50"
                              width="50px"
                              xml:space="preserve"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              fill="#FFFFFF"
                              className="svg-button-li"
                            >
                              <rect fill="none" height="50" width="50" />
                              <polyline
                                fill="none"
                                points="42.948,12.532 10.489,44.99 3,47 5.009,39.511 37.468,7.052"
                                stroke="#FFFFFF"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                                strokeWidth="2"
                              />
                              <path
                                d="M45.749,11.134c-0.005,0.004,0.824-0.825,0.824-0.825c1.901-1.901,1.901-4.983,0.002-6.883c-1.903-1.902-4.984-1.9-6.885,0  c0,0-0.83,0.83-0.825,0.825L45.749,11.134z"
                                fill="#FFFFFF"
                              />
                              <polygon
                                points="5.191,39.328 10.672,44.809 3.474,46.526"
                                fill="#FFFFFF"
                              />
                            </svg>
                          </button>
                          <button onClick={() => handleDeleteItemForLi(items)}>
                            <svg
                              id="Layer_1"
                              style={{
                                enableBackground: "new 0 0 24 24",
                                width: "20px",
                                height: "20px"
                              }}
                              version="1.1"
                              viewBox="0 0 24 24"
                              xmlSpace="preserve"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                              <style type="text/css">
                                {`
        .st0, .st1, .st2 { 
          fill: none; 
          stroke: white; /* Cambiado a blanco */
          strokeLinecap: round; 
          strokeLinejoin: round; 
          strokeMiterlimit: 10; 
        }
        .st1 { strokeWidth: 1.5; }
        .st2 { strokeWidth: 1.5; }
      `}
                              </style>
                              <g>
                                <g>
                                  <g>
                                    <path
                                      className="st1"
                                      d="M17.7,23.3H6.3c-1,0-1.7-0.8-1.7-1.7V6.6h14.8v14.9C19.4,22.5,18.6,23.3,17.7,23.3z"
                                    />
                                  </g>
                                  <g>
                                    <path
                                      className="st1"
                                      d="M20.4,6V4.2c0-0.7-0.6-1.3-1.3-1.3h-3.7L15,1.4C14.8,1,14.5,0.8,14,0.8H10C9.6,0.8,9.2,1,9,1.4L8.6,2.8H4.9 c-0.7,0-1.3,0.6-1.3,1.3V6c0,0.3,0.3,0.6,0.6,0.6h15.6C20.2,6.6,20.4,6.3,20.4,6z"
                                    />
                                  </g>
                                </g>
                                <g>
                                  <g>
                                    <line
                                      className="st1"
                                      x1="8.8"
                                      x2="8.8"
                                      y1="10.2"
                                      y2="19.7"
                                    />
                                  </g>
                                  <g>
                                    <line
                                      className="st1"
                                      x1="12"
                                      x2="12"
                                      y1="10.2"
                                      y2="19.7"
                                    />
                                  </g>
                                  <g>
                                    <line
                                      className="st1"
                                      x1="15.2"
                                      x2="15.2"
                                      y1="10.2"
                                      y2="19.7"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ))
          : ""}
      </div>
    </div>
  );
};
