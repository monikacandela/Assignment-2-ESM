export const getNearPages = async coordinates => {
	
	var url = "https://en.wikipedia.org/w/api.php"; 
	
	const latitude = coordinates.lat
	const longitude = coordinates.lon
	
	var params = {
		action: "query",
		list: "geosearch",
		gscoord: "" + latitude + "|" + longitude + "",
		gsradius: "10000",
		gslimit: "10",
		format: "json"
	};

	url = url + "?origin=*";
	Object.keys(params).forEach(function(key){
		url += "&" + key + "=" + params[key];
	});
	var places = []
	await fetch(url)
		.then(function(response){
			return response.json();
		})
		.then(function(response){
			var pages = response.query.geosearch;
			for (var i=0; i<pages.length; i++) {
				const title = pages[i].title
				var dist = pages[i].dist
				if(dist >=1000)
					dist = (dist/1000).toFixed(2) + " km"
				else
					dist = dist + " m"
				const p = {title: pages[i].title, distance: dist}
				places = [...places, p]
			}
		})
		.catch(function(error){
			console.log(error);
		});
		return places
}






