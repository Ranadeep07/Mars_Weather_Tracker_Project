const API_KEY = 'DEMO_KEY';

const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

let solIndex = 0

getWeather(API_URL)
    .then(sols=>{
        solIndex = sols.length - 1;
        popSolByIndex(sols)
        popAllSol(sols)
        // hideWeatherHistory(sols)
        // console.log(sols)
    })

async function getWeather(url){
   return fetch(url)
    .then(res => res.json())
    .then(data => {
        const{
            sol_keys,
            validity_checks,
            ...solData
        } = data
        return Object.entries(solData).map(([sol, data]) => {
            return {
                sol : sol, 
                maxTemp : data.AT.mx,
                minTemp : data.AT.mn,
                windSpeed : data.HWS.av,
                windDirectionDeg : data.WD.most_common.compass_degrees,
                windDirectionCardinal : data.WD.most_common.compass_point,
                date : new Date(data.First_UTC)
            };
        })
    })
}
const sol = document.getElementById('sol');
const maxTemp = document.getElementById('maxTemp');
const minTemp = document.getElementById('minTemp');
const WindSpeed = document.getElementById('WindSpeed');


async function popSolByIndex(sols){
    const selectedSol = sols[solIndex];
    console.log(selectedSol)
    sol.innerText = `${selectedSol.sol}`             
    
    maxTemp.innerText = ` High: ${Math.round(selectedSol.maxTemp)}°C`
    minTemp.innerText = ` Low: ${Math.round(selectedSol.minTemp)}°C`
    WindSpeed.innerText = `${selectedSol.windSpeed} kph`
}
const prevWeather = document.getElementById('prevWeather');
const mouseOver = document.getElementById('mouseOver');

async function popAllSol(sols){
    let String = ""
    sols.forEach(element => {
        String += `<div class="prevWeatherData">
                        <span class="borderBottom"><strong>Sol ${element.sol}</strong> </span><br>
                        <span>High: ${Math.round(element.maxTemp)}°C</span><br>
                        <span>Low: ${Math.round(element.minTemp)}°C</span><br>
                    </div>
      `
    });
    prevWeather.innerHTML = String;
    // console.log(String)
    console.log(sols)
}

//For getting month according to the index
let date = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var currentMonth = month[date.getMonth()];

const currentDate = document.getElementById('currentDate');
currentDate.innerHTML = `<span style="font-size: 3rem; margin-bottom: 0px;">${currentMonth}</span><br>
<span style="font-size: 2.5rem;">${date.getDate()}</span>`