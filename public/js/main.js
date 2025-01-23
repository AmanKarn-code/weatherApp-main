const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
const searchStatus = document.getElementById("searchStatus");
const temp = document.getElementById("temp");
const humid = document.getElementById("humid");
const seaLevel = document.getElementById("seaLevel");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const pressure = document.getElementById("pressure");
const tempStatus = document.getElementById("tempStatus");
const windSpeed = document.getElementById("wind");
const sunRise = document.getElementById("sunRise");
const sunSet = document.getElementById("sunSet");
const hide = document.getElementById("hide");
const maincontent = document.querySelector(".main-content"); 
const para = document.querySelector(".para"); 
const para2 = document.querySelector(".para2"); 
const tempInfo= document.querySelector(".tempInfo"); 

// Function to convert Unix timestamp to a readable time format
const convertUnixToTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${hours}:${formattedMinutes} ${ampm}`;
};

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  if (cityVal === "") {
    hide.classList.add("hide");
    searchStatus.innerHTML = "Please enter a valid city.";
  } else {
    try {
      let url =  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
      const apiKey="59373e6d80a2123494ade7c0f0bbfd15";
      const response = await fetch(url+cityVal+`&appid=${apiKey}`);
      const data = await response.json();
      const arrData = [data];

      // Populate UI elements
      searchStatus.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerText = `${arrData[0].main.temp}°C`;
      humid.innerText = `${arrData[0].main.humidity}%`;
      seaLevel.innerText = arrData[0].main.sea_level || "N/A"; // Fallback for missing data
      maxTemp.innerText = `${arrData[0].main.temp_max}°C`;
      minTemp.innerText = `${arrData[0].main.temp_min}°C`;
      pressure.innerText = `${arrData[0].main.pressure} hPa`;
      windSpeed.innerText = `${arrData[0].wind.speed} m/s`;

      // Convert sunrise and sunset
      sunRise.innerText = convertUnixToTime(arrData[0].sys.sunrise);
      sunSet.innerText = convertUnixToTime(arrData[0].sys.sunset);

      // Weather status icon and dynamic background
      const tempMode = arrData[0].weather[0].main;
      if (tempMode === "Clear") {
         maincontent.style.backgroundImage = 'url(./images/clear.jpg)';
         para.style.color='black';
         para2.style.color='black';
         searchStatus.style.color='black';
         tempInfo.style.color='black';
        tempStatus.innerHTML = '<i class="fa fa-sun-o" style="color: #ffff00;"></i>';
      } else if (tempMode === "Clouds") {
         maincontent.style.backgroundImage = 'url(./images/cloudy.jpg)';
         para.style.color='white';
         para2.style.color='white';
         searchStatus.style.color='white';
         tempInfo.style.color='white';
        tempStatus.innerHTML = '<i class="fa fa-cloud" style="color: #ffffff;"></i>';
      } else if (tempMode === "Rain") {
         maincontent.style.backgroundImage = 'url(./images/rainy.jpg)';
        tempStatus.innerHTML = '<i class="fa fa-tint" style="color: #4ddce3;"></i>';
      } else if (tempMode === "Snow") {
         maincontent.style.backgroundImage = 'url(./images/snow.jpg)';
        tempStatus.innerHTML = '<i class="fa fa-snowflake-o" style="color: #00f;"></i>';
      } else {
         maincontent.style.backgroundImage = 'url(./images/sunny.jpg)';
         para.style.color='black';
         para2.style.color='black';
         searchStatus.style.color='black';
        tempStatus.innerHTML = '<i class="fa fa-sun-o" style="color: #ffff00;"></i>';
      }

      hide.classList.remove("hide");
    } catch {
      searchStatus.innerText = "Please enter a valid city.";
      hide.classList.add("hide");
    }
  }
};

searchbtn.addEventListener("click", getInfo);
