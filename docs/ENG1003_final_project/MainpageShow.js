
document.getElementById("map").addEventListener("load",showOnMap)

function showOnMap()
{
  let returnDataStrg = JSON.parse(localStorage.getItem("flights_local"));
  let returnData = new Flight();
  returnData.fromData(returnDataStrg);
  let deplat = Number(returnData.departureAirport.lat);
  let deplong = Number(returnData.departureAirport.long);
  let arrlat = Number(returnData.arrivalAirport.lat);
  let arrlong = Number(returnData.arrivalAirport.long);

  let locations = [
	{
		coordinates: [deplong, deplat],
    description: {
      country: `${returnData.departureAirport.country}`,
      airport: `${returnData.departureAirport.airport}`
    }
	},
	{
		coordinates: [arrlong, arrlat],
    description: {
      country: `${returnData.arrivalAirport.country}`,
      airport: `${returnData.arrivalAirport.airport}`
    }
  }
 ];
// code to create markers on the map
// reference https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
 for (let i = 0; i < locations.length; i++)
 {
   let colorCode = ["#FF8C00","#0000FF"]
   let location = locations[i];
   let marker = new mapboxgl.Marker({ "color": `${colorCode[i]}`});
   marker.setLngLat(location.coordinates);

   let innerHTML = `Country:${location.description.country}<br>`
   innerHTML += `Airport:${location.description.airport}`
   let popup = new mapboxgl.Popup({ offset: 45}).setHTML(innerHTML);

   marker.setPopup(popup)

   // Display the marker.
   marker.addTo(map);

   // Display the popup.
   popup.addTo(map);
  }
// code to create lines  joining markers
// reference  https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/ 
  let object = {
type: "geojson",
data: {
type: "Feature",
properties: {},
geometry: {
type: "LineString",
coordinates: []
}
}
};

for(let i = 0; i < locations.length; i++)
{
object.data.geometry.coordinates.push(locations[i].coordinates);
}

map.addLayer({
id: "routes",
type: "line",
source: object,
layout: { "line-join": "round", "line-cap": "round" },
paint: { "line-color": "#888", "line-width": 6 }
});

}
