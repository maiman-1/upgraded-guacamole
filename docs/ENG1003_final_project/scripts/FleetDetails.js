//Retrieve Information from api
//Token to access web service
//Web service url
//No longer necessary: All from localStorage
//Reference for the inputs
let fleetDetailSortRef = document.getElementById("fleetDetailSort");
//addEventListener for this
fleetDetailSortRef.addEventListener("change",getAirplanesData);
//console.log(fleetDetailSortRef.value);

//Referernce of table
let fleetOutputHeadRef = document.getElementById("fleetOutputHead");
let fleetOutputRef = document.getElementById("fleetOutput");
//console.log(document.getElementById("filterAirport"));
//console.log(fleetOutputRef);
window.addEventListener("load", getAirplanesData);
//console.log("loaded");
//Function: getAQIData ->Make request to server
function getAirplanesData()
{
	let result = extractFleet();
	//console.log(result.airplanes[0].id);
	let localStr = "";
  let localStrHead = "";
  //thead content;
	// creation of a table for fleet details to be inserted
  localStrHead += '<tr>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric"';
  localStrHead += ' style = "text-align:center" >ID </th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric"';
  localStrHead += ' style = "text-align:center" >Registration </th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Location</th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Range</th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Speed</th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Type</th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Status</th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Airline</th>';
  localStrHead += '</tr>';
  fleetOutputHeadRef.innerHTML = localStrHead;
	//data is retrieved in form of object, first key is airplanes (result is object)
  // individual airplanes stored in array
	//Sort result
	result = sortData(result);
	//First, loop through the object and add to the localStr with proper
  for (let i = 0; i < result.airplanes.length; i++)
  {
    localStr += "<tr>";
    //Individual Airplanes stored in form of objects again
    for (let key in result.airplanes[i])
    {
      //console.log(key)
      //console.log(result.airplanes[0][key]);
      //Formatting
      localStr += '<td class="mdl-data-table__cell--non-numeric">';
      //extract only value
      localStr += result.airplanes[i][key].toString();
      localStr += '</td>';
    }
    localStr += "</tr>";
  }
  //console.log(localStr);
  //Output to fleetOutput
  fleetOutputRef.innerHTML = localStr;

}

//Function to sort webAPI data
// sorting of the fleet data 
function sortData(data)
{
	//First loop throught the data.airplanes
	for (let i =0; i< data.airplanes.length-1;i++)
	{
		//console.log(data.airplanes[i][fleetDetailSortRef.value]);
		if (fleetDetailSortRef.value === "")
		{
			continue;
		}
		// arrangement in ascending order
		//Change arrangements if this data is more than next data
		else if (data.airplanes[i][fleetDetailSortRef.value] > data.airplanes[i+1][fleetDetailSortRef.value])
		{
			let temp  = data.airplanes[i];
			data.airplanes[i] = data.airplanes[i+1];
			data.airplanes[i+1] = temp;
			i = -1;
		}
		else
		{
			continue;
		}
	}
	return data;
}
