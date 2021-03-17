$( document ).ready(function() {
	console.log( "ready!" );
	

	// CURRENT WEATHER
	$('#ville').keypress(function(event) {
		if (event.which==13) {
		var ville=$('#ville').val();
		$.ajax({
		  url: "http://api.openweathermap.org/data/2.5/weather?q="+ville+"&units=metric&lang=en&appid=771c077f262f4574e6403fb55f03f119",
		  dataSrc:'data' ,
		  cache: false
		})
		    .done(function( json ) {
			//Variables
			var iconcode = json.weather[0].icon;
			var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

			console.log(json);
			$("#city").html(json.name);
			$("#temp").html(json.main.temp+'°C');
			$("#description").html(json.weather[0].description);
			$('#wicon').attr('src', iconurl);
		    });
		}
	});

	// FORECAST
	$('#ville').keypress(function(event) {
		if (event.which==13) {


			var ville=$('#ville').val();
			$.ajax({
			url: "http://api.openweathermap.org/data/2.5/forecast?q="+ville+"&units=metric&lang=en&appid=771c077f262f4574e6403fb55f03f119",
			cache: false
			})
			.done(function( json ) {
				if ($.fn.dataTable.isDataTable('#weatherTable')) {
					$('#weatherTable').DataTable().clear().destroy();}
				for (var i=0;i<json.list.length;i++) {

					//New Variables
					var datehour = document.createElement('td');
					var forecast = document.createElement('td');
					var descriptionFor = document.createElement('td');
					var icon = document.createElement('td');
					var image = document.createElement('img');
					var tr = document.createElement('tr');
					var body = document.getElementById('body');

					//Animations
					document.getElementById("beforeTable").classList.add('exitEffect', 'd-none');

					document.getElementById("tableHead").classList.remove('d-none');

					document.getElementById("resultsCard").classList.add('enterEffect');

					document.getElementById("weatherTable").classList.add('enterEffect');

					//Relationships
					body.appendChild(tr);
					tr.appendChild(datehour);
					tr.appendChild(forecast);
					tr.appendChild(descriptionFor);
					tr.appendChild(icon);
					icon.appendChild(image);

					//Extraction from JSON

					datehour.innerHTML=(json.list[i].dt_txt); //Inlocuim [0] cu [i] ca sa fie inlocuit cu indexul din FOR
					forecast.innerHTML=(json.list[i].main.temp+'°C');
					descriptionFor.innerHTML=(json.list[i].weather[0].description);
					//wiconFor.attr('src', iconurlFor);
					image.src="http://openweathermap.org/img/wn/" + json.list[i].weather[0].icon + "@2x.png";
				
				}

				
				

				$('#weatherTable').DataTable({
					searching: false,
					pagingType: "simple", //Only show Prev/Next btns
    				pageLength: 5, //Default pageLenght
				});
			});
		}
	});
});
