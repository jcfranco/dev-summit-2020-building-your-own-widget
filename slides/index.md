<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-1.png" data-background-size="cover" -->
<!-- Presenter: Franco -->

# Building Your Own Widget <br />with the ArcGIS JSAPI

## Matt Driscoll – [@driskull](https://twitter.com/driskull)

## JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- Set up dev environment
- Develop
  - Settings Class
  - Simple Widget
  - SettingsPanel Widget
- Enhance SettingsPanel Widget

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->

# Setting up the Dev Environment

---

# Developer environment

<!-- background: section/content will tie into widget dev -->
<!-- background: including TS in all steps because it's needed for widget dev -->

JS API + TypeScript

---

# TypeScript

---

# Typed JavaScript

```ts
interface Person {
  name: string;
  age: number;
}

const person: Person = { name: "Franco", age: 33 };

person.age = "24"; // TS2322: Type '"24"' is not assignable to type 'number'
person.height = 5.11; // TS2339: property 'height' does not exist on type 'Person'
```

---

# JS of the future, now

```ts
// let and const
let canChange = 5;
const cannotChange = 5;

// fat arrow functions
const logName = (person) => console.log(person.name);

// template strings
const greeting = `Hello, my name is ${person.name} and I am ${person.age} years old.`;

// destructuring
const { name, age } = person;

// property shorthand
const shorthand = { person };
```

---

# IDE Support

- Visual Studio
- WebStorm
- Sublime Text
- and more!

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-5.png" data-background-size="cover" -->

# Demo: [Dev Environment](../demos/1-setup/)

- Install TypeScript + JS API

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-5.png" data-background-size="cover" -->

# Demo Recap: Dev Environment

- Installed TypeScript + JS API typings
- Built simple mapping application

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->

# Creating a Class

---

# `esri/core/Accessor`

- JavaScript API foundation <!-- .element: class="fragment" data-fragment-index="0" -->
- Consistent developer experience <!-- .element: class="fragment" data-fragment-index="1" -->

```ts
// unified object constructor
const me = new Person({ name: "Franco", age: 33 });

// watch for changes to `age`
me.watch("age", singHappyBirthday);
```

<!-- .element: class="fragment" data-fragment-index="1" -->

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-5.png" data-background-size="cover" -->

# Demo: [Settings Class](../demos/2-custom-class/)

```ts
interface Settings extends Accessor {
  // tbd 🚧
}
```

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-5.png" data-background-size="cover" -->

# Demo Recap: Settings Class

- Implemented `Settings`
  - Extended `esri/core/Accessor`
  - Created properties with `@property`
  - Typed constructor arguments
  - Created public + private methods

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Writing a Widget

---

# About Widgets

- What? <!-- .element: class="fragment" data-fragment-index="1" -->
  - Single-purpose pieces of functionality
  - Encapsulated UI components
  - Cohesive (integrated, unified)
- Why? <!-- .element: class="fragment" data-fragment-index="2" -->
  - Reusable
  - Interchangeable
- How? <!-- .element: class="fragment" data-fragment-index="3" -->
  - Extend `esri/Widgets/Widget`

---

# `esri/widgets/Widget`

- Base widget class (View)
- Extends `esri/core/Accessor`
  - Properties
  - Watching properties
- Lifecycle

---

# Lifecycle

- `constructor`
- `postInitialize`
- `render`
- `destroy`

---

# `render`

- Defines UI
- Reacts to state changes
- Uses JSX (VDOM)

---

# Lets create a simple widget

Simple widget view that renders the an `enabled` state of a button

```ts
interface SimpleWidget extends Widget {
  enabled: boolean;
}
```

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-5.png" data-background-size="cover" -->

# Demo: [SimpleWidget](../demos/3-simple-view/)

Develop a simple widget

![Simple Widget](img/simple-widget.png)

---

# Demo Recap: SimpleWidget

- Extended `esri/widgets/Widget`
- Implemented `render()`
- Added a `renderable()` property
- Added `onclick` event
- Added CSS Object + [BEM Methodology](http://getbem.com/)
- Toggled property with event to re-render

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->

# Improving Our Widget

---

# Architecture

- Separation of concerns
  - Views + ViewModels
  - UI replacement
  - Easier integration

---

# Views

- "SimpleWidget" example
- Extend `esri/widgets/Widget`
- Rely on ViewModel
- Focus on UI

---

# ViewModels

- "Settings" class example
- Extend `esri/core/Accessor`
- Provide APIs to support View
- Focus on business logic

---

# View + ViewModel in action

<!-- todo: maybe create graphic for this -->

- View renders the state of the VM
  - Looks at properties on VM and renders accordingly
- User interacts with View (property/method)<!-- .element: class="fragment" data-fragment-index="1" -->
  - Causes a change on VM or View
- View updates <!-- .element: class="fragment" data-fragment-index="2" -->
  - Renders again due to changes on VM

---

# Lets create `Settings` Widget

[![Completed Demo](img/completed-demo.png)](../demos/completed/)

`SettingsPanel` widget

---

# Demo VM Interface

<pre><code class="ts" data-trim data-noescape>
interface SettingsViewModel extends Accessor {
  // tbd 🚧
}
</code></pre>
</section>

---

# Demo: View Interface

```ts
interface Settings extends Widget {
  // tbd 🚧
}
```

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-5.png" data-background-size="cover" -->

# Demo: [Updated View](../demos/4-updated-view/)

- Use `Settings` class as `SettingsViewModel`
  - Add a state property
- Create `Settings` view
  - Alias VM properties
  - Create BEM classes object
  - Render sections

[Updated View](../demos/4-updated-view/) | [ViewModel Test Page](../demos/4-updated-view/vm-test.html)

<!--- mention BEM -->

---

# Demo Recap: Update View

- Paired View and ViewModel
- Rendered property from ViewModel
- Wired up interactivity
- Learned to apply styles
- Dynamically rendered UI based on a property value change

---

<!-- Presenter: Franco -->

# Going Further

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->

---

<!-- Presenter: Matt -->
<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->

# Final Recap

- Set up dev environment
- Wrote `Settings` class
- Developed a `SettingsPanel` Widget
- Enhanced `SettingsPanel` Widget
- Went further

---

## Additional Resources

- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [Styling](https://developers.arcgis.com/javascript/latest/guide/styling/)
- [ArcGIS API for JavaScript - next](https://github.com/Esri/feedback-js-api-next)
- [Widget Patterns](https://github.com/jcfranco/4x-widget-patterns)

---

## You might also be interested in...

- [Building Web Apps Using Your GeoJSON Data](https://developersummit2020.schedule.esri.com/schedule/172637542)
- [ArcGIS API for JavaScript: Practical Guide for Building a 3D Web App From 2D Data](https://developersummit2020.schedule.esri.com/schedule/1715519110)

---

<!-- **please rate us** -->
<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-rating.png" data-background-size="cover" -->

---

# Question Time

> 🤔 Where can I find the slides/source?

👉 [bit.ly/buildwidgetsds20](http://bit.ly/buildwidgetsds20) 👈

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-esri.png" data-background-size="cover" -->
