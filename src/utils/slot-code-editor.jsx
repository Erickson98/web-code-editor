class MonacoEditor extends HTMLElement {
  static get observedAttributes() {
    return ["data-image-src", "grid-area", "overflow"]; // Lista de atributos observados
  }
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
        :host{
          position:relative;
          overflow:hidden;
        } 
        .imamge-js{
                  position: absolute;
                  width: 45px;
                  height: 45px;
                  bottom: 20px;
                  right: 15px; 
                  object-fit: contain;
                  object-position: center;
                  pointer-events: none;
        }
        slot{
          display:contenst; 
        }
        slot:focus-within + img{
          opacity: 0.1;
        }
        slot:hover + img{
          opacity: 0.2;
        }
      </style>
      <slot class="editor-class">
      
      </slot>
      <img class="imamge-js"
          src="src/assets/js.png"
          alt=""
          srcset=""
        
        />
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-image-src") {
      this.updateImageSrc(newValue);
    } else if (name === "grid-area") {
      this.updateGridArea(newValue);
    } else if (name === "overflow") {
      this.updateOverflowProperty(newValue);
    }
  }

  updateImageSrc(src) {
    const image = this.shadowRoot.querySelector(".imamge-js");
    if (image) {
      image.src = src;
    }
  }
  updateGridArea(area) {
    this.style.gridArea = area;
  }
  updateOverflowProperty(property) {
    this.style.overflow = property;
  }
}

if (!customElements.get("monaco-editor")) {
  customElements.define("monaco-editor", MonacoEditor);
}
