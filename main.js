const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather"
  }
const searchBox = document.querySelector(".search-box");

searchBox.addEventListener('keypress',setQuery);

function setQuery(e) {
    console.log(e);
    if(e.keyCode === 13 ) {
        getWeatherInfo(searchBox.value);
    }
}



function getWeatherInfo(query) {
    const url =`${api.base}?q=${query}&units=metric&appid=${api.key}`;
    let promise = fetch(url);
    console.log(promise);
    promise.then((response) => {
        return response.json();
    }).then((weatherResponse)=>{
        console.log(weatherResponse);
        if(weatherResponse.cod === 200){
            console.log("all good to update dom");
            displayResults(weatherResponse);
        } else {
            alert(weatherResponse.message);
        }
    }).catch((err)=>console.log(err));

}

function displayResults(weatherInfo){
    console.log(weatherInfo);
    document.querySelector(".city").innerHTML = weatherInfo.name;
    document.querySelector(".temp").innerHTML = `${weatherInfo.main.temp}°c`;
    document.querySelector(".weather").innerHTML = weatherInfo.weather[0].main;
    document.querySelector(".hi-low").innerHTML = 
        `${Math.round(weatherInfo.main.temp_min)}°c / ${Math.round(weatherInfo.main.temp_max)}°c`;
    
    let now = new Date();

    const DATE_FORMAT_OPTIONS = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    const date = now.toLocaleDateString("en-US",DATE_FORMAT_OPTIONS);
    
    document.querySelector(".date").innerHTML = `${date}`;

}