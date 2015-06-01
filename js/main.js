$(document).ready(function(){
	function displayTime() {
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		// var milliseconds = currentTime.getMilliseconds();
		var meridiem = "AM";
		
		var clockDiv = document.getElementById('clock'); // target Div ID to insert values

		if (hours < 10) {
			hours = "0" + hours; // Ensures two digits at all times for hours 1-9
		}
		
		if (minutes < 10) {
			minutes = "0" + minutes; 
		}
		
		if (seconds < 10) {
			seconds = "0" + seconds; 
		}
		
		if (hours > 12) {
			hours = hours - 12; // Non-military time
			meridiem = "PM"; // Gives us AM or PM based on time of day
		}
		
		if (hours === 0) {
			hours = 12;
		}
		
		clockDiv.innerText = hours + ":" + minutes + ":" + seconds + " " + meridiem; // concatenate
	}
	
	displayTime(); // display on page load
	
	setInterval(displayTime, 1000); // re-display every second, ticking clock
	
});