import { addProxyRule } from "esri/core/urlUtils";

import ItemScoreImprover = require("./ItemScoreImprover");

//----------------
//  item setup
//----------------

const itemId = "696e66d1c1e54b3ea775fc93adb9c4e0";

// use resource proxy if we're in 'demo mode'
if (location.host === "localhost") {
  addProxyRule({
    urlPrefix: "https://www.arcgis.com",
    proxyUrl: "http://localhost/proxy"
  });

  addProxyRule({
    urlPrefix: "https://cdn.arcgis.com",
    proxyUrl: "http://localhost/proxy"
  });
}

//----------------
//  widget setup
//----------------

const widget = new ItemScoreImprover({ itemId, container: "widgetDiv" });
