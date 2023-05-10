const API_KEY= 'f594f57341d170a0dcaf728630a744c0';
const uriLocation = 'https://api.openweathermap.org/geo/1.0/direct?';
const uriWeather = 'https://api.openweathermap.org/data/2.5/weather?';
const btn = document.getElementById('btn');
const cityName = document.getElementById('cityName');
const info = document.getElementById('info');
const img = document.getElementById('img');

const backgrounds = {
    tormenta: "https://images.pexels.com/photos/4420454/pexels-photo-4420454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nubes: "",
    lluvia_ligera: ""
}


const FetchLocation = async () =>{
    const result  = await fetch(`${uriLocation}q=${cityName.value}&appid=${API_KEY}`);
    const data = await result.json();
    return {data}
}

const FetchWeather = async (lat,lon) =>{
    const result  = await fetch(`${uriWeather}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
    const dataWeather = await result.json()
    
    return {dataWeather}
}

const drawWeather = (box,data) => {
    box.innerHTML ="";
    const p = document.createElement('p');
    p.innerHTML = `<span>Clima actual de ${data.name}</span>
        <i class="bi bi-cloud-drizzle d-block w-auto btn-secondary p-2">
             Humidity:  ${data.main.humidity}%
         </i>
         <i class="bi bi-thermometer-sun btn-warning p-2 d-block w-auto">
            Temperature : ${data.main.temp}ºC
         </i>
         <i class="bi bi-info-circle-fill btn-info p-2 d-block w-auto">
            Description: ${data.weather[0].description}
         </i>
         `;
    box.appendChild(p);
}

btn.addEventListener('click', async(e) =>{
    const {data} = await FetchLocation();
    const lat = data[0].lat;
    const lon = data[0].lon;
    const {dataWeather} = await FetchWeather(lat,lon);
    console.log(dataWeather);

    drawWeather(info, dataWeather);
    cityName.value="";
});