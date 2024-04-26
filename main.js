document.addEventListener('DOMContentLoaded', function() {
    
    function updateTime() {
      const timeElements = document.querySelectorAll('.time-number');
      const now = new Date();
  
      timeElements[0].textContent = formatTime(now.getHours());
      timeElements[1].textContent = formatTime(now.getMinutes());
      timeElements[2].textContent = formatTime(now.getSeconds());
    }
  
    
    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }
  
    
    updateTime();
  
    
    setInterval(updateTime, 1000);
  
    // Function to fetch temperature from OpenWeatherMap API
    async function fetchTemperature(city) {
      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.main.temp;
      } catch (error) {
        console.error('Error fetching temperature:', error);
        return null;
      }
    }
  
    // Function to update the displayed temperature
    async function updateTemperature() {
      const temperatureElement = document.getElementById('weather');
      const temperature = await fetchTemperature('Nairobi'); // Change 'Nairobi' to desired city
      if (temperature !== null) {
        temperatureElement.textContent = `Temperature: ${temperature}°C`;
      } else {
        temperatureElement.textContent = 'Temperature data unavailable';
      }
    }
  
    // Initial call to updateTemperature to set the temperature on page load
    updateTemperature();
  
    // Set up event listener for temperature unit selection
    const celsiusRadio = document.getElementById('celsius');
    const fahrRadio = document.getElementById('fahr');
  
    celsiusRadio.addEventListener('change', function() {
      updateTemperature();
    });
  
    fahrRadio.addEventListener('change', function() {
      updateTemperature();
    });
  });
  