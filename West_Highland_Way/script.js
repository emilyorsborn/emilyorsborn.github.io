//define access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZW9yc2Jvcm4iLCJhIjoiY2t6eTZmMDhoMDE1ZzJvczE2bnZtb2hqYiJ9.SKVbPkwNlAv-RNWmVXjwBg';

//create map
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/eorsborn/cl0h7p9en001615pjma11ir7x'
});

// change cursor style
  map.getCanvas().style.cursor = "default";

//add mavigation control
  map.addControl(new mapboxgl.NavigationControl(), "top-right");

// Target the span elements used in the sidebar
const secDisplay = document.getElementById('Name');
const milesDisplay = document.getElementById('Miles');
const townsDisplay = document.getElementById('Name2');
const typeDisplay = document.getElementById('Type');
const poiDisplay = document.getElementById('Name3');

//hover settings
map.on('load', () => {
  //hike hover
  map.addSource("hover1", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });
  map.addLayer({
    id: "hike-hover",
    type: "line",
    source: "hover1",
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 2
    }
});
  //town hover
  map.addSource("hover2", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });
  map.addLayer({
    id: "town-hover",
    type: "circle",
    source: "hover2",
    layout: {},
    paint: {
      "circle-stroke-color": "black",
      "circle-stroke-width": 2
    }
});
});

//add poi click feature and pop up
map.on('click', (event) => {
const poi = map.queryRenderedFeatures(event.point, {
layers: ['whw-poi-num']
});
if (!poi.length) {
return;
}
const poifeature = poi[0];
 
const popup = new mapboxgl.Popup({ offset: [0, 0] })
  .setLngLat(poifeature.geometry.coordinates)
  .setHTML(
    `<h3>POI Type: ${poifeature.properties.type}</h3><p>Name:  ${poifeature.properties.name}</p>`
)
.addTo(map);
});

//info display for poi layer
map.on('mousemove', 'whw-poi-num', (event) => {
    map.getCanvas().style.cursor = 'pointer';
  
  // Set variables equal to the poi type and names
  const poitype = event.features[0].properties.type;
const poiname = event.features[0].properties.name;

  if (event.features.length === 0) return;
  
    // Display miles and section names in the sidebar
typeDisplay.textContent = poitype;
poiDisplay.textContent = poiname;
});

//info display and hover for Trail layer
map.on('mousemove', 'whw-trail-image', (event) => {
    map.getCanvas().style.cursor = 'pointer';
  const hike = map.queryRenderedFeatures(event.point, {
    layers: ["whw-trail-image"]
  });
  
// Set variables equal to the hike miles and section names
const hikeSection = event.features[0].properties.Name;
const hikeMiles = event.features[0].properties.Miles;

  if (event.features.length === 0) return;
  
// Display miles and section names in the sidebar
secDisplay.textContent = hikeSection;
milesDisplay.textContent = hikeMiles;
  
   map.getSource("hover1").setData({
 type: "FeatureCollection",
 features: hike.map(function (f) {
 return { type: "Feature", geometry: f.geometry };
 })
 });
});
  
//info display and hover for town layer
map.on('mousemove', 'whw-towns', (event) => {
          map.getCanvas().style.cursor = 'pointer';
  const town = map.queryRenderedFeatures(event.point, {
    layers: ['whw-towns']
});
  
// Set variables equal to the town names
const townsName = event.features[0].properties.Name;

  if (event.features.length === 0) return;
// Display the town names in the sidebar
townsDisplay.textContent = townsName;
  
map.getSource("hover2").setData({
 type: "FeatureCollection",
 features: town.map(function (f) {
 return { type: "Feature", geometry: f.geometry };
 })
 });
  
 })