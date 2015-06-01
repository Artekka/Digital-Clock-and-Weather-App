$(document).ready(function(){
		var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Chicago,us", false);
			xhr.send();

			// console.log(xhr.status);
			// console.log(xhr.statusText);
	function displayTime() {
		
		var weatherData = JSON.parse(xhr.responseText);

		var sunrise = (weatherData.sys.sunrise);
			sunrise = new Date(sunrise*1000).toLocaleString(); // converts epoch into actual readable date and time
			sunrise = sunrise.replace(/^.+,/, "").replace(/ /,""); // removes the "," everything before it and the space after
			sunrise = sunrise.match(/^[0-9]/); // matches the first number, which is the hour
			sunrise = parseInt(sunrise[0]).toString(); // turn into string to be read later
			//console.log(sunrise);
			
		var sunset = (weatherData.sys.sunset);
			sunset = new Date(sunset*1000).toLocaleString();
			sunset = sunset.replace(/^.+,/, "").replace(/ /,"");
			sunset = sunset.match(/^[0-9]/);
			sunset = parseInt(sunset[0]); // without parseInt, sunset[0] + 12 = # + 12, so 8 + 12 = 812 (concatenation).
			sunsetOffset = 12; // 12 since this is supposed to be PM
			sunset = (sunset + sunsetOffset).toString(); // turn the integer back into a string to be read later
			//console.log(sunset);
		
		var city = (weatherData.name);
		
		var temperature = Math.round((((weatherData.main.temp) - 273.15)*(1.8) + 32.00)*10)/10; // Formula for Kelvin to F
		// var temperature = Math.round((((weatherData.main.temp) - 273.15)*(1.8) + 32.00)*10)/10; - For more precise temp ie XX.X 

		var cityDiv = document.getElementById('city'); // target Div ID to insert values
		var temperatureDiv = document.getElementById('temperature');
		
		cityDiv.innerText = city;
		temperatureDiv.innerText = temperature + " " + unescape('%B0') + "F"; // &B0 = the degrees sign
		
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		// var milliseconds = currentTime.getMilliseconds();
		var meridiem = "AM";
		
		var clockDiv = document.getElementById('clock'); 
		
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		
		if (seconds < 10) {
			seconds = "0" + seconds; 
		}
		
		if ((hours > sunrise) && (hours < sunset)) { // Using sunrise and sunset times to determine when to show day or night
			$('#orb').addClass('sun').removeClass('moon');
			$('body').addClass('day').removeClass('night');
			$('.moonspot').removeClass('visible1').removeClass('visible2');
		} else {
			$('#orb').addClass('moon').removeClass('sun');
			$('body').addClass('night').removeClass('day');
			$('.moonspot').addClass('visible1');
			$('#moonspot3').addClass('visible2');
		}
		
		if (hours > 12) {
			hours = hours - 12; // Non-military time
			meridiem = "PM"; // Gives us AM or PM based on time of day
		}
		
		if (hours < 10 ) {
			hours = "0" + hours; // Ensures two digits at all times for hours 1-9
		}
		
		if (hours === 0) {
			hours = 12;
		}
		
		clockDiv.innerText = hours + ":" + minutes + ":" + seconds + " " + meridiem; // concatenate
	}
	
	displayTime(); // display on page load
	
	setInterval(displayTime, 1000); // re-display every second, ticking clock
	
	
});