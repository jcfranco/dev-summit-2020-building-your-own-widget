define(["require", "exports", "esri/core/urlUtils", "./ItemScoreImprover"], function (require, exports, urlUtils_1, ItemScoreImprover) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //----------------
    //  item setup
    //----------------
    var itemId = "696e66d1c1e54b3ea775fc93adb9c4e0";
    urlUtils_1.addProxyRule({
        urlPrefix: "https://www.arcgis.com",
        proxyUrl: "http://localhost/proxy"
    });
    urlUtils_1.addProxyRule({
        urlPrefix: "https://cdn.arcgis.com",
        proxyUrl: "http://localhost/proxy"
    });
    //----------------
    //  widget setup
    //----------------
    var widget = new ItemScoreImprover({ itemId: itemId, container: "widgetDiv" });
});
//# sourceMappingURL=main.js.map