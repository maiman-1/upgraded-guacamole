mapboxgl.accessToken = "pk.eyJ1IjoibWFpbWFuIiwiYSI6ImNrN2l0bWJsNTBvb2czbWxsdHBib2x0bzEifQ.eAbwAhg_d-Kp4GEPY9kc8g";
let map = new  mapboxgl.Map({
  container: 'map',
  center: [151.211865, -33.863320],
  zoom: 17,
  style: 'mapbox://styles/mapbox/streets-v9'
});

let locations = [
  {
		coordinates: [151.211865,-33.863320],
		description: `Accident
    Date: 01/22
    Time: 8 a.m. to 9.30 a.m.`
	},
  {
    coordinates: [151.209038,-33.862876],
    description: `Road Works
    Date: 01/22
    Time:9 p.m. to 11.30 p.m.
    Description: Re painting the pedestrian crossing`
  },
  {
    coordinates: [151.211732,-33.861576],
    description: `Congestion
    Date: 01/23
    Time: 11 a.m. to 2 p.m.
    Description: Live event`
  },{
    coordinates: [151.207475,-33.863474],
    description: `Accident
    Date: 01/22
    Time: 8 a.m. to 9.30 a.m.`
  },
  {
    coordinates: [151.211161,-33.862643],
    description: `Congestion
    Date: 01/23
    Time: 12 p.m. to 1.30 p.m.
    Description: Protest`
  },
  {
		coordinates: [151.207295,-33.862153],
    description: `Road Works
    Date: 01/23
    Time: 9 a.m. to 5 p.m.
    Description: Repairing Footpath`
	}
];

for (let i = 0; i < locations.length; i++)
{
	let location = locations[i];
  //console.log(location.description.includes("Congestion"));
  let color = "#FFFFFF"
  if (location.description.includes("Congestion"))
  {
    color = "#00FF00"
  }
  if (location.description.includes("Accident"))
  {
    color = "#FF0000"
  }
  if (location.description.includes("Road Works"))
  {
    color = "#0000FF"
  }
  console.log(color);
	let marker = new mapboxgl.Marker({ "color": color });
	marker.setLngLat(location.coordinates);

	let popup = new mapboxgl.Popup({ offset: 15});
	popup.setText(location.description);

	marker.setPopup(popup)

	// Display the marker.
	marker.addTo(map);

	// Display the popup.
	popup.addTo(map);
}
