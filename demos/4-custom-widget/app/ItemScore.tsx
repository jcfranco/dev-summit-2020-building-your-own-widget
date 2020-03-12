/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");
import ItemScoreViewModel = require("./ItemScoreViewModel");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";
import { ItemScoreViewModelProperties } from "./interfaces";
import WidgetProperties = __esri.WidgetProperties;

interface ItemScoreProperties
  extends ItemScoreViewModelProperties,
    WidgetProperties {}

@subclass("esri.demo.ItemScore")
class ItemScore extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: ItemScoreProperties) {
    super();
  }
}

export = ItemScore;
