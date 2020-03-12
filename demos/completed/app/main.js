define(["require", "exports", "./ItemScoreImprover", "demos/config"], function (require, exports, ItemScoreImprover) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //----------------
    //  widget setup
    //----------------
    var improver = new ItemScoreImprover({ container: "widgetDiv" });
    // add to window for demo
    window.improver = improver;
});
//# sourceMappingURL=main.js.map