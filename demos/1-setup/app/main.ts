import Map from "esri/Map";
import MapView from "esri/views/MapView";

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-116.538433, 33.824775],
  zoom: 15
});
