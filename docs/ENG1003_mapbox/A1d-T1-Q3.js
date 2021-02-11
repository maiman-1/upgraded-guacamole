mapboxgl.accessToken = "pk.eyJ1IjoibWFpbWFuIiwiYSI6ImNrN2l0bWJsNTBvb2czbWxsdHBib2x0bzEifQ.eAbwAhg_d-Kp4GEPY9kc8g";
let map = new  mapboxgl.Map({
  container: 'map',
  center: [145.1343136,-37.908],
  zoom: 13,
  style: 'mapbox://styles/mapbox/streets-v9'
});

let locations = [
  {
		coordinates: [145.135507, -37.896817],
		description: `Australia Post Mount Waverley`
	},
	{
		coordinates: [145.131971, -37.906071],
		description: `Name: Prof. Jon
    Location: CSIRO Clayton
    Order: 314587585
    Sign req: Yes`
	},
  {
		coordinates: [145.123612, -37.920469],
		description: `Name: Dr. Tan
    Location: Monash Medical Centre
    Order: 368975142
    Sign req: Yes`
	},
  {
		coordinates: [145.13203, -37.915669],
		description: `Name: Mr. Nisal
    Location: Mannix College
    Order: 875412847
    Sign req: Yes`
	},
  {
		coordinates: [145.142785, -37.905812],
		description: `Name: Ms. White
    Location: Rusden House
    Order: 698547158
    Sign req: No`
	}
];

for (let i = 0; i < locations.length; i++)
{
	let location = locations[i];
	let marker = new mapboxgl.Marker({ "color": "#FFA500" });
	marker.setLngLat(location.coordinates);

	let popup = new mapboxgl.Popup({ offset: 45});
	popup.setText(location.description);

	marker.setPopup(popup)

	// Display the marker.
	marker.addTo(map);

	// Display the popup.
	popup.addTo(map);
}


function showPath()
{
  let object = {
      type: "geojson",
      data:
      {
        type: "Feature",
        properties: {},
        geometry:
        {
          type: "LineString",
          coordinates: []
      }
    }
  };

  for(let i = 0; i < locations.length; i++)
  {
    object.data.geometry.coordinates.push(locations[i].coordinates);
  }
  //console.log(object.data.geometry.coordinates)
  map.addLayer({
  id: "routes",
  type: "line",
  source: object,
  layout: { "line-join": "round", "line-cap": "round" },
  paint: { "line-color": "#888", "line-width": 6 }
  });

}

map.on("load",showPath);
