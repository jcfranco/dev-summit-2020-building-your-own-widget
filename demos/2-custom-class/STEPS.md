# Writing a class

1.  Let's start off by adding some boilerplate for creating a module or class.

```
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import { declared, subclass } from "esri/core/accessorSupport/decorators";

@subclass("esri.demo.ItemScoreImproverViewModel")
class ItemScoreImproverViewModel extends declared(Accessor) {

}

export = ItemScoreImproverViewModel;
```

This is the minimum required to create a class in 4x. All we're doing here is creating a class that extends `esri/core/Accessor`, which is the base of all 4x classes.

1.  We'll now add the properties we described earlier in our design. We'll do this with the `property` decorator.

```tsx
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";
```

Notes: 

- We can use an internal property to expose a subset of `PortalItem` properties. `@property({ aliasOf: "item.<propName>" }` can help us do this for each aliased properties.
- We can also use TypeScript to use the same types for our aliased properties without needing to redeclare each one.

```
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
```

Next, we'll define our constructor to allow passing an arguments object to initialize our class. We can leverage TypeScript and type the constructor argument to ensure our class is created with the correct properties. We'll use an interface we prepared beforehand.


```tsx
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

constructor(props?: ItemScoreImproverViewModelProperties) {
  super();
}
```

TypeScript will complain about references to classes and utilities we haven't imported, so let's go ahead and fix that.

```tsx
import Accessor = require("esri/core/Accessor");
import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { ItemScoreImproverViewModelProperties, Suggestion } from "./interfaces";
```

We've now implemented the properties from our API design. Properties defined this way can be watched for changes and initialized by a constructor object.

Let's bring in our public methods so we can finish implementing our public API.

```tsx
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

  const data = item.toJSON();
  this.item = await item.update({ data });

  await item.updateThumbnail({ filename: "item-thumbnail", thumbnail });

  this._set("suggestions", this._reviewItem());
}

async load(): Promise<void> {
  const { itemId, portal } = this;

  if (!itemId) {
    throw new EsriError("item-score-reviewer::missing-item-id", "cannot load item data without item ID");
  }

  const item = new PortalItem({ id: itemId, portal });
  this.item = item;

  await item.load();

  if (item.thumbnailUrl) {
    const thumbnail = await request(item.thumbnailUrl, {
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
```

We have now implemented our class and we can test it in our demo page.
