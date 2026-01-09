import { fetchData } from "./api";
import { renderWeather } from "./dom";
import './styles.css';

const btn= document.querySelector('#weatherBtn');
let currentUnit ='F';
let latestWeatherData = null;

btn.addEventListener('click',async ()=>{
    const inputCity= document.querySelector('#inputCity').value;
    if (!inputCity) alert("Field is required!")
    const data = await fetchData(inputCity);
    if(data){
       latestWeatherData= data;
        renderWeather(latestWeatherData,currentUnit);
    }
})

const celsiusBtn = document.querySelector('#celsiusBtn');
const fahrenheitBtn= document.querySelector('#fahrenheitBtn');

celsiusBtn.addEventListener('click', ()=>{
 
    if(!latestWeatherData) return;
        currentUnit='C';
        renderWeather(latestWeatherData,currentUnit)
    
});
fahrenheitBtn.addEventListener('click', ()=>{
    if(!latestWeatherData) return
    currentUnit='F';
    renderWeather(latestWeatherData,currentUnit);
    
})