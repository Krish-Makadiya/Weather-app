const searchField = document.querySelector('#search-text');
const searchBtn = document.querySelector('.search-btn');
const cityName = document.querySelector('.bold');
const temp = document.querySelector('.temp');
const description = document.querySelector('.desc');
const windStat = document.querySelector('.wind-stat');
const humidityStat = document.querySelector('.humidity-stat');
const cloudStat = document.querySelector('.cloud-stat');
const loader = document.querySelector('.load');
const weatherContainer = document.querySelector('.weather-data-container');



const APIkey = '4f712e2d8f10efcb77274bc8ece460b6';

searchBtn.addEventListener('click', ()=>{
    let location = searchField.value;
    if(location == ""){
        alert('please enter a valid location');
    }
    else{
        loader.classList.add('loader');
        searchLocationWeather(location);
    }
})


async function searchLocationWeather(location){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`);
        const result = await response.json();
        loader.classList.remove('loader');
        weatherContainer.classList.add('active');
        renderWeatherData(result);
    } 
    catch (error) {
        alert('API not found')
    }
}


function renderWeatherData(data){
    cityName.innerText = data?.name + '.';
    temp.innerHTML = data?.main?.temp + `&deg;C`;
    description.innerText = data?.weather?.[0]?.description;

    let wind = data?.wind?.speed * 3.6;
    windStat.innerText = wind.toFixed(2) + 'km/h';

    humidityStat.innerText = data?.main?.humidity + '%';    cloudStat.innerText = data?.clouds?.all + '%';
}   

