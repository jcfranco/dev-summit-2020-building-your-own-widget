import "demos/config";
import ItemScoreImprover = require("./ItemScoreImprover");

//----------------
//  class setup
//----------------

const improver = new ItemScoreImprover();

// add to window for demo
(window as any).improver = improver;
