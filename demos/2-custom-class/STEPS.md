# Writing a class

## Inspect

Let's start off by looking at some boilerplate for creating a module or class.

See `app/ItemScore.ts`

This is the minimum required to create a class in 4x. All we're doing here is creating a class that extends `esri/core/Accessor`, which is the base of all 4x classes.

Notes:

- We can use an internal property to expose a subset of `PortalItem` properties. `@property({ aliasOf: "item.<propName>" }` can help us do this for each aliased properties.
- We can also use TypeScript to use the same types for our aliased properties without needing to redeclare each one.

## Import dependencies

```ts
import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import { ItemScoreProperties, Suggestion } from "./interfaces";
import EsriError = require("esri/core/Error");
import request = require("esri/request");
```

We've now implemented the properties from our API design. Properties defined this way can be watched for changes and initialized by a constructor object.

## Add vars

```ts
@property()
private item: PortalItem;

```

## Add props

```ts
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

## Setup Constructor

Next, we'll define our constructor to allow passing an arguments object to initialize our class. We can leverage TypeScript and type the constructor argument to ensure our class is created with the correct properties. We'll use an interface we prepared beforehand.

```ts
constructor(props?: ItemScoreProperties) {
  super();
}
```

TypeScript will complain about references to classes and utilities we haven't imported, so let's go ahead and fix that.

## Setup public methods

Let's bring in our public methods so we can finish implementing our public API.

```tsx
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
```

## Add private methods

```tsx
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
