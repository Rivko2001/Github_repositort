const osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');

const map = L.map('map', {
  center: [43.1050907,12.3586074],
  zoom: 6,
  layers: [osm]
});

const fontAwesomeIcon = L.divIcon({
  html: '<i class="fa-solid fa-archway fa-2x"></i>',
  iconSize: [20, 20],
  className: 'fontawesome_icon'
});

let geojson_marker = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "naam": "milaan",
      
      },
      "geometry": {
        "type": "Point",
        "coordinates": [9.1671174,45.4684217]
      }
    },
        {
      "type": "Feature",
      "properties": {
        "naam": "Genua",
      
      },
      "geometry": {
        "type": "Point",
        "coordinates": [8.9839714,44.3964843]
      }
    },
         {
      "type": "Feature",
      "properties": {
        "naam": "Nappels",
       
      },
      "geometry": {
        "type": "Point",
        "coordinates": [14.3667053,40.7893608]
      }
    },

  ]
};

let jsonlayer = L.geoJson(geojson_marker, {
  onEachFeature: onEachFeature,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: fontAwesomeIcon });
  }
}).addTo(map);

function onEachFeature(feature, layer) {
  layer.bindPopup("<b>" + feature.properties.naam + "</b>");
}