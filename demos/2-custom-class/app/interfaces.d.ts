import Portal = require("esri/portal/Portal");

export interface ItemScoreProperties {
  portal?: Portal;
  itemId?: string;
}

export interface Suggestion {
  property: string;
  type: "add" | "enhance";
}

