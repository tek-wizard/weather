// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    const apiKey = 'be9b15d598d98e8695ca3b488f981ec0'; // Replace with your OpenWeatherMap API key
  
    // Validate input to ensure city name is provided
    if (!city) {
      displayError('Please enter a city name.');
      return;
    }
  
    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data); // Show weather info
        changeBackground(data.weather[0].main); // Update background based on weather
      })
      .catch(error => {
        displayError(error.message); // Show error message
      });
  });
  
  // Function to display the weather details
  function displayWeather(data) {
    // Hide error message and show weather info
    document.getElementById('error-message').classList.add('hidden');
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.classList.remove('hidden');
  
    // Update the UI with the fetched weather data
    document.getElementById('city-name').textContent = `Weather in ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  }
  
  // Function to display error messages
  function displayError(message) {
    // Hide weather info and show error message
    document.getElementById('weather-info').classList.add('hidden');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  }
  
  // Function to change the background based on weather condition
  function changeBackground(weatherCondition) {
    const body = document.body;
    // Match weather condition to appropriate background
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        body.style.background = 'linear-gradient(to right, #56ccf2, #2f80ed)';
        break;
      case 'clouds':
        body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
        break;
      case 'rain':
      case 'drizzle':
        body.style.background = 'linear-gradient(to right, #4facfe, #00f2fe)';
        break;
      case 'thunderstorm':
        body.style.background = 'linear-gradient(to right, #000428, #004e92)';
        break;
      case 'snow':
        body.style.background = 'linear-gradient(to right, #e6dada, #274046)';
        break;
      case 'mist':
      case 'haze':
      case 'fog':
        body.style.background = 'linear-gradient(to right, #3e5151, #decba4)';
        break;
      default:
        body.style.background = 'linear-gradient(to right, #74ebd5, #9face6)';
    }
  }
  