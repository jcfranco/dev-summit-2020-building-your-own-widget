/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/widgets/Widget", "./ItemScoreImproverViewModel", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, Widget, ItemScoreImproverViewModel, decorators_1, widget_1) {
    "use strict";
    var CSS = {
        root: "item-score-improver",
        scoreBar: "item-score-improver__score-bar",
        scoreBarBackground: "item-score-improver__score-bar-background",
        scoreBarFill: "item-score-improver__score-bar-fill",
        thumbnail: "item-score-improver__thumbnail",
        // common
        esriWidget: "esri-widget",
        // calcite-web
        panel: "panel",
        paddingLeft1: "padding-left-1",
        paddingRight1: "padding-right-1",
        paddingLeader3: "padding-leader-3",
        paddingTrailer3: "padding-trailer-3",
        leader1: "leader-1",
        leaderQuarter: "leader-quarter",
        loader: "loader",
        isActive: "is-active",
        loaderBars: "loader-bars",
        loaderText: "loader-text",
        button: "btn",
        alert: "alert",
        alertYellow: "alert-yellow",
        inputGroup: "input-group",
        inputGroupInput: "input-group-input",
        inputGroupButton: "input-group-button"
    };
    var i18n = {
        itemIdPlaceholder: "Enter item ID",
        load: "Load",
        title: "Title",
        summary: "Summary",
        description: "Description",
        tags: "Tags",
        thumbnail: "Thumbnail",
        termsOfUse: "Terms of use",
        score: "Score",
        save: "Save",
        loading: "Loading",
        // mapping based on suggestion results
        suggestions: {
            title: { add: "Add a title" },
            summary: {
                add: "Add a summary",
                enhance: "Add more details to summary"
            },
            description: {
                add: "Add a description",
                enhance: "Add more details to description"
            },
            tags: {
                add: "Add some tags",
                enhance: "Add more tags"
            },
            termsOfUse: { add: "Add terms of use" },
            thumbnail: { add: "Add a thumbnail" }
        }
    };
    var ItemScoreImprover = /** @class */ (function (_super) {
        __extends(ItemScoreImprover, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function ItemScoreImprover(props) {
            var _this = _super.call(this) || this;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new ItemScoreImproverViewModel();
            //--------------------------------------------------------------------------
            //
            //  Protected Methods
            //
            //--------------------------------------------------------------------------
            _this._handleInputChange = function (event) {
                _this.viewModel.itemId = event.currentTarget.value;
            };
            _this._handleInputKeyDown = function (event) {
                if (event.key !== "Enter") {
                    return;
                }
                _this.viewModel.load();
            };
            _this._handleTagsChange = function (event) {
                var input = event.currentTarget;
                _this.viewModel.tags = input.value.split(" ");
            };
            _this._handleSimpleValueChange = function (event) {
                var input = event.currentTarget;
                var propName = input.getAttribute("data-item-prop");
                _this.viewModel[propName] = input.value;
            };
            _this._handleThumbnailChange = function (event) {
                var input = event.currentTarget;
                _this.viewModel.thumbnail = input.files[0];
            };
            _this._handleItemLoad = function () {
                _this.viewModel.load();
            };
            _this._handleItemSave = function () {
                var save = _this.viewModel.save();
                _this._activeSave = save;
                save.then(function () { return (_this._activeSave = null); });
            };
            _this._handleFormSubmit = function (event) {
                event.preventDefault();
            };
            return _this;
        }
        ItemScoreImprover.prototype.postInitialize = function () {
            var _this = this;
            this.own(this.watch("viewModel.thumbnail", function (thumbnail) {
                if (_this._thumbnailBlobUrl) {
                    URL.revokeObjectURL(_this._thumbnailBlobUrl);
                }
                if (thumbnail) {
                    _this._thumbnailBlobUrl = URL.createObjectURL(thumbnail);
                }
            }));
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        ItemScoreImprover.prototype.render = function () {
            var state = this.viewModel.state;
            return (widget_1.tsx("div", { class: this.classes(CSS.esriWidget, CSS.root, CSS.paddingLeft1, CSS.paddingRight1) },
                this.renderItemLoader(),
                state === "ready"
                    ? this.renderItemInfo()
                    : state === "loading"
                        ? this.renderProgressBar()
                        : null));
        };
        ItemScoreImprover.prototype.renderProgressBar = function () {
            return (widget_1.tsx("div", { class: this.classes(CSS.loader, CSS.isActive, CSS.paddingLeader3, CSS.paddingTrailer3), key: "loader" },
                widget_1.tsx("div", { class: CSS.loaderBars }),
                widget_1.tsx("div", { class: CSS.loaderText }, i18n.loading)));
        };
        ItemScoreImprover.prototype.renderItemInfo = function () {
            var _a = this, _activeSave = _a._activeSave, _thumbnailBlobUrl = _a._thumbnailBlobUrl, _b = _a.viewModel, score = _b.score, title = _b.title, summary = _b.summary, description = _b.description, tags = _b.tags, termsOfUse = _b.termsOfUse;
            return (widget_1.tsx("div", { class: CSS.leader1, key: "item-details" },
                widget_1.tsx("div", null,
                    widget_1.tsx("label", null,
                        widget_1.tsx("h1", null, i18n.score),
                        widget_1.tsx("div", { class: CSS.scoreBar },
                            widget_1.tsx("div", { class: CSS.scoreBarFill, styles: {
                                    backgroundColor: this._getScoreColor(score),
                                    width: score + "%"
                                } }),
                            widget_1.tsx("div", { class: CSS.scoreBarBackground }))),
                    this.renderFirstSuggestion()),
                widget_1.tsx("form", { class: this.classes(CSS.panel, CSS.leader1), onsubmit: this._handleFormSubmit },
                    widget_1.tsx("label", null,
                        i18n.title,
                        widget_1.tsx("input", { onchange: this._handleSimpleValueChange, "data-item-prop": "title", value: title })),
                    widget_1.tsx("label", null,
                        i18n.summary,
                        widget_1.tsx("textarea", { onchange: this._handleSimpleValueChange, "data-item-prop": "summary" }, summary)),
                    widget_1.tsx("label", null,
                        i18n.description,
                        widget_1.tsx("textarea", { onchange: this._handleSimpleValueChange, "data-item-prop": "description" }, description)),
                    widget_1.tsx("label", null,
                        i18n.tags,
                        widget_1.tsx("input", { onchange: this._handleTagsChange, value: tags.join(" ") })),
                    widget_1.tsx("label", null,
                        i18n.termsOfUse,
                        widget_1.tsx("input", { onchange: this._handleSimpleValueChange, "data-item-prop": "termsOfUse", value: termsOfUse })),
                    widget_1.tsx("label", null,
                        i18n.thumbnail,
                        widget_1.tsx("img", { alt: "", class: this.classes(CSS.thumbnail, CSS.leaderQuarter), src: _thumbnailBlobUrl }),
                        widget_1.tsx("input", { onchange: this._handleThumbnailChange, accept: ".gif, .jpg, .jpeg, .png", type: "file" })),
                    widget_1.tsx("button", { class: CSS.button, disabled: _activeSave, onclick: this._handleItemSave }, i18n.save))));
        };
        ItemScoreImprover.prototype.renderFirstSuggestion = function () {
            var suggestions = this.viewModel.suggestions;
            var firstSuggestion = suggestions[0];
            return firstSuggestion ? (widget_1.tsx("div", { class: this.classes(CSS.leader1, CSS.alert, CSS.alertYellow, CSS.isActive) },
                widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" },
                    widget_1.tsx("path", { d: "M11.01 11.035a3.81 3.81 0 0 1 .135-.904 3.174 3.174 0 0 1 .426-.657 6.33 6.33 0 0 0 1.479-3.576 4.57 4.57 0 0 0-1.555-3.72 4.497 4.497 0 0 0-5.9-.075A4.557 4.557 0 0 0 3.95 5.897a6.33 6.33 0 0 0 1.48 3.577 3.15 3.15 0 0 1 .426.658 3.795 3.795 0 0 1 .134.903 4.948 4.948 0 0 0 .1.817c.013.059.036.095.051.148h-.312l.45 1.5-.365 1.215 1.487.967a2.02 2.02 0 0 0 2.2-.001l1.487-.966-.364-1.215.449-1.5h-.312c.015-.053.038-.09.051-.148a4.948 4.948 0 0 0 .1-.817zm-1.953 3.807a1.036 1.036 0 0 1-1.113 0l-.857-.557.235-.785-.15-.5h2.656l-.15.5.235.785zM9 12V9H8v3h-.79a1.018 1.018 0 0 1-.145-.365 3.897 3.897 0 0 1-.078-.66 4.702 4.702 0 0 0-.17-1.118 3.312 3.312 0 0 0-.586-.981 5.377 5.377 0 0 1-1.283-3.038 3.57 3.57 0 0 1 1.29-2.97 3.504 3.504 0 0 1 4.595.06 3.576 3.576 0 0 1 1.219 2.91 5.377 5.377 0 0 1-1.283 3.038 3.32 3.32 0 0 0-.585.98 4.716 4.716 0 0 0-.171 1.119 3.897 3.897 0 0 1-.078.66 1.138 1.138 0 0 1-.14.365zm1-4H7V7h3z" }),
                    widget_1.tsx("path", { fill: "none", d: "M0 0h16v16H0z" })),
                "\u00A0",
                i18n.suggestions[firstSuggestion.property][firstSuggestion.type])) : null;
        };
        ItemScoreImprover.prototype.renderItemLoader = function () {
            return (widget_1.tsx("div", { class: this.classes(CSS.leader1, CSS.inputGroup) },
                widget_1.tsx("label", { class: CSS.inputGroupInput },
                    widget_1.tsx("input", { class: CSS.inputGroupInput, placeholder: i18n.itemIdPlaceholder, onchange: this._handleInputChange, onkeyup: this._handleInputKeyDown })),
                widget_1.tsx("span", { class: CSS.inputGroupButton },
                    widget_1.tsx("button", { class: CSS.button, onclick: this._handleItemLoad }, i18n.load))));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        ItemScoreImprover.prototype._getScoreColor = function (score) {
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
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], ItemScoreImprover.prototype, "_thumbnailBlobUrl", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], ItemScoreImprover.prototype, "_activeSave", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.itemId")
        ], ItemScoreImprover.prototype, "itemId", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.portal")
        ], ItemScoreImprover.prototype, "portal", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable([
                "viewModel.description",
                "viewModel.score",
                "viewModel.state",
                "viewModel.suggestions",
                "viewModel.summary",
                "viewModel.tags",
                "viewModel.termsOfUse",
                "viewModel.title"
            ])
        ], ItemScoreImprover.prototype, "viewModel", void 0);
        ItemScoreImprover = __decorate([
            decorators_1.subclass("esri.demo.ItemScoreImprover")
        ], ItemScoreImprover);
        return ItemScoreImprover;
    }(decorators_1.declared(Widget)));
    return ItemScoreImprover;
});
//# sourceMappingURL=ItemScoreImprover.js.map