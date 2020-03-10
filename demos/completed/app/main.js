define(["require", "exports", "esri/core/urlUtils", "./ItemScoreImprover"], function (require, exports, urlUtils_1, ItemScoreImprover) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //----------------
    //  item setup
    //----------------
    var itemId = "696e66d1c1e54b3ea775fc93adb9c4e0";
    // use resource proxy if we're in 'demo mode'
    if (location.host === "localhost") {
        urlUtils_1.addProxyRule({
            urlPrefix: "https://www.arcgis.com",
            proxyUrl: "http://localhost/proxy"
        });
        urlUtils_1.addProxyRule({
            urlPrefix: "https://cdn.arcgis.com",
            proxyUrl: "http://localhost/proxy"
        });
    }
    //----------------
    //  widget setup
    //----------------
    var improver = new ItemScoreImprover({ itemId: itemId, container: "widgetDiv" });
    // add to window for demo
    window.improver = improver;
});
//# sourceMappingURL=main.js.map