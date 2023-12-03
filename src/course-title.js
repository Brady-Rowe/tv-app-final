// import stuff
import { LitElement, html, css } from "lit";
import "@shoelace-style/shoelace/dist/shoelace.js";





export class CourseTitle extends LitElement {
  // defaults
  constructor() {
    super();
    this.title = "";
    this.presenter = "";
    this.id = "";
    this.time = "";
   
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return "course-title";
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
      id: { type: String },
      time: { type: String },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return css`
      :host {
        display: inline-flex;
       
      }
      .wrapper {
        padding: 16px;
        background-color: #eeeeee;
      
      }

      #codelab-title {
        background: #fff;
        box-shadow:
          0 1px 2px 0 rgba(60, 64, 67, 0.3),
          0 2px 6px 2px rgba(60, 64, 67, 0.15);
        color: #3c4043;
        display: flex;
        grid-area: title;
        align-items: center;
        justify-content: space-between;
        height: 64px;
        padding: 0 36px 0 16px;
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        
      }

      .title {
        width: auto;
        color: #3c4043;
        top: 0;
        font-size: 20px;
        font-weight: 400;
        margin: 0 8px;

        font-family: Roboto, Noto, sans-serif;

        flex-grow: 1;

        flex-shrink: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 0;
        display: inline-block;
      }

      .title a { 
        color: #5a5e61;
        text-decoration: none;
      }
      .stopwatch{
       
      }
    `;
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div id="codelab-title">
        <!-- <div id="codelab-nav-buttons">
          <a href="/" id="arrow-back" class="no-return-url"
            ><i class="material-icons">close</i></a
          ><a href="#" id="menu"><i class="material-icons">menu</i></a>
        </div> -->
        <h1 is-upgraded="" class="title">
          <a
            href="https://codelabs.developers.google.com/codelabs/the-lit-path?hl=en"
            >From Web Component to Lit Element</a
          >
        </h1>
    
        <sl-icon class="stopwatch" style="margin-right:3px; font-size:20px; " name="stopwatch"></sl-icon>
        <div class="codelab-time-container">

          <div
            class="time-remaining"
            tabindex="0"
            role="timer"
            data-title="Estimated time remaining: 40 minutes"
          >
            ${this.time}
          </div>
        </div>

     
       <div style= "margin:15px">
        <sl-dropdown>
          
  <sl-button slot="trigger" caret>English</sl-button>
  <sl-menu>
    <sl-menu-item>English</sl-menu-item>
    <sl-menu-item>Deutsch</sl-menu-item>
    <sl-menu-item>Español</sl-menu-item>
    <sl-menu-item>Français</sl-menu-item>
    <sl-menu-item>Indonesia</sl-menu-item>
    <sl-menu-item>Portuguès</sl-menu-item>
  
  </sl-menu>
</sl-dropdown>
</div>



    
<div class="">
  <div class="" id="gb">
    <div class="" ng-non-bindable="" data-ogsr-up="" style="padding:0;height:auto;display:block">
      <div class="" style="display:block">
        <div class=""></div>
        <div class="">
          <div class="">
            <a class="" aria-label="Google Account: Brady Rowe (bradyroweny@gmail.com)" href="https://accounts.google.com/SignOutOptions?hl=en&amp;continue=https://codelabs.developers.google.com/_d/profile/ogb%3Fhl%3Den&amp;ec=GBRAywI" role="button" tabindex="0" id="devsite-signin-btn">
              <img class="" style = "border-radius: 33px" href ="https://lh3.googleusercontent.com/a/ACg8ocKF24gHFrpmH-ZMHX-UgaN5h8PiW-QYfb4qL-saKFdcQw=s32-c-no" 
              srcset="https://lh3.googleusercontent.com/a/ACg8ocKF24gHFrpmH-ZMHX-UgaN5h8PiW-QYfb4qL-saKFdcQw=s32-c-no 1x, https://lh3.googleusercontent.com/a/ACg8ocKF24gHFrpmH-ZMHX-UgaN5h8PiW-QYfb4qL-saKFdcQw=s64-c-no 2x" alt="" aria-hidden="true" data-noaft="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    `;
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(CourseTitle.tag, CourseTitle);
