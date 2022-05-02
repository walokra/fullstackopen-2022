import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const api_base_url = "http://api.openweathermap.org/";

// const weatherIcons = [
//   [200, "11d"],
//   [201, "11d"],
//   [202, "11d"],
//   [210, "11d"],
//   [211, "11d"],
//   [212, "11d"],
//   [221, "11d"],
//   [230, "11d"],
//   [231, "11d"],
//   [232, "11d"],
//   [300, "09d"],
//   [301, "09d"],
//   [302, "09d"],
//   [310, "09d"],
//   [311, "09d"],
//   [312, "09d"],
//   [313, "09d"],
//   [314, "09d"],
//   [321, "09d"],
//   [500, "10d"],
//   [501, "10d"],
//   [502, "10d"],
//   [503, "10d"],
//   [504, "10d"],
//   [511, "13d"],
//   [520, "09d"],
//   [521, "09d"],
//   [522, "09d"],
//   [531, "09d"],
//   [600, "13d"],
//   [601, "13d"],
//   [602, "13d"],
//   [611, "13d"],
//   [612, "13d"],
//   [613, "13d"],
//   [615, "13d"],
//   [616, "13d"],
//   [620, "13d"],
//   [621, "13d"],
//   [622, "13d"],
//   [701, "50d"],
//   [711, "50d"],
//   [721, "50d"],
//   [731, "50d"],
//   [741, "50d"],
//   [751, "50d"],
//   [761, "50d"],
//   [762, "50d"],
//   [771, "50d"],
//   [781, "50d"],
//   [800, "01d"],
//   [800, "01n"],
//   [801, "02d"],
//   [801, "02n"],
//   [802, "03d"],
//   [802, "03n"],
//   [803, "04d"],
//   [803, "04n"],
//   [804, "04d"],
//   [804, "04n"],
// ];

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getWeather(city);
  }, [city]);

  const getWeather = async (city) => {
    const geocode = await axios.get(`${api_base_url}geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`);
    const weatherResponse = await axios.get(
      `${api_base_url}/data/2.5/weather?lat=${geocode.data[0].lat}&lon=${geocode.data[0].lon}&units=metric&appid=${api_key}`
    );
    setWeather(weatherResponse.data);
    // console.log("weatherResponse :", weatherResponse);
    // console.log("weatherResponse.data.weather :", weatherResponse.data.weather);
  };

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {weather.main ? weather.main.temp : undefined} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather ? weather.weather[0].icon : "01d"}@2x.png`}
        alt=""
      />
      <p>wind {weather.wind ? weather.wind.speed : undefined} m/s</p>
    </div>
  );
};

export default Weather;
