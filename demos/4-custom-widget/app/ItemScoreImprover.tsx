/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");
import ItemScoreImproverViewModel = require("./ItemScoreImproverViewModel");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";
import { ItemScoreImproverViewModelProperties } from "./interfaces";
import WidgetProperties = __esri.WidgetProperties;

interface ItemScoreImproverProperties
  extends ItemScoreImproverViewModelProperties,
    WidgetProperties {}

@subclass("esri.demo.ItemScoreImprover")
class ItemScoreImprover extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: ItemScoreImproverProperties) {
    super();
  }
}

export = ItemScoreImprover;
