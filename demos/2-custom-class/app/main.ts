import "demos/config";
import ItemScore = require("./ItemScore");

//----------------
//  class setup
//----------------

const itemScore = new ItemScore();

// add to window for demo
(window as any).itemScore = itemScore;
