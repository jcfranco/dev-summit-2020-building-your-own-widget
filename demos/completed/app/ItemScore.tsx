/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");
import ItemScoreViewModel = require("./ItemScoreViewModel");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";
import { ItemScoreProperties } from "./interfaces";
import { CSS, i18n } from "./resources";

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

  postInitialize(): void {
    this.own(
      this.watch("viewModel.thumbnail", (thumbnail) => this._updateThumbnailBlobUrl(thumbnail))
    );
  }

  destroy(): void {
    this._updateThumbnailBlobUrl(null);
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  @property()
  @renderable()
  private _thumbnailBlobUrl: string;

  @property()
  @renderable()
  private _activeSave: Promise<void>;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  itemId
  //----------------------------------

  @aliasOf("viewModel.itemId")
  itemId: ItemScoreViewModel["itemId"];

  //----------------------------------
  //  portal
  //----------------------------------

  @aliasOf("viewModel.portal")
  portal: ItemScoreViewModel["portal"];

  //----------------------------------
  //  viewModel
  //----------------------------------

  @property()
  @renderable([
    "viewModel.description",
    "viewModel.score",
    "viewModel.state",
    "viewModel.suggestions",
    "viewModel.summary",
    "viewModel.tags",
    "viewModel.termsOfUse",
    "viewModel.title"
  ])
  viewModel: ItemScoreViewModel = new ItemScoreViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const { state } = this.viewModel;

    return (
      <div class={this.classes(CSS.esriWidget, CSS.root, CSS.paddingLeft1, CSS.paddingRight1)}>
        {this.renderItemLoader()}
        {state === "loading" ? this.renderProgressBar() :
         state === "ready" ? [this.renderScore(), this.renderItemForm()] :
         null}
      </div>
    );
  }

  protected renderItemLoader() {
    return (
      <div class={this.classes(CSS.leader1, CSS.inputGroup)}>
        <label class={CSS.inputGroupInput}>
          <input
            class={CSS.inputGroupInput}
            data-item-prop="itemId"
            placeholder={i18n.itemIdPlaceholder}
            onchange={this._handleSimpleValueChange}
            onkeyup={this._handleInputKeyDown}
            value={this.itemId}
          />
        </label>
        <span class={CSS.inputGroupButton}>
          <button class={CSS.button} onclick={this._handleItemLoad}>
            {i18n.load}
          </button>
        </span>
      </div>
    );
  }

  protected renderProgressBar() {
    return (
      <div
        class={this.classes(CSS.loader, CSS.isActive, CSS.paddingLeader3, CSS.paddingTrailer3)}
        key="loader"
      >
        <div class={CSS.loaderBars}></div>
        <div class={CSS.loaderText}>{i18n.loading}</div>
      </div>
    );
  }

  protected renderItemForm() {
    const {
      _activeSave,
      _thumbnailBlobUrl,
      viewModel: { title, summary, description, tags, termsOfUse }
    } = this;

    return (
      <div key="item-details">
        <form class={this.classes(CSS.panel, CSS.leader1)} onsubmit={this._handleFormSubmit}>
          <label>
            {i18n.title}
            <input onchange={this._handleSimpleValueChange} data-item-prop="title" value={title} />
          </label>
          <label>
            {i18n.summary}
            <textarea onchange={this._handleSimpleValueChange} data-item-prop="summary">
              {summary}
            </textarea>
          </label>
          <label>
            {i18n.description}
            <textarea onchange={this._handleSimpleValueChange} data-item-prop="description">
              {description}
            </textarea>
          </label>
          <label>
            {i18n.tags}
            <input onchange={this._handleTagsChange} value={tags.join(" ")} />
          </label>
          <label>
            {i18n.termsOfUse}
            <input
              onchange={this._handleSimpleValueChange}
              data-item-prop="termsOfUse"
              value={termsOfUse}
            />
          </label>
          <label>
            {i18n.thumbnail}
            <img
              alt=""
              class={this.classes(CSS.thumbnail, CSS.leaderQuarter)}
              src={_thumbnailBlobUrl}
            />
            <input
              onchange={this._handleThumbnailChange}
              accept=".gif, .jpg, .jpeg, .png"
              type="file"
            />
          </label>
          <button class={CSS.button} disabled={_activeSave} onclick={this._handleItemSave}>
            {i18n.save}
          </button>
        </form>
      </div>
    );
  }

  protected renderScore() {
    const { score } = this.viewModel;

    return (
      <div class={this.classes(CSS.scoreBarContainer, CSS.paddingLeaderHalf, CSS.paddingTrailer1)} key="item-score">
        <label>
          <h1>{i18n.score}</h1>
          <div class={CSS.scoreBar}>
            <div
              class={CSS.scoreBarFill}
              styles={{
                backgroundColor: this._getScoreColor(score),
                width: `${score}%`
              }}
            />
            <div class={CSS.scoreBarBackground} />
          </div>
        </label>
        {this.renderFirstSuggestion()}
      </div>
    );
  }

  protected renderFirstSuggestion() {
    const [firstSuggestion] = this.viewModel.suggestions;

    return firstSuggestion ? (
      <div class={this.classes(CSS.leader1, CSS.alert, CSS.alertBlue, CSS.isActive)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
          <path d="M11.01 11.035a3.81 3.81 0 0 1 .135-.904 3.174 3.174 0 0 1 .426-.657 6.33 6.33 0 0 0 1.479-3.576 4.57 4.57 0 0 0-1.555-3.72 4.497 4.497 0 0 0-5.9-.075A4.557 4.557 0 0 0 3.95 5.897a6.33 6.33 0 0 0 1.48 3.577 3.15 3.15 0 0 1 .426.658 3.795 3.795 0 0 1 .134.903 4.948 4.948 0 0 0 .1.817c.013.059.036.095.051.148h-.312l.45 1.5-.365 1.215 1.487.967a2.02 2.02 0 0 0 2.2-.001l1.487-.966-.364-1.215.449-1.5h-.312c.015-.053.038-.09.051-.148a4.948 4.948 0 0 0 .1-.817zm-1.953 3.807a1.036 1.036 0 0 1-1.113 0l-.857-.557.235-.785-.15-.5h2.656l-.15.5.235.785zM9 12V9H8v3h-.79a1.018 1.018 0 0 1-.145-.365 3.897 3.897 0 0 1-.078-.66 4.702 4.702 0 0 0-.17-1.118 3.312 3.312 0 0 0-.586-.981 5.377 5.377 0 0 1-1.283-3.038 3.57 3.57 0 0 1 1.29-2.97 3.504 3.504 0 0 1 4.595.06 3.576 3.576 0 0 1 1.219 2.91 5.377 5.377 0 0 1-1.283 3.038 3.32 3.32 0 0 0-.585.98 4.716 4.716 0 0 0-.171 1.119 3.897 3.897 0 0 1-.078.66 1.138 1.138 0 0 1-.14.365zm1-4H7V7h3z" />
          <path fill="none" d="M0 0h16v16H0z" />
        </svg>
        &nbsp;
        {i18n.suggestions[firstSuggestion.property][firstSuggestion.type]}
      </div>
    ) : null;
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected _handleSimpleValueChange = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement;
    const propName = input.getAttribute("data-item-prop");
    this.viewModel[propName] = input.value;
  };

  protected _handleInputKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      this.viewModel.load();
    }
  };

  protected _handleTagsChange = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement;
    this.viewModel.tags = input.value.split(" "); // note: tags are space-delimited
  };

  protected _handleThumbnailChange = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement;
    this.viewModel.thumbnail = input.files[0] as Blob;
  };

  protected _handleItemLoad = (): void => {
    this.viewModel.load();
  };

  protected _handleItemSave = (): void => {
    const save = this.viewModel.save();

    // store active state to use in rendering
    this._activeSave = save;
    save.then(() => (this._activeSave = null));
  };

  protected _handleFormSubmit = (event: Event): void => {
    // prevent default page reload
    event.preventDefault();
  };

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _updateThumbnailBlobUrl(thumbnail: Blob): void {
    if (this._thumbnailBlobUrl) {
      URL.revokeObjectURL(this._thumbnailBlobUrl);
    }

    if (thumbnail) {
      this._thumbnailBlobUrl = URL.createObjectURL(thumbnail);
    }
  }

  private _getScoreColor(score: number): string {
    if (score > 80) {
      return "#0086D9";
    }

    if (score > 60) {
      return "#369AD9";
    }

    if (score > 40) {
      return "#6CAFD9";
    }

    if (score > 20) {
      return "#A3C4D9";
    }

    return "#D9D9D9";
  }
}

export = ItemScore;
