import axios from "axios";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=295415789f1cc2f1e1c0f875b55f2d63&units=metric`);

      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError("City not found ❌");
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  /* ---------------- WEATHER CONDITION ---------------- */

  let weatherCondition = "";
  if (weather) {
    weatherCondition = weather.weather[0].main;
  }

  /* ---------------- DYNAMIC BACKGROUND ---------------- */

  let backgroundStyle =
    "bg-gradient-to-br from-blue-900 via-black to-gray-900";

  if (weatherCondition === "Clear") {
    backgroundStyle =
  "bg-gradient-to-br from-sky-300 via-amber-200 to-orange-300";
  } else if (weatherCondition === "Rain") {
    backgroundStyle =
      "bg-gradient-to-br from-gray-600 via-blue-800 to-gray-900";
  } else if (weatherCondition === "Clouds") {
    backgroundStyle =
      "bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800";
  } else if (weatherCondition === "Thunderstorm") {
    backgroundStyle =
      "bg-gradient-to-br from-gray-800 via-gray-900 to-black";
  }

  /* ---------------- WEATHER ICON ---------------- */

  const getWeatherIcon = () => {
    if (!weather) return "";

    const condition = weather.weather[0].main;

    if (condition === "Clear") return "☀️";
    if (condition === "Rain") return "🌧";
    if (condition === "Clouds") return "☁️";
    if (condition === "Thunderstorm") return "⛈";
    if (condition === "Mist") return "🌫";

    return "🌤";
  };

  return (
    <div
  className={`relative min-h-screen flex items-center justify-center ${backgroundStyle} text-white px-4 transition-all duration-700`}
>

  {weatherCondition === "Clear" && (
  <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-60"></div>
)}
      <div className="backdrop-blur-lg bg-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold text-center mb-6">
          🌤 Weather App
        </h1>

        {/* INPUT */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
          />

          <button
            onClick={getWeather}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Search
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center mt-5">
            <Oval
              height={60}
              width={60}
              color="#3b82f6"
              secondaryColor="#93c5fd"
              strokeWidth={4}
              strokeWidthSecondary={4}
              visible={true}
            />
          </div>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center mt-4 text-red-400 font-semibold">
            {error}
          </p>
        )}

        {/* WEATHER DATA */}
        {weather && (
          <div className="mt-6 bg-white/10 rounded-xl p-6 border border-white/20 shadow-lg">
            
            <div className="text-6xl text-center mb-3">
              {getWeatherIcon()}
            </div>

            <h2 className="text-xl font-semibold text-center mb-4">
              {weather.name}, {weather.sys.country}
            </h2>

            <div className="space-y-2">
              <p>🌡 Temperature: {weather.main.temp}°C</p>
              <p>🤒 Feels Like: {weather.main.feels_like}°C</p>
              <p>☁ Condition: {weather.weather[0].main}</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
              <p>
                🌅 Sunrise:{" "}
                {new Date(
                  weather.sys.sunrise * 1000
                ).toLocaleTimeString()}
              </p>
              <p>
                🌇 Sunset:{" "}
                {new Date(
                  weather.sys.sunset * 1000
                ).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;