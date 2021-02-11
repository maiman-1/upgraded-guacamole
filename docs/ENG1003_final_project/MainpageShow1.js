
function showOnMap()
{
  let returnDataStrg = JSON.parse(localStorage.getItem("flights_Stored"));
  let returnData = new FlightList();
  returnData.fromData(returnDataStrg);
  console.log(returnData);

  for( i = 0 ; i < returnData.count ; i++)
  {
<<<<<<< Updated upstream
    let deplat = Number(returnData.getFlight(i).departureAirport.lat);
    let deplong = Number(returnData.getFlight(i).departureAirport.long);
    let depcount = returnData.getFlight(i).departureAirport.country;
    let depair = returnData.getFlight(i).departureAirport.airport;
    let arrlat = Number(returnData.getFlight(i).arrivalAirport.lat);
    let arrlong = Number(returnData.getFlight(i).arrivalAirport.long);
    let arrcount = returnData.getFlight(i).arrivalAirport.country;
    let arrair = returnData.getFlight(i).arrivalAirport.airport;
// code to create markers as popups
// reference : https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
    let locations = [
  	{
  		coordinates: [deplong, deplat],
      description: {
        country: `${depcount}`,
        airport: `${depair}`
=======
    if (returnData.getFlight(i).waypointsAirport == "")
    {
      let deplat = Number(returnData.getFlight(i).departureAirport.lat);
      let deplong = Number(returnData.getFlight(i).departureAirport.long);
      let depcount = returnData.getFlight(i).departureAirport.country;
      let depair = returnData.getFlight(i).departureAirport.airport;
      let arrlat = Number(returnData.getFlight(i).arrivalAirport.lat);
      let arrlong = Number(returnData.getFlight(i).arrivalAirport.long);
      let arrcount = returnData.getFlight(i).arrivalAirport.country;
      let arrair = returnData.getFlight(i).arrivalAirport.airport;

      let locations = [
      {
        coordinates: [deplong, deplat],
        description: {
          country: `${depcount}`,
          airport: `${depair}`
        }
      },
      {
        coordinates: [arrlong, arrlat],
        description: {
          country: `${arrcount}`,
          airport: `${arrair}`
        }
>>>>>>> Stashed changes
      }
     ];
     //console.log(locations);
     for (let j = 0; j < locations.length; j++)
     {
       let colorCode = ["#FF8C00","#0000FF"]
       let location = locations[j];
       let marker = new mapboxgl.Marker({ "color": `${colorCode[j]}`});
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
<<<<<<< Updated upstream
// code to create lines that join markers together
// reference : https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/
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
 }

  for(let k = 0; k < locations.length; k++)
  {
  object.data.geometry.coordinates.push(locations[k].coordinates);
  }

  map.addLayer({
  id: `routes${i}`,
  type: "line",
  source: object,
  layout: { "line-join": "round", "line-cap": "round" },
  paint: { "line-color": "#888", "line-width": 6 }
  });

  }
=======
   }

    for(let k = 0; k < locations.length; k++)
    {
    object.data.geometry.coordinates.push(locations[k].coordinates);
    }

    map.addLayer({
    id: `routes${i}`,
    type: "line",
    source: object,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
    });

    }

    else
    {
       let fulllat = [];
      let fulllong = [];
      let fullcoun = [];
      let fullair = [];
      let deplat = Number(returnData.getFlight(i).departureAirport.lat);
      let deplong = Number(returnData.getFlight(i).departureAirport.long);
      let depcoun = returnData.getFlight(i).departureAirport.country;
      let depair = returnData.getFlight(i).departureAirport.airport;
      let arrlat = Number(returnData.getFlight(i).arrivalAirport.lat);
      let arrlong = Number(returnData.getFlight(i).arrivalAirport.long);
      let arrcount = returnData.getFlight(i).arrivalAirport.country;
      let arrair = returnData.getFlight(i).arrivalAirport.airport;
      fulllat.push(deplat);
      fulllong.push(deplong);
      fullcoun.push(depcoun);
      fullair.push(depair);

      for ( let x = 0 ; x < returnData.getFlight(i).waypointsAirport.length ; x++ )
      {
        fulllat.push(returnData.getFlight(i).waypointsAirport[x].lat);
        fulllong.push(returnData.getFlight(i).waypointsAirport[x].long);
        fullcoun.push(returnData.getFlight(i).waypointsAirport[x].country);
        fullair.push(returnData.getFlight(i).waypointsAirport[x].airport);
      }

      fulllat.push(arrlat);
      fulllong.push(arrlong);
      fullcoun.push(arrcount);
      fullair.push(arrair);
      for (let y = 0; y < fulllat.length; y++)
      {
        let colorCode = ["#FF8C00","#0000FF"];
        let color =""
        if (y == 0)
        {
          color = colorCode[0];
        }
        else if ( y == fulllat.length - 1)
        {
          color = colorCode[1];
        }
        let coordinates = [fulllong[y],fulllat[y]];
        let marker = new mapboxgl.Marker({ "color": `${color}`});
        marker.setLngLat(coordinates);

        let innerHTML = `Country:${fullcoun[y]}<br>`
        innerHTML += `Airport:${fullair[y]}`
        let popup = new mapboxgl.Popup({ offset: 45}).setHTML(innerHTML);

        marker.setPopup(popup)

        // Display the marker.
        marker.addTo(map);

        // Display the popup.
        popup.addTo(map);
       }

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
    }

     for(let k = 0; k < fulllat.length; k++)
     {
     object.data.geometry.coordinates.push([fulllong[k],fulllat[k]]);
     }

     map.addLayer({
     id: `routes${i}`,
     type: "line",
     source: object,
     layout: { "line-join": "round", "line-cap": "round" },
     paint: { "line-color": "#8A2BE2", "line-width": 6 }
     });

     }

    }
>>>>>>> Stashed changes

}
