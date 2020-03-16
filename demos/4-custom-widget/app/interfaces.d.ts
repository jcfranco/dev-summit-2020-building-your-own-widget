import Portal = require("esri/portal/Portal");
import WidgetProperties = __esri.WidgetProperties;

export interface ItemScoreProperties
  extends ItemScoreViewModelProperties,
    WidgetProperties {}

export interface ItemScoreViewModelProperties {
  portal?: Portal;
  itemId?: string;
}

export interface Suggestion {
  property: string;
  type: "add" | "enhance";
}

