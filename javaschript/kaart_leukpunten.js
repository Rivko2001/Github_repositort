const osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');

const map = L.map('map', {
  layers: [osm]
});


const churchIcon = L.divIcon({
  html: '<i class="fa-solid fa-place-of-worship"></i>',
  iconSize: [400, 400],
  className: 'fontawesome_icon'
});

const museumsIcon = L.divIcon({
  html: '<i class="fa-solid fa-building-columns"></i>',
  iconSize: [40, 40],
  className: 'fontawesome_icon'
});

const defaultIcon = L.divIcon({
  html: '<i class="fa-solid fa-location-dot"></i>',
  iconSize: [20, 20],
  className: 'fontawesome_icon'
});

function onEachFeature(feature, layer) {
  layer.bindPopup("<b>" + feature.properties.name + "</b>");
}

fetch("../data/10_plekken_per_stad_italie.geojson")
  .then(response => response.json())
  .then(data => {
    let jsonlayer = L.geoJSON(data, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        if (feature.properties.type === "cathedral") {
          return L.marker(latlng, { icon: churchIcon });
        } else if (feature.properties.type === "museum") {
          return L.marker(latlng, { icon: museumsIcon });
        } else {
          return L.marker(latlng, { icon: defaultIcon });
        }
      }
    }).addTo(map);

    map.fitBounds(jsonlayer.getBounds());
  })
  .catch(error => {
    console.error('Fout bij laden GeoJSON:', error);
  });