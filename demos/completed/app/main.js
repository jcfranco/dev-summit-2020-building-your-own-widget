define(["require", "exports", "./ItemScore", "demos/config"], function (require, exports, ItemScore) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //----------------
    //  widget setup
    //----------------
    var itemScore = new ItemScore({ container: "widgetDiv" });
    // add to window for demo
    window.itemScore = itemScore;
});
//# sourceMappingURL=main.js.map