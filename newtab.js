import { html, render } from "./htm-preact.js";

import { App } from "./components/App/App.js";

render(html`<${App} />`, document.querySelector("#app"));
