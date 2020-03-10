/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/Accessor", "esri/core/Error", "esri/portal/Portal", "esri/portal/PortalItem", "esri/request", "esri/core/accessorSupport/decorators"], function (require, exports, __extends, __decorate, Accessor, EsriError, Portal, PortalItem, request, decorators_1) {
    "use strict";
    var ItemScoreImproverViewModel = /** @class */ (function (_super) {
        __extends(ItemScoreImproverViewModel, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function ItemScoreImproverViewModel(props) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  portal
            //----------------------------------
            _this.portal = Portal.getDefault();
            //----------------------------------
            //  suggestions
            //----------------------------------
            _this.suggestions = [];
            return _this;
        }
        Object.defineProperty(ItemScoreImproverViewModel.prototype, "state", {
            //----------------------------------
            //  state
            //----------------------------------
            get: function () {
                var _a = this, item = _a.item, portal = _a.portal;
                if (portal.loadStatus === "loading") {
                    return "loading";
                }
                if (item) {
                    return item.loadStatus === "loading" ? "loading" : "ready";
                }
                return "idle";
            },
            enumerable: true,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        ItemScoreImproverViewModel.prototype.save = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, item, thumbnail, data, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this, item = _a.item, thumbnail = _a.thumbnail;
                            if (!item) {
                                throw new EsriError("item-score-reviewer::missing-item-id", "cannot save item data without loading item data first");
                            }
                            data = item.toJSON();
                            _b = this;
                            return [4 /*yield*/, item.update({ data: data })];
                        case 1:
                            _b.item = _c.sent();
                            return [4 /*yield*/, item.updateThumbnail({ filename: "item-thumbnail", thumbnail: thumbnail })];
                        case 2:
                            _c.sent();
                            this._set("suggestions", this._reviewItem());
                            return [2 /*return*/];
                    }
                });
            });
        };
        ItemScoreImproverViewModel.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, itemId, portal, item, thumbnail;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this, itemId = _a.itemId, portal = _a.portal;
                            if (!itemId) {
                                throw new EsriError("item-score-reviewer::missing-item-id", "cannot load item data without item ID");
                            }
                            item = new PortalItem({ id: itemId, portal: portal });
                            this.item = item;
                            return [4 /*yield*/, item.load()];
                        case 1:
                            _b.sent();
                            if (!item.thumbnailUrl) return [3 /*break*/, 3];
                            return [4 /*yield*/, request(item.thumbnailUrl, {
                                    responseType: "blob"
                                }).then(function (_a) {
                                    var data = _a.data;
                                    return data;
                                })];
                        case 2:
                            thumbnail = _b.sent();
                            this.set("thumbnail", thumbnail);
                            return [3 /*break*/, 4];
                        case 3:
                            this.set("thumbnail", null);
                            _b.label = 4;
                        case 4:
                            this._set("suggestions", this._reviewItem());
                            return [2 /*return*/];
                    }
                });
            });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        ItemScoreImproverViewModel.prototype._reviewItem = function () {
            var suggestions = [];
            var _a = this, title = _a.title, tags = _a.tags, summary = _a.summary, thumbnail = _a.thumbnail, termsOfUse = _a.termsOfUse, description = _a.description;
            if (!summary) {
                suggestions.push({
                    property: "summary",
                    type: "add"
                });
            }
            else {
                var wordCount = summary.split(" ").length;
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
            }
            else {
                var wordCount = description.split(" ").length;
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
            }
            else {
                var tagCount = tags.length;
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
        };
        __decorate([
            decorators_1.property()
        ], ItemScoreImproverViewModel.prototype, "item", void 0);
        __decorate([
            decorators_1.property()
        ], ItemScoreImproverViewModel.prototype, "portal", void 0);
        __decorate([
            decorators_1.property()
        ], ItemScoreImproverViewModel.prototype, "itemId", void 0);
        __decorate([
            decorators_1.property({
                aliasOf: "item.description"
            })
        ], ItemScoreImproverViewModel.prototype, "description", void 0);
        __decorate([
            decorators_1.property({
                aliasOf: "item.sourceJSON.scoreCompleteness",
                readOnly: true
            })
        ], ItemScoreImproverViewModel.prototype, "score", void 0);
        __decorate([
            decorators_1.property({
                aliasOf: "item.snippet"
            })
        ], ItemScoreImproverViewModel.prototype, "summary", void 0);
        __decorate([
            decorators_1.property({
                dependsOn: ["item.loadStatus", "portal"],
                readOnly: true
            })
        ], ItemScoreImproverViewModel.prototype, "state", null);
        __decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemScoreImproverViewModel.prototype, "suggestions", void 0);
        __decorate([
            decorators_1.property({
                aliasOf: "item.tags"
            })
        ], ItemScoreImproverViewModel.prototype, "tags", void 0);
        __decorate([
            decorators_1.property({
                aliasOf: "item.licenseInfo"
            })
        ], ItemScoreImproverViewModel.prototype, "termsOfUse", void 0);
        __decorate([
            decorators_1.property()
        ], ItemScoreImproverViewModel.prototype, "thumbnail", void 0);
        __decorate([
            decorators_1.property({
                aliasOf: "item.title"
            })
        ], ItemScoreImproverViewModel.prototype, "title", void 0);
        ItemScoreImproverViewModel = __decorate([
            decorators_1.subclass("esri.demo.ItemScoreImproverViewModel")
        ], ItemScoreImproverViewModel);
        return ItemScoreImproverViewModel;
    }(decorators_1.declared(Accessor)));
    return ItemScoreImproverViewModel;
});
//# sourceMappingURL=ItemScoreImproverViewModel.js.map