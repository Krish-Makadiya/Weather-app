const searchField = document.querySelector('#search-text');
const searchBtn = document.querySelector('.search-btn');
const cityName = document.querySelector('.bold');
const temp = document.querySelector('.temp');
const description = document.querySelector('.desc');
const windStat = document.querySelector('.wind-stat');
const humidityStat = document.querySelector('.humidity-stat');
const cloudStat = document.querySelector('.cloud-stat');
const loader = document.querySelector('.loader-container');
const weatherContainer = document.querySelector('.weather-data-container');
const errorPage = document.querySelector('.error-container');
const currWeather = document.querySelector('.weather-condition');
const homePage = document.querySelector('.home-page');



const APIkey = '4f712e2d8f10efcb77274bc8ece460b6';
homePage.classList.add('home-active');

searchBtn.addEventListener('click', ()=>{
    let location = searchField.value;
    if(location == ""){
        homePage.classList.add('home-active');
    }
    else{
        weatherContainer.classList.remove('active');
        errorPage.classList.remove('error-active');
        homePage.classList.remove('home-active');
        loader.classList.add('active-loader');
        searchLocationWeather(location);
    }
})

searchField.addEventListener('keydown', (event)=>{
    homePage.classList.remove('home-active');
    if(event.key === 'Enter'){
        console.log('pressed enter');
        let location = searchField.value;
        if(location == ""){
            homePage.classList.add('home-active');
        }
        else{
            weatherContainer.classList.remove('active');
            errorPage.classList.remove('error-active');
            loader.classList.add('active-loader');
            searchLocationWeather(location);
        }
        
    }
})


async function searchLocationWeather(location){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`);
        const result = await response.json();
        if(result.message == 'city not found'){
            loader.classList.remove('active-loader');
            errorPage.classList.add('error-active');
        }
        else{
            loader.classList.remove('active-loader');
            errorPage.classList.remove('error-active');
            renderWeatherData(result);
            weatherContainer.classList.add('active');
        }
    } 
    catch (error) {
        errorPage.classList.add('error-active');
        loader.classList.remove('active-loader');
    }
}


function renderWeatherData(data){
    cityName.innerText = data?.name + '.';
    temp.innerHTML = data?.main?.temp + `&deg;C`;
    description.innerText = data?.weather?.[0]?.description;

    let value = data?.weather?.[0]?.main;
    if(value == 'Clouds'){
        currWeather.src = 'assets/cloudy.png';
    }
    else if(value == 'Clear'){
        currWeather.src = 'assets/clear.png';
    }
    else if(value == 'Atmosphere'){
        currWeather.src = 'assets/atmosphere.png';
    }
    else if(value == 'Snow'){
        currWeather.src = 'assets/snow.png';
    }
    else if(value == 'Rain'){
        currWeather.src = 'assets/rain.png';
    }

    let wind = data?.wind?.speed * 3.6;
    windStat.innerText = wind.toFixed(2) + ' km/h';
    humidityStat.innerText = data?.main?.humidity + '%';    
    cloudStat.innerText = data?.clouds?.all + '%';
}   

