import Portal = require("esri/portal/Portal");

export interface ItemScoreViewModelProperties {
  portal?: Portal;
  itemId?: string;
}

export interface Suggestion {
  property: string;
  type: "add" | "enhance";
}

