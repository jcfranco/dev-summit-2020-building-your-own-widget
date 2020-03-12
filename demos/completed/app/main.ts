import "demos/config";
import ItemScoreImprover = require("./ItemScoreImprover");

//----------------
//  widget setup
//----------------

const improver = new ItemScoreImprover({ container: "widgetDiv" });

// add to window for demo
(window as any).improver = improver;

