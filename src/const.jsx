export const PropertiesCss = Object.freeze({
  INLINE: "inline",
  NONE: "none"
});

export const propertiesGlobal = Object.freeze({
  DEPENDENCIES: "Dependencies",
  HISTORY: "History",
  SETTINGS: "Settings",
  CDN_URL: "https://cdn.skypack.dev",
  PACKAGE_VIEW_URL: "https://www.skypack.dev/view/",
  CDN_JS_DELIVER: "https://cdn.jsdelivr.net/npm/{}@{}/+esm",
  EMPTY_CONTENT_ENCODE:
    "JTdDJTdDJTdDJTNDc3R5bGUlM0UlN0MlN0MlN0MlN0MlN0MlN0MlM0MlMkZzdHlsZSUzRSU3QyU3QyU3QyUzQ3NjcmlwdCUyMHR5cGUlM0QlMjJtb2R1bGUlMjIlM0UlN0MlN0MlN0MlN0MlN0MlN0MlM0MlMkZzY3JpcHQlM0U=",
  DEFAULT_HISTORY_ITEMS_NAME: "Untitle"
});

export const listGuttersConfig = Object.freeze({
  DEFAULT_LAYOUT: "DEFAULT_LAYOUT",
  VERTICAL_LAYOUT: "VERTICAL_LAYOUT",
  DEFAULT_LAYOUT_2: "DEFAULT_LAYOUT_2",
  BOTTOM_LAYOUT: "BOTTOM_LAYOUT",
  HORIZONTAL_LAYOUT: "HORIZONTAL_LAYOUT"
});

export const PropertiesLayouts = Object.freeze({
  get GRID_CONFIG_1() {
    return `grid-template-columns: 1fr 8px 1fr; 
    grid-template-rows: 1fr 8px 1fr;
    grid-template-areas: 
    "firstEditor  firstGutter secondEditor" 
    "secondGutter thirdGutter ."
    "thirdEditor  . fourthGutter";
    `;
  },
  get GRID_CONFIG_2() {
    return `grid-template-columns: 1fr 8px 1fr 8px 1fr;
      grid-template-rows: 1fr 8px 1fr;
      grid-template-areas: 
      "fourthGutter fourthGutter fourthGutter fourthGutter fourthGutter" 
      "secondGutter secondGutter secondGutter secondGutter secondGutter"
      "firstEditor firstGutter secondEditor thirdGutter thirdEditor";
      `;
  },
  get GRID_CONFIG_3() {
    return `grid-template-columns: 1fr 8px 1fr;
      grid-template-rows: 1fr 8px 1fr;
      grid-template-areas: 
      "firstEditor  firstGutter  thirdEditor" 
      "secondGutter thirdGutter ."
      " secondEditor . fourthGutter";
      `;
  },
  get GRID_CONFIG_4() {
    return `grid-template-columns: 1fr 8px 1fr 8px 1fr 8px 1fr; grid-template-rows: 1fr; 
    grid-template-areas: 
    "firstEditor firstGutter secondEditor secondGutter thirdEditor thirdGutter fourthGutter";`;
  },
  get GRID_CONFIG_5() {
    return `grid-template-columns:1fr 8px 1fr; grid-template-rows: 1fr 8px 1fr 8px 1fr;
    grid-template-areas:
    "firstEditor firstGutter fourthGutter"
    "secondGutter firstGutter fourthGutter"
    "secondEditor firstGutter fourthGutter"
    "thirdGutter  firstGutter fourthGutter"
    "thirdEditor   firstGutter fourthGutter";
    `;
  }
});

export const setConfigLayout = (doc, configNumber) => {
  switch (configNumber) {
    case "DEFAULT_LAYOUT":
      doc.querySelector(".wrapper").style = PropertiesLayouts.GRID_CONFIG_1;
      firstGuttersConfig(doc);
      break;
    case "BOTTOM_LAYOUT":
      doc.querySelector(".wrapper").style = PropertiesLayouts.GRID_CONFIG_2;
      secondGuttersConfig(doc);
      break;
    case "DEFAULT_LAYOUT_2":
      doc.querySelector(".wrapper").style = PropertiesLayouts.GRID_CONFIG_3;
      thirdGuttersConfig(doc);
      break;
    case "VERTICAL_LAYOUT":
      doc.querySelector(".wrapper").style = PropertiesLayouts.GRID_CONFIG_4;
      fourthGuttersConfig(doc);
      break;
    case "HORIZONTAL_LAYOUT":
      doc.querySelector(".wrapper").style = PropertiesLayouts.GRID_CONFIG_5;
      fiveGuttersConfig(doc);
      break;
  }
};

const firstGuttersConfig = (doc) => {
  const firstGutter = doc.querySelector(".first-gutter");
  firstGutter.classList.remove(...firstGutter.classList);
  firstGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_1_FIRST_GUTTER;
  firstGutter.classList.add("first-gutter");
  firstGutter.classList.add("column");

  const secondGutter = doc.querySelector(".second-gutter");
  secondGutter.classList.remove(...secondGutter.classList);
  secondGutter.classList.add("second-gutter");
  secondGutter.classList.add("row");
  secondGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_1_SECOND_GUTTER;

  const thirdGutter = doc.querySelector(".third-gutter");
  thirdGutter.classList.remove(...thirdGutter.classList);
  thirdGutter.classList.add("third-gutter");
  thirdGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_1_THIRD_GUTTER;
};

const secondGuttersConfig = (doc) => {
  const secondGutter = doc.querySelector(".second-gutter");
  secondGutter.classList.remove(...secondGutter.classList);
  secondGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_2_SECOND_GUTTER;
  secondGutter.classList.add("second-gutter");
  secondGutter.classList.add("row");

  const thirdGutter = doc.querySelector(".third-gutter");
  thirdGutter.classList.remove(...thirdGutter.classList);
  thirdGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_2_THIRD_GUTTER;
  thirdGutter.classList.add("third-gutter");
  thirdGutter.classList.add("column");

  const firstGutter = doc.querySelector(".first-gutter");
  firstGutter.classList.remove(...firstGutter.classList);
  firstGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_2_FIRST_GUTTER;
  firstGutter.classList.add("first-gutter");
  firstGutter.classList.add("column");
};

const thirdGuttersConfig = (doc) => {
  const firstGutter = doc.querySelector(".first-gutter");
  firstGutter.classList.remove(...firstGutter.classList);
  firstGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_3_FIRST_GUTTER;
  firstGutter.classList.add("first-gutter");
  firstGutter.classList.add("column");

  const secondGutter = doc.querySelector(".second-gutter");
  secondGutter.classList.remove(...secondGutter.classList);
  secondGutter.classList.add("second-gutter");
  secondGutter.classList.add("row");
  secondGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_3_SECOND_GUTTER;

  const thirdGutter = doc.querySelector(".third-gutter");
  thirdGutter.classList.remove(...thirdGutter.classList);
  thirdGutter.classList.add("third-gutter");
  thirdGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_3_THIRD_GUTTER;
};

const fourthGuttersConfig = (doc) => {
  const firstGutter = doc.querySelector(".first-gutter");
  firstGutter.classList.remove(...firstGutter.classList);
  firstGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_4_FIRST_GUTTER;
  firstGutter.classList.add("first-gutter");
  firstGutter.classList.add("column");

  const secondGutter = doc.querySelector(".second-gutter");
  secondGutter.classList.remove(...secondGutter.classList);
  secondGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_4_SECOND_GUTTER;
  secondGutter.classList.add("second-gutter");
  secondGutter.classList.add("column");

  const thirdGutter = doc.querySelector(".third-gutter");
  thirdGutter.classList.remove(...thirdGutter.classList);
  thirdGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_4_THIRD_GUTTER;
  thirdGutter.classList.add("third-gutter");
  thirdGutter.classList.add("column");
};

const fiveGuttersConfig = (doc) => {
  const firstGutter = doc.querySelector(".first-gutter");
  firstGutter.classList.remove(...firstGutter.classList);
  firstGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_5_FIRST_GUTTER;
  firstGutter.classList.add("first-gutter");
  firstGutter.classList.add("column");

  const secondGutter = doc.querySelector(".second-gutter");
  secondGutter.classList.remove(...secondGutter.classList);
  secondGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_5_SECOND_GUTTER;
  secondGutter.classList.add("second-gutter");
  secondGutter.classList.add("row");

  const thirdGutter = doc.querySelector(".third-gutter");
  thirdGutter.classList.remove(...thirdGutter.classList);
  thirdGutter.style = PropertiesGridArea.GRID_AREA_CONFIG_5_THIRD_GUTTER;
  thirdGutter.classList.add("third-gutter");
  thirdGutter.classList.add("row");
};

export const PropertiesGridArea = Object.freeze({
  GRID_AREA_CONFIG_1_FIRST_GUTTER: "grid-area: firstGutter; grid-row-end: 4;",
  GRID_AREA_CONFIG_2_FIRST_GUTTER: "grid-area: firstGutter ",
  GRID_AREA_CONFIG_3_FIRST_GUTTER: "grid-area: firstGutter; grid-row-end: 4;",
  GRID_AREA_CONFIG_4_FIRST_GUTTER: "grid-area: firstGutter;",
  GRID_AREA_CONFIG_5_FIRST_GUTTER: "grid-area: firstGutter",
  GRID_AREA_CONFIG_1_SECOND_GUTTER:
    "grid-area:secondGutter; grid-column-end: 4;",
  GRID_AREA_CONFIG_2_SECOND_GUTTER: "grid-area:secondGutter;",
  GRID_AREA_CONFIG_3_SECOND_GUTTER:
    "grid-area:secondGutter; grid-column-end: 4;",
  GRID_AREA_CONFIG_4_SECOND_GUTTER: "grid-area: secondGutter;",
  GRID_AREA_CONFIG_5_SECOND_GUTTER: "grid-area: secondGutter;",
  GRID_AREA_CONFIG_1_THIRD_GUTTER: `grid-area:thirdGutter;`,
  GRID_AREA_CONFIG_2_THIRD_GUTTER: "grid-area:thirdGutter;",
  GRID_AREA_CONFIG_3_THIRD_GUTTER: "grid-area:thirdGutter;",
  GRID_AREA_CONFIG_4_THIRD_GUTTER: "grid-area:thirdGutter;",
  GRID_AREA_CONFIG_5_THIRD_GUTTER: "grid-area: thirdGutter;"
});

export const DEFAULT_SETTINGS = {
  lineNumbers: "on",
  fontLigatures: true,
  fontFamily: "Cascadia Code",
  minimap: { enable: false },
  wordWrap: "on",
  fontSize: 16,
  fileName: "code.editor"
};

export const DEFAULT_LAYOUT = (doc) => {
  return {
    columnGutters: [
      {
        track: 1,
        element: doc.querySelector(".first-gutter")
      },
      {
        track: 1,
        element: doc.querySelector(".third-gutter")
      }
    ],
    rowGutters: [
      {
        track: 1,
        element: doc.querySelector(".second-gutter")
      },
      {
        track: 1,
        element: doc.querySelector(".third-gutter")
      }
    ]
  };
};

export const VERTICAL_LAYOUT = (doc) => {
  return {
    columnGutters: [
      {
        track: 1,
        element: doc.querySelector(".first-gutter")
      },
      {
        track: 3,
        element: doc.querySelector(".second-gutter")
      },
      {
        track: 5,
        element: doc.querySelector(".third-gutter")
      }
    ]
  };
};

export const HORIZONTAL_LAYOUT = (doc) => {
  return {
    columnGutters: [
      {
        track: 1,
        element: doc.querySelector(".first-gutter")
      }
    ],
    rowGutters: [
      {
        track: 1,
        element: doc.querySelector(".second-gutter")
      },
      {
        track: 3,
        element: doc.querySelector(".third-gutter")
      }
    ]
  };
};

export const BOTTOM_LAYOUT = (doc) => {
  return {
    columnGutters: [
      {
        track: 1,
        element: doc.querySelector(".first-gutter")
      },
      {
        track: 3,
        element: doc.querySelector(".third-gutter")
      }
    ],
    rowGutters: [
      {
        track: 1,
        element: doc.querySelector(".second-gutter")
      }
    ]
  };
};

export const selectConfigGutter = (doc) => {
  return {
    DEFAULT_LAYOUT: DEFAULT_LAYOUT(doc),
    DEFAULT_LAYOUT_2: DEFAULT_LAYOUT(doc),
    VERTICAL_LAYOUT: VERTICAL_LAYOUT(doc),
    HORIZONTAL_LAYOUT: HORIZONTAL_LAYOUT(doc),
    BOTTOM_LAYOUT: BOTTOM_LAYOUT(doc)
  };
};
