/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import { declared, subclass } from "esri/core/accessorSupport/decorators";

@subclass("esri.demo.ItemScore")
class ItemScore extends declared(Accessor) {

}

export = ItemScore;
