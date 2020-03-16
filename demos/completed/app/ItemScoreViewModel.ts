/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import EsriError = require("esri/core/Error");
import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import request = require("esri/request");
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { ItemScoreViewModelProperties, Suggestion } from "./interfaces";

@subclass("esri.demo.ItemScoreViewModel")
class ItemScoreViewModel extends declared(Accessor) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: ItemScoreViewModelProperties) {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  @property()
  private item: PortalItem;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  portal
  //----------------------------------

  @property()
  portal: Portal = Portal.getDefault();

  //----------------------------------
  //  itemId
  //----------------------------------

  @property()
  itemId: string;

  //----------------------------------
  //  description
  //----------------------------------

  @property({
    aliasOf: "item.description"
  })
  description: PortalItem["description"];

  //----------------------------------
  //  score
  //----------------------------------

  @property({
    aliasOf: "item.sourceJSON.scoreCompleteness",
    readOnly: true
  })
  readonly score: number;

  //----------------------------------
  //  summary
  //----------------------------------

  @property({
    aliasOf: "item.snippet"
  })
  summary: PortalItem["snippet"];

  //----------------------------------
  //  state
  //----------------------------------

  @property({
    dependsOn: ["item.loadStatus", "portal"],
    readOnly: true
  })
  get state(): "idle" | "loading" | "ready" {
    const { item, portal } = this;

    if (portal.loadStatus === "loading") {
      return "loading";
    }

    if (item) {
      return item.loadStatus === "loading" ? "loading" : "ready";
    }

    return "idle";
  }

  //----------------------------------
  //  suggestions
  //----------------------------------

  @property({
    readOnly: true
  })
  readonly suggestions: Suggestion[] = [];

  //----------------------------------
  //  tags
  //----------------------------------

  @property({
    aliasOf: "item.tags"
  })
  tags: PortalItem["tags"];

  //----------------------------------
  //  termsOfUse
  //----------------------------------

  @property({
    aliasOf: "item.licenseInfo"
  })
  termsOfUse: PortalItem["licenseInfo"];

  //----------------------------------
  //  thumbnail
  //----------------------------------

  @property()
  thumbnail: Blob;

  //----------------------------------
  //  title
  //----------------------------------

  @property({
    aliasOf: "item.title"
  })
  title: PortalItem["title"];

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  async save(): Promise<void> {
    const { item, thumbnail } = this;

    if (!item) {
      throw new EsriError(
        "item-score-reviewer::missing-item-id",
        "cannot save item data without loading item data first"
      );
    }

    // we clone to apply all updates before replacing our internal item
    const updatedItem = item.clone();
    const data = updatedItem.toJSON();
    await updatedItem.update({ data });
    await updatedItem.updateThumbnail({ filename: "item-thumbnail", thumbnail });

    this.item = updatedItem;

    this._set("suggestions", this._reviewItem());
  }

  async load(): Promise<void> {
    const { itemId, portal } = this;

    if (!itemId) {
      throw new EsriError("item-score-reviewer::missing-item-id", "cannot load item data without item ID");
    }

    const updatedItem = new PortalItem({ id: itemId, portal });
    this.item = updatedItem;

    await updatedItem.load();

    if (updatedItem.thumbnailUrl) {
      const thumbnail = await request(updatedItem.thumbnailUrl, {
        responseType: "blob"
      }).then(({ data }) => data);

      this.set("thumbnail", thumbnail);
    } else {
      this.set("thumbnail", null);
    }

    this._set("suggestions", this._reviewItem());
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _reviewItem(): Suggestion[] {
    const suggestions: Suggestion[] = [];

    const { title, tags, summary, thumbnail, termsOfUse, description } = this;

    if (!summary) {
      suggestions.push({
        property: "summary",
        type: "add"
      });
    } else {
      const wordCount = summary.split(" ").length;

      if (wordCount < 10) {
        suggestions.push({
          property: "summary",
          type: "enhance"
        });
      }
    }

    if (!description) {
      suggestions.push({
        property: "description",
        type: "add"
      });
    } else {
      const wordCount = description.split(" ").length;

      if (wordCount < 10) {
        suggestions.push({
          property: "description",
          type: "enhance"
        });
      }
    }

    if (!tags) {
      suggestions.push({
        property: "tags",
        type: "add"
      });
    } else {
      const tagCount = tags.length;

      if (tagCount < 3) {
        suggestions.push({
          property: "tags",
          type: "enhance"
        });
      }
    }

    if (!thumbnail) {
      suggestions.push({
        property: "thumbnail",
        type: "add"
      });
    }

    if (!termsOfUse) {
      suggestions.push({
        property: "termsOfUse",
        type: "add"
      });
    }

    if (!title) {
      suggestions.push({
        property: "title",
        type: "add"
      });
    }

    return suggestions;
  }
}

export = ItemScoreViewModel;
