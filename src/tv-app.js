// import stuff
import { LitElement, html, css } from "lit";
import "./tv-channel.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "./course-title.js";

export class TvApp extends LitElement {
  constructor() {
    super();
    this.source = new URL("../assets/channels.json", import.meta.url).href;
    this.listings = []; // To store the listings/data from the JSON file
    this.id = ""; // To store the id of the course
    this.selectedCourse = null; // To store the selected course
    this.activeIndex = null; // To keep track of the active index
    this.activeContent = ""; // To store the active content HTML
    this.itemClick = this.itemClick.bind(this); // listening to the object that fire the object
    this.time = ""; // To store the timecode of the content
  }

  // LitElement life cycle for when the element is added to the DOM
  connectedCallback() {
    super.connectedCallback(); // helps in setting up the initial state of the component
  }

  static get tag() {
    return "tv-app";
  }

  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      name: { type: String },
      source: { type: String }, // To fetch the JSON file
      listings: { type: Array },
      selectedCourse: { type: Object },
      contents: { type: Array },
      id: { type: String },
      activeIndex: { type: Number },
      activeContent: { type: String },
      // time: { type: String },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin: 16px;
          padding: 16px;
        }

        .alignContent {
          display: flex;
          justify-content: flex-start;
          gap: 90px;
        }

        .course-topics {
          margin-left: -36px;
          display: flex;
          flex-direction: column;
          width: 275px;
          margin-right: 1px;
          margin-top: 25px;
          position: fixed;
          padding-top: 8px;
          padding-right: 5px;
        }

        .main {
          margin: 42px 141px 23px 386px;
          padding-top: 8px;
          padding-right: 5px;
          padding-bottom: 1px;
          padding-left: 20px;
          width: calc(100% - 291px);
          height: 100%;
          font-size: 1em;
          border: 1px solid #dadce0;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #f8f9fa;
          font: 400 16px/24px var(--devsite-primary-font-family);
          -webkit-font-smoothing: antialiased;
          text-size-adjust: 100%;
          color: #4e5256;
          font-family: var(--devsite-primary-font-family);
          background: #f8f9fa;
        }

        .fabs {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          position: fixed;
          bottom: 0;
          right: 0;
          margin: 19px;
          width: 81vw;
        }

        #previous > button {
          border-radius: 4px;
          font-family:
            Google Sans,
            Arial,
            sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.6px;
          line-height: 24px;
          padding-bottom: 6px;
          padding-left: 24px;
          padding-right: 24px;
          padding-top: 6px;
          pointer-events: auto;
          text-transform: none;
          background: #fff;
          color: #1a73e8;
          border: 0;
          box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 1px 5px 0 rgba(0, 0, 0, 0.12),
            0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        #next > button {
          border-radius: 4px;
          font-family:
            Google Sans,
            Arial,
            sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.6px;
          line-height: 24px;
          padding-bottom: 6px;
          padding-left: 24px;
          padding-right: 24px;
          padding-top: 6px;
          pointer-events: auto;
          text-transform: none;
          background: #1a73e8;
          color: #fff;
          border: 0;
          box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 1px 5px 0 rgba(0, 0, 0, 0.12),
            0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
      `,
    ];
  }

  render() {
    return html`
      <course-title time="${this.time}"> </course-title>
      <div class="alignContent">
        <div class="course-topics">
          ${this.listings.map(
            (item, index) => html`
              <tv-channel
                title="${item.title}"
                id="${item.id}"
                @click="${() => this.itemClick(index)}"
                activeIndex="${this.activeIndex}"
              >
              </tv-channel>
            `,
          )}
        </div>

        <div class="main">
          <!-- ternary operator to check if the active content is null or not -->
          ${this.activeContent ? unsafeHTML(this.activeContent) : html``}
        </div>

        <div class="fabs">
          <div id="previous">
            <button @click=${() => this.prevPage()}>Back</button>
          </div>
          <div id="next">
            <button @click=${() => this.nextPage()}>Next</button>
          </div>
        </div>
      </div>
    `;
  }

  async nextPage() {
    if (this.activeIndex !== null) {
      const nextIndex = this.activeIndex + 1;
      const item = this.listings[nextIndex].location;

      const contentPath = "/assets/" + item;

      try {
        const response = await fetch(contentPath);
        this.activeContent = await response.text();
        // console.log("Active Content", this.activeContent);
        this.activeIndex = nextIndex; // Update the active index after fetching content
      } catch (err) {
        console.log("fetch failed", err);
      }
    }
  }

  // function to fetch the previous content
  async prevPage() {
    if (this.activeIndex !== null) {
      // console.log("Active Index: ", this.activeIndex);

      const prevIndex = this.activeIndex - 1; // Get the previous index

      const item = this.listings[prevIndex].location; // Get the location of the content

      const contentPath = "/assets/" + item;

      try {
        const response = await fetch(contentPath);
        this.activeContent = await response.text();
        // console.log("Active Content", this.activeContent);
        this.activeIndex = prevIndex; // Update the active index after fetching content
      } catch (err) {
        console.log("fetch failed", err);
      }
    }
  }

  // Funtion to fetch for the content that is being clicked
  async itemClick(index) {
    this.activeIndex = index; // Update the active index after fetching content
    // console.log("Active Index: ", this.activeIndex);

    const item = this.listings[index].location; // Get the location of the content
    // console.log("Active Content: ", item);

    this.time = this.listings[index].metadata.timecode; // Get the timecode of the content
    // console.log("Time: ", this.time);

    const contentPath = "/assets/" + item;

    // add the path to fetch for the content that presist in our assets folder
    try {
      const response = await fetch(contentPath);
      // console.log("Response: ", response);
      const text = await response.text();
      // console.log("Text: ", text);
      this.activeContent = text; // Update the active content after fetching
    } catch (err) {
      console.log("fetch failed", err);
    }
  }

  // LitElement life cycle for when any property changes
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  // API fetches the JSON file and updates the listings array
  async updateSourceData(source) {
    await fetch(source)
      .then((resp) => (resp.ok ? resp.json() : []))
      .then((responseData) => {
        if (
          responseData.status === 200 &&
          responseData.data.items &&
          responseData.data.items.length > 0
        ) {
          this.listings = [...responseData.data.items]; // Spread operator to clone the array
          console.log("Listings: ", this.listings);
        }
      });
  }
}

// tell the browser about our tag and class it should run when it sees it
customElements.define(TvApp.tag, TvApp);
