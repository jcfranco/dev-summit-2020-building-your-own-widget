/**
 * CSS lookup object keeps track of all CSS classes used by our widget.
 */
export const CSS = {
  root: "item-score",
  scoreBar: "item-score__score-bar",
  scoreBarContainer: "item-score__score-bar-container",
  scoreBarContainerStuck: "item-score__score-bar-container--stuck",
  scoreBarBackground: "item-score__score-bar-background",
  scoreBarFill: "item-score__score-bar-fill",
  thumbnail: "item-score__thumbnail",

  // common
  esriWidget: "esri-widget",

  // calcite-web
  panel: "panel",
  paddingLeft1: "padding-left-1",
  paddingRight1: "padding-right-1",
  paddingLeaderHalf: "padding-leader-half",
  paddingLeader3: "padding-leader-3",
  paddingTrailer1: "padding-trailer-1",
  paddingTrailer3: "padding-trailer-3",
  leader1: "leader-1",
  leaderQuarter: "leader-quarter",
  loader: "loader",
  isActive: "is-active",
  loaderBars: "loader-bars",
  loaderText: "loader-text",
  button: "btn",
  alert: "alert",
  alertBlue: "alert-blue",
  inputGroup: "input-group",
  inputGroupInput: "input-group-input",
  inputGroupButton: "input-group-button"
};

/**
 * i18n object stores text used by our widget.
 * This can be paired with a localization library to use different languages based on the user's lcoale.
 */
export const i18n = {
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

