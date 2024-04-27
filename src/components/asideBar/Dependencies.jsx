import React, { useState, useEffect, useRef } from "react";
import { DisplayList } from "./displayElements/DisplayList.jsx";
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

export const Dependecies = ({
  searchMorePackage,
  setSearchMorePackage,
  setDecode
}) => {
  const [inputValue, setInputValue] = useState("");
  const [TotalHits, setTotalHits] = useState(0);
  const [searching, setSearching] = useState(true);
  const [dataPackage, setDataPackage] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const debouncedQuery = useDebounce(inputValue, 500);

  const countResultRef = useRef(null);
  const displayListRef = useRef(null);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (!event.target.value) {
      setSearching(true);
      setSearchMorePackage(0);
      setDataPackage({});
      setInputValue("");
    }

    setDataPackage({});
    setSearchMorePackage(0);
  };
  const fetchPackageFromSkypack = async (packageName, pageNumber) => {
    if (inputValue !== "") {
      try {
        if (debouncedQuery.trim() === "") {
          return;
        }

        const lastFetchAbortController = new window.AbortController();

        const resultFetch = await window.fetch(
          "https://ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)&x-algolia-application-id=OFCNCOG2CU&x-algolia-api-key=f54e21fa3a2a0160595bb058179bfb1e",
          {
            headers: {
              accept: "application/json",
              "accept-language": "es-ES,es;q=0.6",
              "content-type": "application/x-www-form-urlencoded",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "cross-site",
              "sec-gpc": "1"
            },
            referrer: "https://www.jsdelivr.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: `{"params": "query=${packageName}&page=${pageNumber}&hitsPerPage=10&attributesToRetrieve=%5B%22deprecated%22%2C%22description%22%2C%22githubRepo%22%2C%22homepage%22%2C%22keywords%22%2C%22license%22%2C%22name%22%2C%22owner%22%2C%22version%22%2C%22popular%22%2C%22moduleTypes%22%2C%22styleTypes%22%2C%22jsDelivrHits%22%5D&analyticsTags=%5B%22jsdelivr%22%5D&facetFilters=moduleTypes%3Aesm"}`,
            method: "POST",
            mode: "cors",
            credentials: "omit",
            signal: lastFetchAbortController.signal
          }
        );
        const data = await resultFetch.json();
        setCurrentPageNumber(data.nbPages);
        setTotalHits(data.nbHits.toLocaleString("en-US"));
        setSearching(false);

        setDataPackage((prevData) => {
          if (Object.keys(prevData).length > 0) {
            const allNames = new Set(prevData.hits.map((item) => item.name));
            const hasDuplicates = data.hits.some((item) =>
              allNames.has(item.name)
            );
            if (!hasDuplicates) {
              data.hits.unshift(...prevData.hits);
            }

            return data;
          } else {
            return data;
          }
        });
        if (pageNumber + 1 > data.nbPages) {
          setHasMore(false);
        }
      } catch (error) {
        return error;
      }
    }
  };

  useEffect(() => {
    if (searchMorePackage < currentPageNumber + 1) {
      fetchPackageFromSkypack(inputValue, searchMorePackage);
    }
  }, [debouncedQuery]);
  return (
    <div className="dependencies-content">
      <div className="wrapper-search-content">
        <div style={{ marginBottom: "0.9rem" }}>
          <strong>
            <span style={{ opacity: "0.6" }}> Javascript: </span>
          </strong>
          <strong>
            <span>Add dependency</span>
          </strong>
          <p>
            An import statement will be added to the top of the JavaScript
            editor for the package.
          </p>
        </div>
        <div className="search-bar">
          <div style={{ display: "flex", flex: "1" }}>
            <svg
              enable-background="new 0 0 32 32"
              id="Stock_cut"
              version="1.1"
              viewBox="0 0 32 32"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              className="search-icon"
            >
              <desc />
              <g>
                <path
                  d="M21,21L21,21   c1.105-1.105,2.895-1.105,4,0l5.172,5.172c0.53,0.53,0.828,1.25,0.828,2v0C31,29.734,29.734,31,28.172,31h0   c-0.75,0-1.47-0.298-2-0.828L21,25C19.895,23.895,19.895,22.105,21,21z"
                  fill="none"
                  stroke="#80808080"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <circle
                  cx="11"
                  cy="11"
                  fill="none"
                  r="10"
                  stroke="#80808080"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <path
                  d="M11,5   c-3.314,0-6,2.686-6,6"
                  fill="none"
                  stroke="#80808080"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  fill="none"
                  stroke="#80808080"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  x1="18"
                  x2="21"
                  y1="18"
                  y2="21"
                />
              </g>
            </svg>
            <input
              type="search"
              className="input-search-dependencie"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search npm and add a package..."
              autoComplete="off"
            />
          </div>
        </div>
        <div
          style={{ fontSize: "13px", padding: "5px 0" }}
          ref={countResultRef}
        >
          {inputValue ? (
            searching ? (
              <strong>Searching...</strong>
            ) : (
              <strong>
                {TotalHits} results for &quot;{inputValue}&quot;
              </strong>
            )
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0px",
          margin: "0px"
        }}
      >
        <DisplayList
          data={dataPackage}
          searching={searching}
          inputValue={inputValue}
          setCurrentPageNumber={setSearchMorePackage}
          pageNumber={searchMorePackage}
          hasMore={hasMore}
          displayListRef={displayListRef}
          fetchPackageFromSkypack={fetchPackageFromSkypack}
          packageName={debouncedQuery}
          setDecode={setDecode}
        />
      </div>
    </div>
  );
};
