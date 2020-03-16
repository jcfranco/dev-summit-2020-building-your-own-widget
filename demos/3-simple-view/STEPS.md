# Simple View Steps

## View Main

Open `main.ts` and view the widget initialization.

## View SimpleWidget

Open `SimpleWidget.tsx` and notice basic widget structure.

## Modify Render method

Add the `render()` public method

```tsx
render() {
  return <div class="simple-widget">Hello World</div>;
}
```

## Compile and test

You should see a red button!

## Improving on SimpleWidget

Lets add a property to our widget

```ts
@property()
@renderable()
enabled = false;
```

## Add CSS constant for JSX

```ts
const CSS = {
  base: "simple-widget",
  enabled: "simple-widget--enabled"
};
```

## Modify our render method

Modify our render method to contain a button that toggles a class

```tsx
render() {
  const { enabled } = this;

  return (
    <button
      bind={this}
      class={this.classes(CSS.base, enabled && CSS.enabled)}
     >
      {enabled ? "Enabled" : "Disabled"}
    </button>
  );
}
```

## Compile and test

You should see a `Disabled` button.

## Add onclick

```tsx
onclick={this._toggle}
```

## Add private method to handle event

```ts
private _toggle(): void {
  this.enabled = !this.enabled;
}
```

## Complete

We're done with this set of steps! Compile, view, and proceed to the [next steps](../4-updated-view/STEPS.md).
