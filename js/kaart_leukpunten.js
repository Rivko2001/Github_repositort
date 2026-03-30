const gray = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  { attribution: "&copy; Esri" }
);

const mapElement = document.getElementById("map");
const selectedCity = mapElement.dataset.city || "Napels";

const citySettings = {
  "Napels": { center: [40.8486107, 14.2778697], zoom: 12 },
  "Milaan": { center: [45.4642, 9.19], zoom: 12 },
  "Genua":  { center: [44.4056, 8.9463], zoom: 12 },
  "Rome":   { center: [41.9028, 12.4964], zoom: 12 }
};

const currentCity = citySettings[selectedCity] || citySettings["Napels"];

const map = L.map("map", {
  center: currentCity.center,
  zoom: currentCity.zoom,
  layers: [gray]
});

fetch("../data/10_plekken_per_stad_italie.geojson")
  .then(response => response.json())
  .then(data => {
    let filteredFeatures = data.features.filter(feature => {
      const city = feature.properties.city;

     if (selectedCity === "Napels") {
  return city === "Napels" || city === "Pompeii" || city === "Pompei";
}

if (selectedCity === "Genua") {
  return city === "Genua" || city === "Genoa";
}

return city === selectedCity;
    });

    // eerst nummeren, daarna pas de kaartlaag maken
    filteredFeatures.forEach((feature, index) => {
      feature.properties.number = index + 1;
    });

    const filteredData = {
      type: "FeatureCollection",
      features: filteredFeatures
    };

    const jsonlayer = L.geoJSON(filteredData, {
      onEachFeature: function (feature, layer) {
        const name = feature.properties.name || feature.properties.naam || "Onbekende plek";
        const number = feature.properties.number;
        layer.bindPopup(`<b>${number}. ${name}</b>`);
      },

      pointToLayer: function (feature, latlng) {
        const number = feature.properties.number;

        const numberIcon = L.divIcon({
          html: `<div class="marker-number">${number}</div>`,
          className: "",
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -18]
        });

        return L.marker(latlng, { icon: numberIcon });
      }
    }).addTo(map);

    if (filteredFeatures.length > 0) {
      map.fitBounds(jsonlayer.getBounds(), { padding: [30, 30] });
    }

    const legend = L.control({ position: "topright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      let html = `<h4>10 leuke dingen om te doen in ${selectedCity}</h4>`;

      filteredFeatures.forEach(feature => {
        const number = feature.properties.number;
        const name = feature.properties.name || feature.properties.naam || "Onbekende plek";
        html += `<div><span class="legend-number">${number}</span> ${name}</div>`;
      });

      div.innerHTML = html;
      return div;
    };

    legend.addTo(map);
  })
  .catch(error => {
    console.error("Fout bij laden GeoJSON:", error);
  });